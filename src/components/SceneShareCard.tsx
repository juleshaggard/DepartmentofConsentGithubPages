import { useState, type ReactNode } from "react";
import { QRCodeSVG } from "qrcode.react";

import { CloudButton } from "@/components/CloudButton";
import { Sticker } from "@/components/Sticker";
import { cn } from "@/lib/utils";

type SceneShareCardProps = {
  title: string;
  url: string;
  copyLabel: string;
  copiedLabel?: string;
  description?: ReactNode;
  className?: string;
};

export function SceneShareCard({
  title,
  url,
  copyLabel,
  copiedLabel = "Copied!",
  description,
  className,
}: SceneShareCardProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Sticker className={cn("text-center space-y-3", className)}>
      <h2 className="font-display text-[1.75rem] text-plum text-center leading-[1.05]">{title}</h2>
      <div className="flex justify-center rounded-xl bg-card p-3 sm:p-4">
        <QRCodeSVG
          value={url || " "}
          size={260}
          className="h-auto w-full max-w-[260px]"
          level="L"
          boostLevel={false}
          marginSize={3}
          fgColor="#1B1B1B"
          bgColor="#fffdfb"
        />
      </div>
      <div className="flex justify-center pt-1">
        <CloudButton variant="mint" onClick={copy}>
          {copied ? copiedLabel : copyLabel}
        </CloudButton>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground leading-[1.45] max-w-[52ch] mx-auto">
          {description}
        </p>
      )}
    </Sticker>
  );
}
