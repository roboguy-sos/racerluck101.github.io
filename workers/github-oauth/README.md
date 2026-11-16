# Decap CMS GitHub OAuth proxy

This Cloudflare Worker lets Decap CMS at `/admin/` log in with GitHub. GitHub
Pages is static, so it cannot securely hold the OAuth client secret or exchange
the authorization code itself. This tiny Worker does only that.

The Worker never stores tokens or content.

## 1. Deploy the Worker

From this directory:

```bash
npx wrangler@4 login
npx wrangler@4 deploy
```

Wrangler prints a URL like:

```txt
https://decap-oauth-proxy.your-subdomain.workers.dev
```

Keep that URL.

## 2. Create a GitHub OAuth App

GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**

- **Application name:** `Field Notes CMS`
- **Homepage URL:** `https://roboguy-sos.github.io/racerluck101.github.io/`
- **Authorization callback URL:** `https://decap-oauth-proxy.your-subdomain.workers.dev/callback`

Register the app, then copy the **Client ID** and generate a **Client secret**.

The callback URL must match the Worker URL exactly, including `/callback`.

## 3. Add the Worker secrets

Run these one at a time and paste the values when prompted:

```bash
npx wrangler@4 secret put GITHUB_CLIENT_ID
npx wrangler@4 secret put GITHUB_CLIENT_SECRET
npx wrangler@4 secret put ALLOWED_ORIGIN
```

For `ALLOWED_ORIGIN`, enter the site **origin only**:

```txt
https://roboguy-sos.github.io
```

Do not include `/racerluck101.github.io`, a trailing slash, or `/admin/`.

Never commit the client secret. It belongs only in Cloudflare secrets.

## 4. Point Decap at the Worker

Edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: roboguy-sos/racerluck101.github.io
  branch: main
  base_url: https://decap-oauth-proxy.your-subdomain.workers.dev
  auth_endpoint: auth
```

Commit and push. The existing GitHub Action deploys the admin page and the blog.

## 5. Log in and publish

Open:

```txt
https://roboguy-sos.github.io/racerluck101.github.io/admin/
```

Click **Login with GitHub**, authorize the OAuth app, and you should see the
**Blog posts** collection.

- **New Blog post** creates `content/blog/<slug>.mdx`.
- **Cover image** uploads go to `public/blog/<slug>/`.
- Set **Draft** to `false` (or use the Publish flow) when ready.
- Saving commits to `main`, which triggers the Pages deployment.

Only GitHub accounts with write access to the repository can save. Other
accounts can log in but will get GitHub permission errors.

## Optional: editorial workflow

Uncomment this in `public/admin/config.yml`:

```yaml
publish_mode: editorial_workflow
```

Then **Publish** creates a pull request instead of committing directly to
`main`. Merge the PR to deploy. This is useful if you want a review step or a
draft/review/publish workflow.

## Troubleshooting

- **`redirect_uri_mismatch`** — the GitHub OAuth App callback URL must exactly
  match `https://<worker>/callback`.
- **`Invalid or expired OAuth state`** — cookies were blocked, the Worker was
  redeployed, or you took more than 10 minutes. Try again.
- **Login popup closes but the CMS says authentication failed** — check
  `ALLOWED_ORIGIN` (no trailing slash) and the Worker logs.
- **Saves fail** — your GitHub account needs write access to the repository.
- **Admin page is 404** — confirm `public/admin/index.html` exists and the
  GitHub Action deployed successfully.
- **Images do not show in the CMS preview** — `public_folder` includes the
  deployment base path (`/racerluck101.github.io/blog/...`). The published site
  normalizes both `/blog/...` and the base-path-prefixed form. If you move to a
  custom domain, update `public_folder` and `productionBasePath` together.

## Local Worker development (optional)

Create a `.dev.vars` file in this directory:

```txt
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
ALLOWED_ORIGIN=http://localhost:3000
```

Then run:

```bash
npx wrangler@4 dev
```

Use the local Worker URL as `backend.base_url` while testing. Do not commit
`.dev.vars`.
