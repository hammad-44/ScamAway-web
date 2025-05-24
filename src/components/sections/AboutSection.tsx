import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Check, AlertTriangle, Eye } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-red-600" />,
      title: "Trusted Protection",
      description:
        "Our advanced algorithms scan websites to detect potential scams and fraudulent activity before you engage with them.",
    },
    {
      icon: <Check className="h-10 w-10 text-green-600" />,
      title: "Verified Database",
      description:
        "We maintain a constantly updated database of over 1 million verified legitimate websites to ensure accurate results.",
    },
    {
      icon: <AlertTriangle className="h-10 w-10 text-yellow-600" />,
      title: "Community Reports",
      description:
        "Our users help strengthen our protection network by reporting scams they encounter, helping protect others.",
    },
    {
      icon: <Eye className="h-10 w-10 text-blue-600" />,
      title: "Real-time Monitoring",
      description:
        "We continuously monitor suspicious websites and alert our users to newly discovered threats as they emerge.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            A Fresh Approach to Online Safety
          </h2>
          <p className="text-gray-600 text-lg">
            ScamAway is dedicated to creating a safer internet by helping users
            identify and avoid fraudulent websites using cutting-edge detection
            technology and community intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-red-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Join Our Growing Community of Safety-Conscious Users
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Whether you're shopping online, visiting a new website, or receiving
            suspicious emails, ScamAdviser helps you make informed decisions
            about which sites to trust.
          </p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link to="/about">Learn More About Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
