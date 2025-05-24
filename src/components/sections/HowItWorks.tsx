import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search, AlertCircle, Check, Shield } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-12 w-12 text-red-600" />,
      title: "Enter a Website URL",
      description:
        "Simply paste the website address, phone number, crypto wallet address, or IBAN you want to check into our search tool.",
    },
    {
      icon: <Shield className="h-12 w-12 text-blue-600" />,
      title: "Instant Analysis",
      description:
        "Our sophisticated algorithm analyzes multiple factors including domain age, owner information, website content, and community reports.",
    },
    {
      icon: <AlertCircle className="h-12 w-12 text-yellow-600" />,
      title: "Get Detailed Results",
      description:
        "Receive a comprehensive trust score and detailed report explaining why the website may or may not be trustworthy.",
    },
    {
      icon: <Check className="h-12 w-12 text-green-600" />,
      title: "Browse Safely",
      description:
        "Make an informed decision about whether to proceed with the website or avoid it based on our trustworthiness assessment.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">How ScamAway Works</h2>
          <p className="text-gray-600 text-lg">
            Our powerful technology helps you identify fraudulent websites
            before you become a victim. Here's how it works in four simple
            steps:
          </p>
        </div>

        <div className="relative">
          {/* Progress line connecting the steps */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-gray-200 hidden md:block">
            <div className="h-full bg-red-600 w-0 transition-all duration-1000 ease-in-out"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-white rounded-full p-4 shadow-md mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link to="/how-it-works">Learn More About Our Technology</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
