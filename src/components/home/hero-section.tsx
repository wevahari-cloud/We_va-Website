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
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";



export function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsub = onSnapshot(doc(db, "content", "home"), (doc) => {
            if (doc.exists()) {
                setData(doc.data());
            }
            setLoading(false);
        });
        return () => unsub();
    }, []);

    // Default Fallback
    const heroTitle = data?.heroTitle || "Fellowship Through Service";
    const heroSubtitle = data?.heroSubtitle || "Join the movement creating change in our community.";
    const heroButtonText = data?.heroButtonText || "Join Us";
    const heroButtonLink = data?.heroButtonLink || "/contact";
    const images = data?.heroImages && data.heroImages.length > 0
        ? data.heroImages
        : ["https://placehold.co/1920x1080/003366/FFF?text=Rotaract+Western+Valley"];

    return (
        <section className="relative w-full">
            <Carousel
                plugins={[plugin.current]}
                className="w-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {images.map((img: string, index: number) => (
                        <CarouselItem key={index} className="relative h-[60vh] md:h-[80vh]">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                                style={{ backgroundImage: `url(${img})` }}
                            >
                                <div className="absolute inset-0 bg-black/60" />
                            </div>
                            {/* Text Overlay (Same for all slides to simplify admin) */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight drop-shadow-xl text-white">
                                        {heroTitle}
                                    </h1>
                                    <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-medium drop-shadow-md text-slate-100 leading-relaxed">
                                        {heroSubtitle}
                                    </p>
                                    <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-yellow-400 font-semibold text-lg px-8 py-6 rounded-full shadow-lg transition-transform hover:scale-105">
                                        <Link href={heroButtonLink}>{heroButtonText}</Link>
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
