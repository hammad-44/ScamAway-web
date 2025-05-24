import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function AccountTabs() {
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newScams: true,
    tips: false,
    marketing: false,
  });

  const [reportsCount, setReportsCount] = useState(3);
  const [savedWebsites, setSavedWebsites] = useState([
    { id: 1, url: "safeshop.com", status: "safe", date: "2023-10-15" },
    { id: 2, url: "scamwebsite.net", status: "scam", date: "2023-11-20" },
    {
      id: 3,
      url: "checkthissite.org",
      status: "questionable",
      date: "2023-12-05",
    },
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "safe":
        return <Badge className="bg-green-500">Safe</Badge>;
      case "scam":
        return <Badge variant="destructive">Scam</Badge>;
      case "questionable":
        return <Badge className="bg-yellow-500">Questionable</Badge>;
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>;
    }
  };

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-2xl">
                  {personalInfo.firstName.charAt(0)}
                  {personalInfo.lastName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h3>
                <p className="text-gray-500">{personalInfo.email}</p>
                <Button variant="outline" className="mt-2">
                  Change Avatar
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) =>
                    setPersonalInfo({
                      ...personalInfo,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-red-600 hover:bg-red-700">
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>


      {/* Activity Tab */}
      <TabsContent value="activity">
        <Card>
          <CardHeader>
            <CardTitle>Activity History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Your Reports</h3>
              <p className="text-sm text-gray-500">
                You have submitted {reportsCount} scam reports to our database.
              </p>
              <Button variant="outline" className="mt-2">
                View All Reports
              </Button>
            </div>

            <div className="border-t pt-6 space-y-2">
              <h3 className="text-lg font-medium">Saved Websites</h3>
              <div className="space-y-4">
                {savedWebsites.map((site) => (
                  <div
                    key={site.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <p className="font-medium">{site.url}</p>
                      <p className="text-sm text-gray-500">
                        Checked on: {new Date(site.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(site.status)}
                      <Button variant="ghost" size="sm">
                        Check Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t pt-6 space-y-2">
              <h3 className="text-lg font-medium">Recent Login History</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Chrome on Windows</p>
                    <p className="text-sm text-gray-500">
                      Los Angeles, CA, USA
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">Today, 11:43 AM</p>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">iPhone App</p>
                    <p className="text-sm text-gray-500">
                      Los Angeles, CA, USA
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">Yesterday, 7:30 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
