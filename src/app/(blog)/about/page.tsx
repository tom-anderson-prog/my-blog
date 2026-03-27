import type { Metadata } from "next";
import AboutContentPage from "./about-content";

export const metadata: Metadata = {
  title: "About me",
};

export default function AboutPage() {
  return (
    <>
      <AboutContentPage />
    </>
  );
}
