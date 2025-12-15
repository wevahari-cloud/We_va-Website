import { HeroSection } from "@/components/home/hero-section";
import { getEvents } from "@/actions/events";
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
  const allEvents = await getEvents();

  // Filter for upcoming events (future dates)
  const today = new Date().toISOString().split('T')[0];
  const upcomingEvents = allEvents.filter((e: any) => e.date >= today).slice(0, 5); // Limit to 5 for the preview if needed, or pass all

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection data={homeData} />
      <StatsSection data={homeData} />
      <EventsPreviewSection events={upcomingEvents} />
      <WhyJoinSection />
      <PastLeadershipSection pastYears={pastYears} />
      <PresidentMessage data={homeData} />
    </div>
  );
}
