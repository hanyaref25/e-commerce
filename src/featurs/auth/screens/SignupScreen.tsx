import SignupForm from "@/src/components/signup/SignupForm";
import SignupHero from "@/src/components/signup/SignupHero";

export default function SignupScreen() {
  return (
    <div className="container grid items-center grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 py-10 lg:py-16">
      <div className="hidden lg:block">
        <SignupHero />
      </div>

      <div className="w-full max-w-md mx-auto lg:max-w-none">
        <SignupForm />
      </div>
    </div>
  );
}
