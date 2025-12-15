"use client";

import { motion } from "framer-motion";

interface LeaderCardProps {
    leader: any;
    index: number;
}

export function LeaderCard({ leader, index }: LeaderCardProps) {
    // Helper to inject Cloudinary transformations
    const getTransformedUrl = (url: string) => {
        if (!url || !url.includes("cloudinary.com")) return url;
        return url.replace("/upload/", "/upload/e_background_removal,b_rgb:F7A81B/");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-card text-card-foreground rounded-lg shadow-sm border overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col group"
        >
            {/* Card Header with Image and Background Pattern */}
            <div className="relative pt-6 pb-2 px-2 bg-[#005DAA] border-b flex flex-col items-center">
                <div className="w-24 h-24 rounded-full border-2 border-[#F7A81B] shadow-sm overflow-hidden bg-[#F7A81B] relative z-10">
                    {leader.imageUrl ? (
                        <img
                            src={getTransformedUrl(leader.imageUrl)}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-black bg-[#F7A81B] text-xs font-medium">
                            No Image
                        </div>
                    )}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-3 flex-1 flex flex-col items-center text-center">
                <h3 className="text-sm font-bold mb-1 text-[#005DAA] line-clamp-1 leading-tight" title={leader.name}>
                    {leader.name}
                </h3>
                <div className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-2">
                    {leader.role}
                </div>
                {leader.tenurePeriod && (
                    <p className="text-xs text-muted-foreground mb-2">{leader.tenurePeriod}</p>
                )}
            </div>
        </motion.div>
    );
}
