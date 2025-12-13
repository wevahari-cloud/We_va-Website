export function PresidentMessage({ data }: { data: any }) {
    // Fallback if no data
    const {
        presidentName = "Rtr. Official Name",
        presidentRole = "President 2025-26",
        presidentMessage = "Welcome to our club. We are dedicated to service and fellowship.",
        presidentImage = "https://placehold.co/100x100?text=Pres"
    } = data || {};

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <h2 className="text-3xl font-bold mb-8">President's Message</h2>
                <blockquote className="text-xl text-muted-foreground italic mb-8 whitespace-pre-wrap">
                    "{presidentMessage}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                    <div className="h-16 w-16 rounded-full bg-gray-300 overflow-hidden border-2 border-primary">
                        <img src={presidentImage || "https://placehold.co/100x100?text=Pres"} alt="President" className="h-full w-full object-cover" />
                    </div>
                    <div className="text-left">
                        <div className="font-bold text-lg">{presidentName}</div>
                        <div className="text-sm text-muted-foreground">{presidentRole}</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
