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
                        width: 4, // Thicker ring
                        color: {
                            value: ["#FFFFFF", "#00FFFF"], // Bright White and Cyan
                        },
                    },
                    move: {
                        enable: true,
                        speed: 0,
                    },
                    number: {
                        value: 0,
                    },
                    opacity: {
                        value: { min: 0, max: 1 }, // Fully opaque start
                        animation: {
                            enable: true,
                            speed: 0.5, // Slow fade
                            sync: false,
                            destroy: "min",
                            startValue: "max"
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 10, max: 120 },
                        animation: {
                            enable: true,
                            speed: 10, // Slower expansion to be seen
                            sync: false,
                            destroy: "max",
                            startValue: "min"
                        },
                    },
                    life: {
                        duration: {
                            sync: true,
                            value: 3 // Lasts longer
                        },
                        count: 1
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
