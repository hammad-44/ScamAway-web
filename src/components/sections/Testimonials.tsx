import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  date: string;
  avatarUrl?: string;
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "Moaz Sikandar",
      role: "Online Shopper",
      content:
        "ScamAway saved me from falling for a fake online store. I was about to purchase an expensive item when I decided to check the site first. The detailed report showed it was only created a week ago with no customer reviews. Thank you!",
      rating: 5,
      date: "April 3, 2025",
    },
    {
      name: "Sajjad",
      role: "Small Business Owner",
      content:
        "As a business owner, I was curious to see how my website would score. ScamAway's detailed analysis highlighted a few security improvements I could make. The analytics are so much more comprehensive than other tools I've tried.",
      rating: 5,
      date: "April 15, 2025"
    },
    {
      name: "Arshad",
      role: "Retired Teacher",
      content:
        "I'm not very tech-savvy, but ScamAway makes it easy for me to check if websites are safe before I enter my payment details. The clear rating system is perfect for someone like me who just wants a straightforward answer.",
      rating: 4,
      date: "May 2, 2025",
    },
    {
      name: "Asad",
      role: "Cybersecurity Analyst",
      content:
        "As a professional in the security field, I'm impressed with the comprehensive approach ScamAway takes. Their algorithm considers numerous factors that even experienced users might miss. The technical details provided in the analysis are excellent.",
      rating: 5,
      date: "May 10, 2025",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Early User Feedback</h2>
          <p className="text-gray-600 text-lg">
            Our beta testers have provided valuable feedback as we launch
            ScamAway. Here's what our early adopters have to say about our
            service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  {testimonial.avatarUrl ? (
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold mr-4">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 flex-grow">{testimonial.content}</p>

                <p className="text-sm text-gray-500 mt-4">{testimonial.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
