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
                            delay: 0.005,
                            pauseOnStop: true,
                            quantity: 5,
                        },
                    },
                },
                particles: {
                    color: {
                        value: ["#ff595e", "#ffca3a", "#8ac926"],
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "destroy",
                        },
                        random: true,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        value: 0,
                    },
                    opacity: {
                        value: { min: 0.3, max: 0.8 },
                        animation: {
                            enable: true,
                            speed: 0.5,
                            sync: false,
                        },
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 2, max: 4 },
                        animation: {
                            enable: true,
                            speed: 2,
                            sync: false,
                        },
                    },
                    life: {
                        count: 1,
                        duration: {
                            value: 1.5,
                        },
                        delay: 0.1,
                    },
                    trail: {
                        enable: true,
                        length: 10,  // Length of the trail left by the particle
                        fillColor: "#000000", // Not used if using simple trail, but can be configured
                    },
                },
                detectRetina: true,
            }}
        />
    );
}
