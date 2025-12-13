import { Timeline } from "@/components/history/timeline";

export default function HistoryPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Our Journey</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    From our charter day to the present, tracing the milestones that have defined the Rotaract Club of Western Valley.
                </p>
            </div>
            <Timeline />
        </div>
    );
}
