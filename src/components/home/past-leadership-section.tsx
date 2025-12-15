
import { cn } from "@/lib/utils";

interface PastLeadershipSectionProps {
    pastYears: any[];
}

// Helper to inject Cloudinary transformations
const getTransformedUrl = (url: string) => {
    if (!url || !url.includes("cloudinary.com")) return url;
    // Inject background removal and Rotary Yellow background (#F7A81B)
    return url.replace("/upload/", "/upload/e_background_removal,b_rgb:F7A81B/");
};

export function PastLeadershipSection({ pastYears }: PastLeadershipSectionProps) {
    if (pastYears.length === 0) return null;

    return (
        <section className="py-16 bg-muted/20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Past Leadership Archives</h2>

                <div className="relative w-full">
                    <div className="flex overflow-x-auto gap-8 pb-8 px-4 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {pastYears.map((year) => (
                            <div
                                key={year.id}
                                className="snap-center shrink-0 w-[340px] md:w-[400px] bg-card border rounded-xl shadow-md overflow-hidden flex flex-col"
                            >
                                {/* Year Header with Theme */}
                                <div className="bg-[#005DAA] p-6 text-center border-b space-y-3">
                                    <h3 className="text-2xl font-bold text-white">{year.name}</h3>
                                    {year.themeLogoUrl && (
                                        <div className="h-20 w-20 flex items-center justify-center mx-auto rounded-full overflow-hidden border-2 border-white/20 bg-white p-1">
                                            <img src={year.themeLogoUrl} alt="Year Theme" className="w-full h-full object-contain rounded-full" />
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
