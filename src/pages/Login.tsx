import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/ui/PageHeader";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow">
        <PageHeader
          title="Sign In to Your Account"
          description="Access your ScamAway account to check and report scams"
        />

        <div className="container mx-auto px-4 py-8">
          <LoginForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
