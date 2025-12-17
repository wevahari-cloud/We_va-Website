"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface PastLeadershipSectionProps {
    pastYears: any[];
}

// Helper to inject Cloudinary transformations
const getTransformedUrl = (url: string) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    // Inject background removal and Rotary Yellow background (#F7A81B)
    return url.replace("/upload/", "/upload/e_background_removal,b_rgb:F7A81B/");
};

// Helper for transparent background removal
const getTransparentUrl = (url: string) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    return url.replace("/upload/", "/upload/e_background_removal/");
};

export function PastLeadershipSection({ pastYears }: PastLeadershipSectionProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused || pastYears.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % pastYears.length);
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, [isPaused, pastYears.length]);

    useEffect(() => {
        if (!scrollContainerRef.current) return;

        const container = scrollContainerRef.current;
        const cardWidth = 440; // approximate card width + gap
        const scrollPosition = currentIndex * cardWidth;

        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }, [currentIndex]);

    // Pause auto-scroll when user manually scrolls
    const handleManualScroll = () => {
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 5000); // Resume after 5 seconds
    };

    if (pastYears.length === 0) return null;

    return (
        <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Past Leadership Archives</h2>

                <div className="relative w-full">
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleManualScroll}
                        className="flex overflow-x-auto gap-8 pb-8 px-4 snap-x snap-mandatory no-scrollbar"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {pastYears.map((year) => (
                            <div
                                key={year.id}
                                className="snap-center shrink-0 w-[380px] md:w-[440px] bg-card border rounded-xl shadow-md overflow-hidden flex flex-col"
                            >
                                {/* Year Header with Theme */}
                                <div className="bg-[#005DAA] p-8 text-center border-b space-y-4">
                                    <h3 className="text-2xl font-bold text-white">{year.name}</h3>
                                    {year.themeLogoUrl && (
                                        <div className="flex items-center justify-center mx-auto">
                                            <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center p-2 shadow-lg overflow-hidden">
                                                <img
                                                    src={year.themeLogoUrl}
                                                    alt="Year Theme"
                                                    className="w-full h-full object-contain rounded-full"
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {year.themeTitle && (
                                        <p className="text-sm font-medium text-blue-100 uppercase tracking-widest">
                                            {year.themeTitle}
                                        </p>
                                    )}
                                </div>

                                {/* Leaders Grid */}
                                <div className="p-6 flex-1 flex flex-col justify-center">
                                    <div className="grid grid-cols-2 gap-4">
                                        {year.leaders && year.leaders.length > 0 ? (
                                            year.leaders.map((leader: any, i: number) => {
                                                const isSingle = year.leaders.length === 1;
                                                const isThreeAndFirst = year.leaders.length === 3 && i === 0;

                                                return (
                                                    <div
                                                        key={leader.id}
                                                        className={cn(
                                                            "flex flex-col items-center text-center space-y-2",
                                                            (isSingle || isThreeAndFirst) ? "col-span-2" : "col-span-1"
                                                        )}
                                                    >
                                                        <div className="w-20 h-20 rounded-full bg-[#F7A81B] overflow-hidden border-2 border-border relative">
                                                            {leader.imageUrl ? (
                                                                <img
                                                                    src={getTransformedUrl(leader.imageUrl)}
                                                                    alt={leader.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex items-center justify-center h-full text-xs text-black font-medium">No Img</div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="font-semibold text-sm">{leader.name}</p>
                                                            <p className="text-xs text-muted-foreground">{leader.role}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="col-span-2 text-center text-sm text-muted-foreground py-4">
                                                No records found.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
