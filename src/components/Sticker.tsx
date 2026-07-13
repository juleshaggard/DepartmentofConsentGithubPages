import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Sticker({
  children,
  className,
  variant = "pink",
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: "pink" | "coral";
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(variant === "coral" ? "sticker-coral" : "sticker", "p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
