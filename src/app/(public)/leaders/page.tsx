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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
                    {leaders.map((leader) => (
                        <div
                            key={leader.id}
                            className="bg-card text-card-foreground rounded-xl shadow-md border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
                        >
                            {/* Card Header with Image and Background Pattern */}
                            <div className="relative pt-8 pb-4 px-4 bg-muted/30 border-b flex flex-col items-center">
                                {/* Simple Background Pattern */}
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <img src="/logo-placeholder.png" alt="" className="w-16 h-16 object-contain" />
                                </div>

                                <div className="w-32 h-32 rounded-full border-4 border-background shadow-md overflow-hidden bg-background relative z-10">
                                    {leader.imageUrl ? (
                                        <img
                                            src={leader.imageUrl}
                                            alt={leader.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-muted-foreground bg-muted">
                                            No Image
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-5 flex-1 flex flex-col items-center text-center">
                                <h3 className="text-xl font-bold mb-1 text-primary line-clamp-1" title={leader.name}>
                                    {leader.name}
                                </h3>
                                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 mb-4">
                                    {leader.role}
                                </div>

                                {/* Social Links */}
                                <div className="mt-auto flex gap-4 pt-2">
                                    {leader.linkedinUrl && (
                                        <a href={leader.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[#0077b5] transition-colors p-1">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    )}
                                    {leader.email && (
                                        <a href={`mailto:${leader.email}`} className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </a>
                                    )}
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
