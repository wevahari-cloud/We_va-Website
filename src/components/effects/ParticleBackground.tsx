"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface ParticleBackgroundProps {
    className?: string;
}

export function ParticleBackground({ className = "" }: ParticleBackgroundProps) {
    const [init, setInit] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check for reduced motion preference and mobile device
    useEffect(() => {
        // Check reduced motion preference
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };
        mediaQuery.addEventListener("change", handleChange);

        // Check if mobile device
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // Initialize particles engine once
    useEffect(() => {
        // Skip particles entirely if user prefers reduced motion
        if (prefersReducedMotion) {
            return;
        }

        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, [prefersReducedMotion]);

    const particlesLoaded = async (container?: Container) => {
        // Optional callback when particles are loaded
    };

    // Don't render particles if user prefers reduced motion
    if (prefersReducedMotion) {
        return null;
    }

    if (!init) {
        return null;
    }

    // Adjust particle count based on device
    const particleCount = isMobile ? 30 : 60;
    const fpsLimit = isMobile ? 30 : 60;

    return (
        <Particles
            id="tsparticles"
            className={className}
            particlesLoaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "transparent",
                    },
                },
                fpsLimit: fpsLimit,
                interactivity: {
                    events: {
                        onHover: {
                            enable: !isMobile, // Disable hover on mobile for performance
                            mode: "repulse",
                        },
                        resize: {
                            enable: true,
                        },
                    },
                    modes: {
                        repulse: {
                            distance: 80,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#ffffff", "#F7A81B", "#ffeb3b"],
                    },
                    links: {
                        enable: false,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: true,
                        speed: isMobile ? 0.3 : 0.5, // Slower on mobile
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                        },
                        value: particleCount,
                    },
                    opacity: {
                        value: { min: 0.1, max: 0.5 },
                        animation: {
                            enable: !isMobile, // Disable opacity animation on mobile
                            speed: 1,
                        },
                    },
                    shape: {
                        type: "circle", // Use only circles for better performance
                    },
                    size: {
                        value: { min: 1, max: 3 },
                        animation: {
                            enable: false, // Disable size animation for performance
                            speed: 2,
                        },
                    },
                    twinkle: {
                        particles: {
                            enable: !isMobile, // Disable twinkle on mobile
                            frequency: 0.05,
                            opacity: 1,
                        },
                    },
                },
                detectRetina: true,
            }}
        />
    );
}

