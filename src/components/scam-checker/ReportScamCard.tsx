import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ReportScamCardProps {
  className?: string;
}

export function ReportScamCard({ className }: ReportScamCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">
          Report scams to help others
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-6 text-center">
          Share your experience and protect the community
        </p>
        <Button
          asChild
          className="w-full bg-red-600 hover:bg-red-700 text-white"
        >
          <Link to="/report">Report</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
