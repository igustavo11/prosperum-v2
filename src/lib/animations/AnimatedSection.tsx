"use client";

import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { presets } from "./variants";
import type { PresetName } from "./variants";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "variants"> {
  variant?: PresetName;
  delay?: number;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
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

  const customVariants = {
    hidden: preset.hidden,
    visible: {
      ...preset.visible,
      transition: {
        ...preset.visible.transition,
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
