"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function WaterEffect() {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    if (!init) {
        return null;
    }

    return (
        <Particles
            className="absolute inset-0 pointer-events-none z-40"
            id="tsparticles"
            options={{
                fpsLimit: 120,
                interactivity: {
                    detectsOn: "window",
                    events: {
                        onHover: {
                            enable: true,
                            mode: "trail",
                        },
                    },
                    modes: {
                        trail: {
                            delay: 0.1,
                            pauseOnStop: true,
                            quantity: 1,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "transparent",
                    },
                    stroke: {
                        width: 2,
                        color: {
                            value: ["#00BFFF", "#FFFFFF", "#87CEFA"], // Blue/White ripples
                        },
                    },
                    move: {
                        enable: true,
                        speed: 0, // No movement, just expansion
                    },
                    number: {
                        value: 0,
                    },
                    opacity: {
                        value: { min: 0, max: 0.6 },
                        animation: {
                            enable: true,
                            speed: 1,
                            sync: false,
                            destroy: "min",
                            startValue: "max"
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 10, max: 100 }, // Expands from small to large
                        animation: {
                            enable: true,
                            speed: 20, // Fast expansion
                            sync: false,
                            destroy: "max",
                            startValue: "min"
                        },
                    },
                    life: {
                        duration: {
                            sync: true,
                            value: 2
                        },
                        count: 1
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
