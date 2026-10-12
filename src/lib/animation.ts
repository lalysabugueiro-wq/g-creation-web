"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Shared motion language: slow, restrained, expensive-feeling.
export const EASE = "power4.out";
export const DUR = 1.4;

export { gsap, ScrollTrigger, SplitText };
