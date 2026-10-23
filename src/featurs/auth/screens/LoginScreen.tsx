import LoginForm from "@/src/components/login/LoginForm";
import LoginHero from "@/src/components/login/LoginHero";

export default function LoginScreen() {
  return (
    <div className="container grid items-center lg:grid-cols-2 gap-16 py-16">
      <LoginHero />
      <LoginForm />
    </div>
  );
}
