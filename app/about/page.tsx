import { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | NARVO Textile & Hardware",
  description: "Learn about the heritage, craftsmanship philosophy, and quality standards behind NARVO's luxury wood veneers, custom doors, and soft-closing hardware.",
};

export default function AboutPage() {
  return <AboutClient />;
}
