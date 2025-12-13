"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const HERO_SLIDES = [
    {
        id: 1,
        image: "https://placehold.co/1920x1080/003366/FFF?text=Rotaract+Club+of+Western+Valley",
        title: "Fellowship Through Service",
        subtitle: "Join the movement creating change in our community.",
        cta: "Join Us",
        link: "https://chat.whatsapp.com/GzBxxxxx",
    },
    {
        id: 2,
        image: "https://placehold.co/1920x1080/005C99/FFF?text=Upcoming+Event:+Installation",
        title: "10th Club Installation",
        subtitle: "Celebrate a decade of impact with us.",
        cta: "Register Now",
        link: "/events",
    },
    {
        id: 3,
        image: "https://placehold.co/1920x1080/FFD700/000?text=Mega+Tree+Plantation+Drive",
        title: "Green Legacy Project",
        subtitle: "Planting 500+ saplings across the valley.",
        cta: "View Gallery",
        link: "/gallery",
    },
];

export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <section className="relative w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {HERO_SLIDES.map((slide) => (
                        <CarouselItem key={slide.id} className="relative h-[60vh] md:h-[80vh]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${slide.image})` }}
                            >
                                <div className="absolute inset-0 bg-black/60" />
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl text-white">
                                        {slide.title}
                                    </h1>
                                    <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-medium drop-shadow-md text-slate-100 leading-relaxed">
                                        {slide.subtitle}
                                    </p>
                                    <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-yellow-400 font-semibold text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
                                        <Link href={slide.link}>{slide.cta}</Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4 bg-transparent border-white text-white hover:bg-white/20 hidden md:flex" />
                <CarouselNext className="right-4 bg-transparent border-white text-white hover:bg-white/20 hidden md:flex" />
            </Carousel>
        </section>
    );
}
