import type { Metadata } from "next";
import { DroneHero } from "./drone-hero";

export const metadata: Metadata = {
  title: "DroneOps AI — Fleet Command Console | Abhishek Bobade",
  description:
    "An AI-assisted drone fleet command console: live telemetry, geofence and battery failsafes, mission planning, and MAVLink v2 connectivity — runnable with zero real hardware via a built-in flight simulator.",
};

export default function DroneCaseStudy() {
  return <DroneHero />;
}
