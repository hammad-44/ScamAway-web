import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { AccountTabs } from "@/components/account/AccountTabs";

const Account = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="My Account"
          description="Manage your profile, security settings, and activity"
        />

        <div className="container mx-auto px-4 py-8">
          <AccountTabs />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
