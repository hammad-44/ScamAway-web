import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, ExternalLink, Calendar } from "lucide-react";

const Press = () => {
  const pressReleases = [
    {
      title: "ScamAdviser Launches New AI-Powered Scam Detection System",
      date: "October 15, 2023",
      summary:
        "Today, ScamAdviser announced the launch of its next-generation scam detection system powered by advanced artificial intelligence, improving accuracy by 35%.",
      link: "#",
    },
    {
      title: "ScamAdviser Reports 40% Increase in Online Shopping Scams",
      date: "July 7, 2023",
      summary:
        "New data from ScamAdviser shows a 40% year-over-year increase in online shopping scams, with fake electronics stores being the most common type.",
      link: "#",
    },
    {
      title: "ScamAdviser Partners with Global Cybersecurity Alliance",
      date: "May 21, 2023",
      summary:
        "ScamAdviser has joined forces with the Global Cybersecurity Alliance to share data and resources in the fight against online fraud.",
      link: "#",
    },
    {
      title: "ScamAdviser Reaches 2 Million Active Users Milestone",
      date: "February 12, 2023",
      summary:
        "ScamAdviser today announced that it has reached 2 million active users, marking a significant milestone in the company's growth.",
      link: "#",
    },
  ];

  const mediaAppearances = [
    {
      outlet: "CNN Business",
      title: "How to Protect Yourself from the Rise in Holiday Shopping Scams",
      date: "November 28, 2023",
      link: "#",
    },
    {
      outlet: "Forbes",
      title: "The Top 10 Cybersecurity Tools for Consumers in 2023",
      date: "September 15, 2023",
      link: "#",
    },
    {
      outlet: "WIRED",
      title: "Inside the AI Revolution in Fraud Detection",
      date: "August 3, 2023",
      link: "#",
    },
    {
      outlet: "Bloomberg",
      title: "How One Company Is Helping Millions Avoid Online Scams",
      date: "June 17, 2023",
      link: "#",
    },
  ];

  const resources = [
    {
      title: "Company Fact Sheet",
      description: "Key facts and figures about ScamAdviser",
      format: "PDF",
      size: "1.2 MB",
      link: "#",
    },
    {
      title: "Brand Assets",
      description: "Logos and brand guidelines",
      format: "ZIP",
      size: "8.5 MB",
      link: "#",
    },
    {
      title: "Executive Headshots",
      description: "High-resolution photos of our leadership team",
      format: "ZIP",
      size: "15.3 MB",
      link: "#",
    },
    {
      title: "2023 State of Online Scams Report",
      description: "Comprehensive analysis of online fraud trends",
      format: "PDF",
      size: "4.7 MB",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Press & Media"
          description="News, resources, and information for journalists and media professionals"
        />

        <div className="container mx-auto px-4 py-8">
          {/* Press Contact Section */}
          <section className="mb-16 bg-white p-8 rounded-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Press Contact</h2>
                <p className="text-gray-700 mb-6">
                  For press inquiries, please contact our media relations team.
                  We aim to respond to all media requests within 24 hours.
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Sarah Johnson</p>
                  <p>Head of Communications</p>
                  <p>
                    <a
                      href="mailto:press@scamadviser.com"
                      className="text-red-600 hover:text-red-800"
                    >
                      press@scamadviser.com
                    </a>
                  </p>
                  <p>+31 (0) 20 123 4567</p>
                </div>
              </div>
              <div className="space-y-4">
                <Button className="w-full md:w-auto bg-red-600 hover:bg-red-700">
                  Request Media Interview
                </Button>
                <p className="text-sm text-gray-600">
                  Our experts are available to provide insights on online fraud,
                  cybersecurity, consumer protection, and e-commerce safety.
                </p>
              </div>
            </div>
          </section>

          {/* Press Releases Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Press Releases</h2>

            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <CardTitle className="text-lg">{release.title}</CardTitle>
                      <div className="flex items-center text-gray-500 mt-2 md:mt-0">
                        <Calendar className="h-4 w-4 mr-1" />
                        {release.date}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{release.summary}</p>
                    <Button variant="outline" size="sm" asChild>
                      <a href={release.link} target="_blank" rel="noopener">
                        <FileText className="mr-2 h-4 w-4" /> Read Full Release
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Button variant="outline">View All Press Releases</Button>
            </div>
          </section>

          {/* Media Appearances Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Media Appearances</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {mediaAppearances.map((appearance, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <Badge className="mb-2 bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {appearance.outlet}
                    </Badge>
                    <h3 className="text-lg font-semibold mb-2">
                      {appearance.title}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      <Calendar className="inline h-4 w-4 mr-1" />
                      {appearance.date}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      asChild
                    >
                      <a href={appearance.link} target="_blank" rel="noopener">
                        <ExternalLink className="h-4 w-4" /> Read Article
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Press Kit Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Media Resources</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {resource.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {resource.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {resource.format} • {resource.size}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1"
                      asChild
                    >
                      <a href={resource.link} download>
                        <Download className="h-4 w-4" /> Download
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* In The News */}
          <section className="bg-white p-8 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-center">
              ScamAdviser In The News
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center grayscale">
              <img
                src="https://placehold.co/150x60?text=CNN"
                alt="CNN Logo"
                className="max-h-10"
              />
              <img
                src="https://placehold.co/150x60?text=Forbes"
                alt="Forbes Logo"
                className="max-h-10"
              />
              <img
                src="https://placehold.co/150x60?text=WIRED"
                alt="WIRED Logo"
                className="max-h-10"
              />
              <img
                src="https://placehold.co/150x60?text=Bloomberg"
                alt="Bloomberg Logo"
                className="max-h-10"
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
