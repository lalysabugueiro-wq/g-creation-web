"use client";

// Link que entra en un universo con cortinilla + sonido.
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useUniverseGo } from "./UniverseTransition";
import { hoverTick } from "@/lib/sound";

type Props = ComponentProps<typeof Link> & { href: string; tick?: boolean };

export default function UniverseLink({ href, onClick, onMouseEnter, tick = false, ...rest }: Props) {
  const go = useUniverseGo();
  return (
    <Link
      href={href}
      {...rest}
      onMouseEnter={(e) => {
        if (tick) hoverTick();
        onMouseEnter?.(e);
      }}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (!go || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        go(href);
      }}
    />
  );
}
