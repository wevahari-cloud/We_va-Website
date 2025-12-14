import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { WhyJoinSection } from "@/components/home/why-join-section";
import { EventsPreviewSection } from "@/components/home/events-preview-section";
import { PresidentMessage } from "@/components/home/president-message";
import { PastLeadershipSection } from "@/components/home/past-leadership-section";

import { getHomeContent } from "@/actions/home";
import { getPastYearsWithLeaders } from "@/actions/leaders";

export default async function HomePage() {
  const homeData = await getHomeContent();
  const pastYears = await getPastYearsWithLeaders();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection data={homeData} />
      <StatsSection data={homeData} />
      <EventsPreviewSection />
      <WhyJoinSection />
      <PastLeadershipSection pastYears={pastYears} />
      <PresidentMessage data={homeData} />
    </div>
  );
}
