import type { ComponentType } from "react";

function DefaultHero() {
  return (
    <div
      aria-hidden
      className="h-full w-full rounded-2xl bg-gradient-to-br from-accent via-accent-bright to-gold"
    />
  );
}

export const getHeroComponent = (_key?: string): ComponentType => DefaultHero;
