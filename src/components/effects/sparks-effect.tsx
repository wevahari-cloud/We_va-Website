"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function SparksEffect() {
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
            id="tsparticles"
            className="absolute inset-0 pointer-events-none z-20"
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
                            quantity: 3,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#FFD700", "#FF4500", "#FF8C00", "#FFFFFF"], // Gold, Red, Orange, White
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "destroy",
                        },
                        random: true,
                        speed: 5,
                        straight: false,
                        gravity: {
                            enable: true,
                            acceleration: 9.8,
                            maxSpeed: 20
                        },
                    },
                    number: {
                        value: 0,
                    },
                    opacity: {
                        value: { min: 0.5, max: 1 },
                        animation: {
                            enable: true,
                            speed: 3,
                            sync: false,
                            destroy: "min",
                            startValue: "max"
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 2, max: 5 },
                        animation: {
                            enable: true,
                            speed: 5,
                            sync: false,
                            destroy: "max",
                            startValue: "max"
                        },
                    },
                    life: {
                        duration: {
                            sync: true,
                            value: 1
                        },
                        count: 1
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
