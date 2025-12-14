import { getLeaders, getPastYearsWithLeaders } from "@/actions/leaders";

export const dynamic = "force-dynamic";

export default async function PublicLeadersPage() {
    const leaders = await getLeaders();
    const pastYears = await getPastYearsWithLeaders();

    return (
        <div className="container mx-auto px-4 py-12 space-y-24">

            {/* Header */}
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Leaders</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Meet the dedicated team working behind the scenes to drive our projects and community initiatives forward.
                </p>
            </div>

            {/* Section 1: Board of Officials (Zigzag Layout) */}
            <section>
                <h2 className="text-3xl font-bold text-center mb-16">Board of Officials</h2>
                <div className="space-y-12 max-w-5xl mx-auto">
                    {leaders.map((leader, index) => (
                        <div
                            key={leader.id}
                            className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Circle Image Space */}
                            <div className="shrink-0 relative">
                                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted">
                                    {leader.imageUrl ? (
                                        <img
                                            src={leader.imageUrl}
                                            alt={leader.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                {/* Connector Line (Decorative) - Optional, adds to the flow */}
                                <div className={`hidden md:block absolute top-1/2 w-12 h-1 bg-border -z-10 ${index % 2 === 1 ? 'right-full mr-[-2px]' : 'left-full ml-[-2px]'
                                    }`}></div>
                            </div>

                            {/* Rectangle Info Card */}
                            <div className="bg-card text-card-foreground rounded-2xl shadow-lg p-6 md:p-8 flex-1 w-full md:max-w-xl border relative overflow-hidden group hover:shadow-xl transition-shadow">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <img src="/logo-placeholder.png" alt="" className="w-24 h-24 object-contain" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-2 text-primary">{leader.name}</h3>
                                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
                                        {leader.role}
                                    </div>

                                    <div className="flex gap-3 mt-2">
                                        {leader.linkedinUrl && (
                                            <a href={leader.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                        )}
                                        {leader.email && (
                                            <a href={`mailto:${leader.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {leaders.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                            Updating our team list. Check back soon!
                        </div>
                    )}
                </div>
            </section>

            {/* Section 2: Past Presidents (Horizontal Scroll) */}
            <section className="border-t pt-16">
                <h2 className="text-3xl font-bold text-center mb-12">Past Leadership</h2>

                <div className="relative w-full">
                    <div className="flex overflow-x-auto gap-8 pb-8 px-4 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {pastYears.map((year) => (
                            <div
                                key={year.id}
                                className="snap-center shrink-0 w-[340px] md:w-[400px] bg-card border rounded-xl shadow-md overflow-hidden flex flex-col"
                            >
                                {/* Year Header with Theme */}
                                <div className="bg-muted/30 p-6 text-center border-b space-y-3">
                                    <h3 className="text-2xl font-bold">{year.name}</h3>
                                    {year.themeLogoUrl && (
                                        <div className="h-20 flex items-center justify-center">
                                            <img src={year.themeLogoUrl} alt="Year Theme" className="h-full object-contain" />
                                        </div>
                                    )}
                                    {year.themeTitle && (
                                        <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                            {year.themeTitle}
                                        </p>
                                    )}
                                </div>

                                {/* Leaders Grid */}
                                <div className="p-6 flex-1 flex flex-col justify-center">
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Logic for varying count of leaders could be dynamic CSS grid, 
                                            but a simple map mostly works if order is correct. 
                                            If we want specifically 1 top, 2 bottom for 3 people, we need a bit more logic.
                                        */}

                                        {/* Render President (Order 1) usually first and centered if possible, or just standard grid */}
                                        {year.leaders && year.leaders.length > 0 ? (
                                            year.leaders.map((leader: any, i: number) => {
                                                // If only 1 leader (President), span full width
                                                // If 3 leaders, maybe 1st one spans full width?
                                                const isSingle = year.leaders.length === 1;
                                                const isThreeAndFirst = year.leaders.length === 3 && i === 0;

                                                return (
                                                    <div
                                                        key={leader.id}
                                                        className={`flex flex-col items-center text-center space-y-2 
                                                            ${isSingle || isThreeAndFirst ? "col-span-2" : "col-span-1"}
                                                        `}
                                                    >
                                                        <div className="w-20 h-20 rounded-full bg-muted overflow-hidden border-2 border-border">
                                                            {leader.imageUrl ? (
                                                                <img src={leader.imageUrl} alt={leader.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="flex items-center justify-center h-full text-xs text-muted-foreground">No Img</div>
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

                        {pastYears.length === 0 && (
                            <div className="w-full text-center py-12 text-muted-foreground">
                                History is being updated.
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
