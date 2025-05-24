import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScamCheckerInput } from "@/components/scam-checker/ScamCheckerInput";
import { ReportScamCard } from "@/components/scam-checker/ReportScamCard";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  ExternalLink,
  FileText,
  Download,
  Shield,
  Globe,
  AlertTriangle,
  User,
} from "lucide-react";
import { StatisticsCard } from "@/components/dashboard/StatisticsCard";
import { AboutSection } from "@/components/sections/AboutSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Testimonials } from "@/components/sections/Testimonials";
import { Newsletter } from "@/components/sections/Newsletter";
import { TrustPartners } from "@/components/sections/TrustPartners";

const Index = () => {
  const handleScamCheck = (value: string, type: string) => {
    console.log(`Checking ${type}: ${value}`);
    // In a real implementation, this would call an API or redirect to results
  };

  // Statistics for the dashboard
  const statistics = [
    {
      title: "Websites Scanned",
      value: "10.5K+",
      icon: <Globe className="h-6 w-6 text-primary" />,
      description: "Total websites analyzed",
      trend: { value: 23, isPositive: true },
    },
    {
      title: "Scans Today",
      value: "1,217",
      icon: <Shield className="h-6 w-6 text-primary" />,
      description: "Websites checked in the last 24h",
      trend: { value: 16, isPositive: true },
    },
    {
      title: "Scams Reported",
      value: "843",
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      description: "Community-reported scams",
      trend: { value: 12, isPositive: true },
    },
    {
      title: "Active Users",
      value: "5.2K+",
      icon: <User className="h-6 w-6 text-primary" />,
      description: "People joining our community",
      trend: { value: 28, isPositive: true },
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-100 to-gray-200 py-12 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Your New Anti-Scam Partner,
              <br />
              Keeping You Safe!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Instantly check for scams, and report suspicious sites with a
              single click to help build our community protection network
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Scam Checker Area */}
            <Card className="col-span-1 lg:col-span-2">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Quick check for scams
                </h2>
                <ScamCheckerInput onCheck={handleScamCheck} />
              </CardContent>
            </Card>

            {/* Reporting Area */}
            <ReportScamCard className="col-span-1" />
          </div>
        </section>

        {/* Statistics Dashboard */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">
              Building a Safer Internet Together
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Our innovative scam detection technology is designed to help you
              identify and avoid potentially harmful websites before you share
              personal information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <StatisticsCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                description={stat.description}
                trend={stat.trend}
              />
            ))}
          </div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Newsletter Section */}
        <Newsletter />

        {/* Trust Partners Section */}
        <TrustPartners />

     
      </main>

      <Footer />
    </div>
  );
};

export default Index;
