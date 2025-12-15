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
            console.log("Water Effect initialized");
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
                            delay: 0,
                            pauseOnStop: true,
                            quantity: 4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#00BFFF", "#1E90FF", "#E0FFFF", "#87CEFA"], // Watery Blues and White
                    },
                    move: {
                        direction: "bottom", // Fall down like rain/drizzle
                        enable: true,
                        outModes: {
                            default: "destroy",
                        },
                        random: false,
                        speed: 8, // Faster falling
                        straight: false,
                        gravity: {
                            enable: true,
                            acceleration: 9.8,
                            maxSpeed: 20
                        },
                    },
                    number: {
                        value: 20, // Start with 20 to verify rendering
                    },
                    opacity: {
                        value: { min: 0.4, max: 0.8 },
                        animation: {
                            enable: false,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 3, max: 6 },
                        animation: {
                            enable: true,
                            speed: 2,
                            sync: false,
                            destroy: "max",
                            startValue: "min"
                        },
                    },
                    life: {
                        duration: {
                            sync: true,
                            value: 1.5 // Lasts a bit as it falls
                        },
                        count: 1
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
