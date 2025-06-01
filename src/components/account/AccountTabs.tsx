import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export function AccountTabs() {
  const [user, setUser] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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

  const [reportsCount] = useState(3);

  const getStatusBadge = (status) => {
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setPersonalInfo({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            email: currentUser.email,
          });
        } else {
          setPersonalInfo({
            firstName: "",
            lastName: "",
            email: currentUser.email,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);
 const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await signOut(auth);
    navigate("/login"); 
  } catch (error) {
    console.error("Logout failed:", error);
    alert("Failed to log out.");
  }
};

  const handleUpdateProfile = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, "users", user.uid), {
        firstName: personalInfo.firstName,
        lastName: personalInfo.lastName,
      }, { merge: true });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Tabs defaultValue="profile" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="profile">Profile</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={personalInfo.email} disabled />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={personalInfo.firstName}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={personalInfo.lastName}
                  onChange={(e) =>
                    setPersonalInfo({ ...personalInfo, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button onClick={handleUpdateProfile} className="bg-blue-600 hover:bg-blue-700">
                Change Profile
              </Button>
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            </div>

          </CardContent>
        </Card>
      </TabsContent>

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
