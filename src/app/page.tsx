import HomePage from "@/components/HomePage";
import { academy } from "@/lib/data";

const schema = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: academy.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shivaji University Athletics Track",
    addressLocality: "Kolhapur",
    addressRegion: "Maharashtra",
    addressCountry: "IN"
  },
  telephone: `+91${academy.phone}`,
  url: "https://www.instagram.com/deccansportsclub/",
  sport: ["Athletics", "Fitness Training", "Sprint Training", "Police Physical Preparation"],
  areaServed: "Kolhapur"
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <HomePage />
    </>
  );
}
