import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { RegisterForm } from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Create Your Account"
          description="Join ScamAdviser to help make the internet safer for everyone"
        />

        <div className="container mx-auto px-4 py-8">
          <RegisterForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
