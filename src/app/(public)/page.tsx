import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { WhyJoinSection } from "@/components/home/why-join-section";
import { EventsPreviewSection } from "@/components/home/events-preview-section";
import { PresidentMessage } from "@/components/home/president-message";

import { getHomeContent } from "@/actions/home";

export default async function HomePage() {
  const homeData = await getHomeContent();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection data={homeData} />
      <StatsSection data={homeData} />
      <EventsPreviewSection />
      <WhyJoinSection />

      <PresidentMessage data={homeData} />
    </div>
  );
}
