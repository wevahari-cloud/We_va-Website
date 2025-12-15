"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.25, 0.4, 0.25, 1],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeIn({ children, className = "", delay = 0 }: ScrollRevealProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.8,
                delay,
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function SlideIn({ children, className = "", delay = 0, direction = "left" }: ScrollRevealProps & { direction?: "left" | "right" | "up" | "down" }) {
    const variants = {
        left: { x: -50 },
        right: { x: 50 },
        up: { y: -50 },
        down: { y: 50 },
    };

    return (
        <motion.div
            initial={{ opacity: 0, ...variants[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.6,
                delay,
                ease: "easeOut",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
