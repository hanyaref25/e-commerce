import SignupForm from "@/src/components/signup/SignupForm";
import SignupHero from "@/src/components/signup/SignupHero";

export default function SignupScreen() {
  return (
    <div className="container grid items-center grid-cols-2 gap-16 py-16">
      <SignupHero />
      <SignupForm />
    </div>
  );
}
