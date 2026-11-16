/**
 * Minimal GitHub OAuth proxy for Decap CMS.
 *
 * Deploy this as a Cloudflare Worker, then point public/admin/config.yml at it:
 *   backend.base_url: https://<worker>.<subdomain>.workers.dev
 *   backend.auth_endpoint: auth
 *
 * Required Worker secrets:
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 *   ALLOWED_ORIGIN       e.g. https://roboguy-sos.github.io
 *
 * The worker only exchanges the OAuth code for a token and posts it back to the
 * CMS window. It never stores tokens.
 */

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";
const STATE_COOKIE = "decap_oauth_state";

function getCookie(request, name) {
  const header = request.headers.get("Cookie") || "";

  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return decodeURIComponent(rest.join("="));
  }

  return null;
}

function normalizeOrigin(value) {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

function callbackPage(status, payload, allowedOrigin) {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  const jsOrigin = JSON.stringify(allowedOrigin).replace(/</g, "\\u003c");
  const jsMessage = JSON.stringify(message).replace(/</g, "\\u003c");

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Authorizing Decap...</title>
    <style>
      body { background:#050505; color:#f5f5f5; font-family:system-ui,sans-serif; padding:2rem; }
    </style>
  </head>
  <body>
    <p id="status">Completing GitHub login...</p>
    <script>
      (function () {
        var allowedOrigin = ${jsOrigin};
        var message = ${jsMessage};
        var done = false;

        function send() {
          if (done || !window.opener) return;
          done = true;
          window.opener.postMessage(message, allowedOrigin);
          setTimeout(function () { window.close(); }, 500);
        }

        function receive(event) {
          if (event.source !== window.opener) return;
          if (event.origin !== allowedOrigin) return;
          if (event.data !== "authorizing:github") return;
          send();
        }

        window.addEventListener("message", receive, false);

        if (window.opener) {
          window.opener.postMessage("authorizing:github", allowedOrigin);
        } else {
          document.getElementById("status").textContent =
            "Open this window from the CMS login button.";
        }
      })();
    </script>
  </body>
</html>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
      },
    }
  );
}

async function handleAuth(url, env) {
  const provider = url.searchParams.get("provider");
  if (provider && provider !== "github") {
    return new Response("Unsupported OAuth provider.", { status: 400 });
  }

  const allowedOrigin = normalizeOrigin(env.ALLOWED_ORIGIN);
  if (!allowedOrigin) {
    return new Response("ALLOWED_ORIGIN is missing or invalid.", { status: 500 });
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return new Response("GitHub OAuth secrets are not configured.", {
      status: 500,
    });
  }

  const state = crypto.randomUUID();
  const redirectUri = `${url.origin}/callback`;
  const authorizeUrl = new URL(GITHUB_AUTHORIZE);
  authorizeUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  // public_repo is enough for this public repository. Use "repo,user" if the
  // site repository ever becomes private.
  authorizeUrl.searchParams.set("scope", "public_repo,user");
  authorizeUrl.searchParams.set("state", state);

  const headers = new Headers({
    Location: authorizeUrl.toString(),
    "Cache-Control": "no-store",
  });
  const secure = url.protocol === "https:" ? "; Secure" : "";
  headers.append(
    "Set-Cookie",
    `${STATE_COOKIE}=${encodeURIComponent(
      state
    )}; HttpOnly; SameSite=Lax; Path=/; Max-Age=600${secure}`
  );

  return new Response(null, { status: 302, headers });
}

async function handleCallback(url, request, env) {
  const allowedOrigin = normalizeOrigin(env.ALLOWED_ORIGIN);
  if (!allowedOrigin) {
    return new Response("ALLOWED_ORIGIN is missing or invalid.", { status: 500 });
  }

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = getCookie(request, STATE_COOKIE);

  if (!code || !state || state !== expectedState) {
    return callbackPage(
      "error",
      { message: "Invalid or expired OAuth state. Please try logging in again." },
      allowedOrigin
    );
  }

  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return callbackPage(
      "error",
      { message: "GitHub OAuth secrets are not configured." },
      allowedOrigin
    );
  }

  const body = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    client_secret: env.GITHUB_CLIENT_SECRET,
    code,
    redirect_uri: `${url.origin}/callback`,
  });

  let data;
  try {
    const response = await fetch(GITHUB_TOKEN, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "decap-oauth-proxy",
      },
      body,
    });
    data = await response.json();
  } catch {
    return callbackPage(
      "error",
      { message: "Could not reach GitHub to exchange the OAuth code." },
      allowedOrigin
    );
  }

  if (!data || !data.access_token) {
    return callbackPage(
      "error",
      {
        message:
          data?.error_description ||
          data?.error ||
          "GitHub did not return an access token.",
      },
      allowedOrigin
    );
  }

  return callbackPage(
    "success",
    { token: data.access_token, provider: "github" },
    allowedOrigin
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }

    if (url.pathname === "/callback") {
      return handleCallback(url, request, env);
    }

    if (url.pathname === "/") {
      return new Response("Decap OAuth proxy is running.", {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    return new Response("Not found.", { status: 404 });
  },
};
