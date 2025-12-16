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
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { WaterEffect } from "@/components/effects/water-effect";





export function HeroSection({ data }: { data: any }) {
    const [api, setApi] = React.useState<CarouselApi>();
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    // Default Fallback
    const heroTitle = data?.heroTitle || "Fellowship Through Service";
    const heroSubtitle = data?.heroSubtitle || "Join the movement creating change in our community.";
    const heroButtonText = data?.heroButtonText || "Join Us";
    // FORCE WhatsApp Link as per user request (ignoring DB value which might be set to /contact)
    const heroButtonLink = "https://chat.whatsapp.com/FPW5uTF6sI1FGJodn7PPE1";
    const images = data?.heroImages && data.heroImages.length > 0
        ? data.heroImages
        : ["https://placehold.co/1920x1080/003366/FFF?text=Rotaract+Western+Valley"];

    React.useEffect(() => {
        if (!api) return;

        const updateScrollState = () => {
            setCanScrollPrev(api.canScrollPrev());
            setCanScrollNext(api.canScrollNext());
        };

        updateScrollState();
        api.on("select", updateScrollState);
        api.on("reInit", updateScrollState);

        return () => {
            api.off("select", updateScrollState);
            api.off("reInit", updateScrollState);
        };
    }, [api]);

    return (
        <section className="relative w-full">
            <WaterEffect />
            <Carousel
                setApi={setApi}
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {images.map((img: string, index: number) => (
                        <CarouselItem key={index} className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                            {/* Background Image with better control */}
                            <img
                                src={img}
                                alt="Hero background"
                                className="absolute inset-0 w-full h-full object-cover object-[50%_35%] scale-105 transition-transform duration-1000 hover:scale-110"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60" />

                            {/* Text Overlay (Same for all slides to simplify admin) */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white z-10">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <motion.h1
                                        className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl text-white"
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        {heroTitle}
                                    </motion.h1>
                                    <motion.p
                                        className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-medium drop-shadow-md text-slate-100 leading-relaxed"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.6 }}
                                    >
                                        {heroSubtitle}
                                    </motion.p>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.8 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-yellow-400 font-semibold text-lg px-8 py-6 rounded-full shadow-lg transition-all hover:shadow-2xl hover:shadow-yellow-500/50 animate-pulse-glow">
                                            <Link href={heroButtonLink}>{heroButtonText}</Link>
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                {canScrollPrev && (
                    <CarouselPrevious className="left-4 bg-transparent border-white text-white hover:bg-white/20 hidden md:flex" />
                )}
                {canScrollNext && (
                    <CarouselNext className="right-4 bg-transparent border-white text-white hover:bg-white/20 hidden md:flex" />
                )}
            </Carousel>
        </section>
    );
}
