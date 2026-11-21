"use client";

// Link que entra en un universo con cortinilla + sonido.
import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";
import { useUniverseGo } from "./UniverseTransition";

type Props = ComponentProps<typeof Link> & { href: string; tick?: boolean };

// Sin sonido al pasar el ratón (Laly, 2026-11-21).
export default function UniverseLink({ href, onClick, tick, ...rest }: Props) {
  void tick;
  const go = useUniverseGo();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (!go || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        go(href);
      }}
    />
  );
}
