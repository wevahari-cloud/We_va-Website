import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { WhyJoinSection } from "@/components/home/why-join-section";
import { EventsPreviewSection } from "@/components/home/events-preview-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsSection />
      <EventsPreviewSection />
      <WhyJoinSection />

      {/* President's Message Section - Simple Text Block for now */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl font-bold mb-8">President's Message</h2>
          <blockquote className="text-xl text-muted-foreground italic mb-8">
            "This year, we focus on creating sustainable impact. Every small act of kindness ripples into a wave of change. Join us as we strive to make Western Valley a beacon of hope and fellowship."
          </blockquote>
          <div className="flex items-center justify-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-300 overflow-hidden">
              <img src="https://placehold.co/100x100?text=Pres" alt="President" className="h-full w-full object-cover" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Rtr. President Name</div>
              <div className="text-sm text-muted-foreground">Rotaract Club of Western Valley</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
