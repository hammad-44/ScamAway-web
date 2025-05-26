import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Shield, Star, Users, Globe, Award } from "lucide-react";

const About = () => {
  const stats = [
    {
      value: "1M+",
      label: "Websites Analyzed",
      icon: <Globe className="h-8 w-8 text-blue-500" />,
    },
    {
      value: "0.5M+",
      label: "Active Users",
      icon: <Users className="h-8 w-8 text-green-500" />,
    },
    {
      value: "1M+",
      label: "Scams Reported",
      icon: <Shield className="h-8 w-8 text-red-500" />,
    },
    {
      value: "98%",
      label: "Detection Accuracy",
      icon: <Award className="h-8 w-8 text-yellow-500" />,
    },
  ];

  const teamMembers = [
    { name: "Omar", role: "CEO & Founder", img: "" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="About ScamAway"
          description="Our mission is to create a safer internet by helping users avoid scams and fraudulent websites"
        />

        <div className="container mx-auto px-4 py-8">
         

          {/* Stats Section */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center">
              ScamAway by the Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4">{stat.icon}</div>
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mission & Values */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Our Mission & Values
            </h2>

            <div className="max-w-3xl mx-auto mb-10 text-center">
              <p className="text-xl font-medium text-gray-700">
                Our mission is to create a safer internet ecosystem where users
                can browse, shop, and interact online with confidence and peace
                of mind.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  <Shield className="h-12 w-12 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  Protection
                </h3>
                <p className="text-gray-600 text-center">
                  We believe everyone deserves to be protected from online
                  scams, regardless of their technical knowledge or background.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  <Star className="h-12 w-12 text-yellow-500" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Accuracy</h3>
                <p className="text-gray-600 text-center">
                  We are committed to providing the most accurate and up-to-date
                  information about potentially fraudulent websites.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">
                  Community
                </h3>
                <p className="text-gray-600 text-center">
                  We foster a community-driven approach where users help each
                  other stay safe by reporting scams they encounter.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Meet Our Team
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm text-center"
                >
                  <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-gray-400">
                    {member.img ? (
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      member.name.charAt(0)
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
