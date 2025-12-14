import { getLeaders } from "@/actions/leaders";

export const dynamic = "force-dynamic";

export default async function PublicLeadersPage() {
    const leaders = await getLeaders();

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
                <div className="space-y-8 max-w-4xl mx-auto">
                    {leaders.map((leader, index) => (
                        <div
                            key={leader.id}
                            className={`flex flex-col md:flex-row items-center gap-4 md:gap-6 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Circle Image Space */}
                            <div className="shrink-0 relative">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background shadow-xl overflow-hidden bg-muted">
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
                                <div className={`hidden md:block absolute top-1/2 w-6 h-1 bg-border -z-10 ${index % 2 === 1 ? 'right-full mr-[-2px]' : 'left-full ml-[-2px]'
                                    }`}></div>
                            </div>

                            {/* Rectangle Info Card */}
                            <div className="bg-card text-card-foreground rounded-xl shadow-lg p-4 md:p-5 flex-1 w-full md:max-w-md border relative overflow-hidden group hover:shadow-xl transition-shadow">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <img src="/logo-placeholder.png" alt="" className="w-16 h-16 object-contain" />
                                </div>
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold mb-1 text-primary">{leader.name}</h3>
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
        </div>
    );
}
