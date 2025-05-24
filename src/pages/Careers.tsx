import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Briefcase, GraduationCap } from "lucide-react";

const Careers = () => {
  const openPositions = [
    {
      title: "Senior Cybersecurity Analyst",
      department: "Security",
      location: "Amsterdam, Netherlands",
      type: "Full-time",
      remote: true,
      description:
        "We're looking for an experienced cybersecurity professional to help improve our scam detection algorithms and conduct security research.",
      requirements: [
        "5+ years of experience in cybersecurity",
        "Strong knowledge of web security threats and vulnerabilities",
        "Experience with threat intelligence and analysis",
        "Programming skills in Python or similar languages",
      ],
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Amsterdam, Netherlands",
      type: "Full-time",
      remote: true,
      description:
        "Join our engineering team to build and maintain our web applications with a focus on user experience and performance.",
      requirements: [
        "3+ years of experience with React and modern JavaScript",
        "Experience with TypeScript and responsive design",
        "Knowledge of web performance optimization",
        "Understanding of web security principles",
      ],
    },
    {
      title: "UX/UI Designer",
      department: "Design",
      location: "Amsterdam, Netherlands",
      type: "Full-time",
      remote: true,
      description:
        "Help design intuitive and accessible user interfaces for our web and mobile applications.",
      requirements: [
        "Portfolio demonstrating UI/UX skills",
        "Experience with Figma or similar design tools",
        "Understanding of accessibility standards",
        "Experience designing for both web and mobile platforms",
      ],
    },
    {
      title: "Customer Support Specialist",
      department: "Support",
      location: "Amsterdam, Netherlands",
      type: "Full-time",
      remote: false,
      description:
        "Provide excellent support to our users, helping them navigate our platform and resolve issues.",
      requirements: [
        "Experience in customer service",
        "Strong communication skills",
        "Problem-solving abilities",
        "Knowledge of cybersecurity concepts (a plus)",
      ],
    },
  ];

  const benefits = [
    {
      title: "Competitive Compensation",
      description:
        "We offer competitive salaries and equity options to ensure you share in our success.",
      icon: <Briefcase className="h-10 w-10 text-red-600" />,
    },
    {
      title: "Remote Work Options",
      description:
        "Most positions offer flexible remote work options or hybrid arrangements.",
      icon: <MapPin className="h-10 w-10 text-blue-600" />,
    },
    {
      title: "Continuous Learning",
      description:
        "We provide education allowances and time for professional development.",
      icon: <GraduationCap className="h-10 w-10 text-green-600" />,
    },
    {
      title: "Work-Life Balance",
      description:
        "Enjoy flexible working hours and generous paid time off to recharge.",
      icon: <Clock className="h-10 w-10 text-yellow-600" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Careers at ScamAdviser"
          description="Join our mission to make the internet safer for everyone"
        />

        <div className="container mx-auto px-4 py-8">
          {/* Company Culture Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Why Work With Us
            </h2>

            <div className="max-w-3xl mx-auto mb-12 text-gray-700 space-y-4">
              <p>
                At ScamAdviser, we're passionate about creating a safer internet
                experience for everyone. Our team is made up of dedicated
                professionals who combine technical expertise with a genuine
                desire to protect users from online fraud.
              </p>
              <p>
                We value innovation, collaboration, and integrity in everything
                we do. As a growing company, we offer opportunities for
                professional growth and the chance to make a meaningful impact
                on people's digital lives.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4">{benefit.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Open Positions Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Open Positions
            </h2>

            <div className="space-y-6">
              {openPositions.map((job, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                        <p className="text-gray-600">
                          {job.department} · {job.location}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge
                          className={
                            job.remote
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                          }
                        >
                          {job.remote ? "Remote" : "On-site"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{job.description}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {job.requirements.map((req, i) => (
                          <li key={i}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <Button className="bg-red-600 hover:bg-red-700">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Application Process */}
          <section className="bg-white p-8 rounded-lg shadow-sm mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Our Application Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Application Review
                </h3>
                <p className="text-gray-600">
                  We review your resume and application to see if your skills
                  and experience match our requirements.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Interviews & Assessment
                </h3>
                <p className="text-gray-600">
                  You'll have 2-3 interviews with team members and complete any
                  relevant skills assessments.
                </p>
              </div>

              <div className="text-center">
                <div className="bg-red-100 text-red-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Offer & Onboarding
                </h3>
                <p className="text-gray-600">
                  If successful, you'll receive an offer and begin our
                  comprehensive onboarding process.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-red-50 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">
              Don't See a Perfect Fit?
            </h2>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals to join our team.
              Send us your resume and we'll keep it on file for future
              opportunities.
            </p>
            <Button className="bg-red-600 hover:bg-red-700">
              Send Speculative Application
            </Button>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
