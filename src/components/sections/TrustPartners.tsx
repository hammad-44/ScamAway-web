import { Card, CardContent } from "@/components/ui/card";

export function TrustPartners() {
  const partners = [
    {
      name: "Cybersecurity Alliance",
      logo: "CSA",
      description:
        "Leading industry association for cybersecurity professionals",
    },
    {
      name: "E-Commerce Trust",
      logo: "ECT",
      description: "Supporting safe online shopping experiences globally",
    },
    {
      name: "Global Fraud Prevention",
      logo: "GFP",
      description: "International organization combating online fraud",
    },
    {
      name: "Consumer Safety Network",
      logo: "CSN",
      description: "Protecting consumer interests in the digital marketplace",
    },
    {
      name: "Digital Identity Consortium",
      logo: "DIC",
      description: "Advancing secure identity verification online",
    },
    {
      name: "Web Standards Organization",
      logo: "WSO",
      description: "Promoting safer web practices and standards",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Partnerships in Progress</h2>
          <p className="text-gray-600 text-lg">
            ScamAway is actively building relationships with security
            organizations to strengthen our scam detection capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner, index) => (
            <Card key={index} className="overflow-hidden border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded bg-gray-200 flex items-center justify-center font-bold text-gray-500 mr-4">
                    {partner.logo}
                  </div>
                  <h3 className="font-semibold text-lg">{partner.name}</h3>
                </div>
                <p className="text-gray-600">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interested in partnering with ScamAdviser to fight online fraud and
            protect internet users? Contact our partnership team to explore
            collaboration opportunities.
          </p>
        </div>
      </div>
    </section>
  );
}
