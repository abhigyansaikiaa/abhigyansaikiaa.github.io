import { BASE_URL, OG_IMAGE } from "@/lib/constants";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Your Name",
    url: BASE_URL,
    image: OG_IMAGE,
    description:
      "Professional web developer and designer specializing in modern web technologies and creative digital solutions.",
    jobTitle: "Web Developer & Designer",
    sameAs: [
      // Add your social media profiles
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
      "https://twitter.com/yourhandle",
    ],
    knowsAbout: [
      "Web Development",
      "Frontend Development",
      "Next.js",
      "React",
      "TypeScript",
      "UI/UX Design",
      "Full Stack Development",
    ],
  };

  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Your Name Portfolio",
    url: BASE_URL,
    description:
      "Professional portfolio showcasing web development, design, and digital solutions.",
    author: {
      "@type": "Person",
      name: "Your Name",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Your Name",
    image: `${BASE_URL}/md-red-logo.svg`,
    "@id": BASE_URL,
    url: BASE_URL,
    telephone: "",
    address: {
      "@type": "PostalAddress",
      streetAddress: "",
      addressLocality: "",
      postalCode: "",
      addressCountry: "",
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
    </>
  );
}
