"use client";

import { useEffect, useRef, useState } from "react";

type AnimationType = "fade-up" | "fade-left" | "fade-right";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  animation?: AnimationType;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) {
  const { threshold = 0.15, rootMargin = "0px", animation = "fade-up" } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const animationClass = isVisible ? `animate-visible animate-${animation}` : "animate-hidden";

  return { ref, isVisible, animationClass };
}
