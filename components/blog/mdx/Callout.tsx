import { AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "note" | "tip" | "warning" | "opsec";

type CalloutConfig = {
  icon: LucideIcon;
  label: string;
  box: string;
  heading: string;
};

const callouts: Record<CalloutType, CalloutConfig> = {
  note: {
    icon: Info,
    label: "Note",
    box: "border-sky-400/25 bg-sky-400/[0.06]",
    heading: "text-sky-300",
  },
  tip: {
    icon: Lightbulb,
    label: "Tip",
    box: "border-accent/25 bg-accent/[0.06]",
    heading: "text-accent",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    box: "border-amber-400/25 bg-amber-400/[0.06]",
    heading: "text-amber-300",
  },
  opsec: {
    icon: ShieldAlert,
    label: "OpSec",
    box: "border-red-400/25 bg-red-400/[0.06]",
    heading: "text-red-300",
  },
};

type CalloutProps = {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
};

export default function Callout({
  type = "note",
  title,
  children,
}: CalloutProps) {
  const config = callouts[type] ?? callouts.note;
  const Icon = config.icon;

  return (
    <aside className={cn("my-6 rounded-xl border p-4", config.box)}>
      <div
        className={cn(
          "flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em]",
          config.heading
        )}
      >
        <Icon size={15} aria-hidden />
        {title ?? config.label}
      </div>
      <div className="mt-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
