import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { WhyJoinSection } from "@/components/home/why-join-section";
import { EventsPreviewSection } from "@/components/home/events-preview-section";
import { PresidentMessage } from "@/components/home/president-message";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <StatsSection />
      <EventsPreviewSection />
      <WhyJoinSection />

      <PresidentMessage />
    </div>
  );
}
