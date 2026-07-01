import { Hero } from "@/components/sections/Hero";
import { Starter } from "@/components/sections/Starter";
import { Trainer } from "@/components/sections/Trainer";
import { BattleLab } from "@/components/sections/BattleLab";
import { ProjectDex } from "@/components/sections/ProjectDex";
import { RegionJourney } from "@/components/sections/RegionJourney";
import { League } from "@/components/sections/League";

export default function Home() {
  return (
    <>
      <Hero />
      <Starter />
      <Trainer />
      <BattleLab />
      <ProjectDex />
      <RegionJourney />
      <League />
    </>
  );
}
