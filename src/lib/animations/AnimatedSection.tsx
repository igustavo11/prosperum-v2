"use client";

import React from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { presets } from "./variants";
import type { PresetName } from "./variants";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  variant?: PresetName;
  delay?: number;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

export function AnimatedSection({
  variant = "fadeInUp",
  delay = 0,
  children,
  as,
  className,
  ...rest
}: AnimatedSectionProps) {
  const preset = presets[variant];

  type AnimVariant = { transition?: Record<string, unknown>; [k: string]: unknown };
  const visible = preset.visible as AnimVariant;
  const customVariants = {
    hidden: preset.hidden,
    visible: {
      ...visible,
      transition: {
        ...(visible.transition ?? {}),
        delay,
      },
    },
  };

  const MotionComponent = as
    ? (motion[as as keyof typeof motion] as typeof motion.div)
    : motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={customVariants}
      className={className}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
}
