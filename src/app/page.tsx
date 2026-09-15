"use client";

import { useState } from "react";
import { SplashScreen } from "@/components/splash-screen";
import { HomeNavbar } from "@/components/home-navbar";
import { HomeHero } from "@/components/sections/home-hero";
import { HomeProjects } from "@/components/sections/home-projects";
import { HomeCaseStudies } from "@/components/sections/home-case-studies";
import { HomeSkills } from "@/components/sections/home-skills";
import { HomeFooter } from "@/components/home-footer";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="bg-white font-open-sauce">
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <HomeNavbar />
      <HomeHero />
      <HomeProjects />
      <HomeCaseStudies />
      <HomeSkills />
      <HomeFooter />
    </div>
  );
}
