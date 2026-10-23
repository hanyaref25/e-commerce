import { redirect } from "next/navigation";
import { verifyToken } from "@/src/featurs/auth/server/auth.action";
import { getUserProfile } from "@/src/featurs/profile/services/profile.service";
import ProfileSettingsScreen from "@/src/featurs/profile/screens/ProfileSettingsScreen";

export default async function SettingsPage() {
  const auth = await verifyToken();

  if (!auth.isAuthenticated || !auth.userInfo?.id) {
    redirect("/login");
  }

  const profile = await getUserProfile(String(auth.userInfo.id));

  
  return (
    <ProfileSettingsScreen
      initialProfile={
        profile
          ? {
              name: profile.name,
              email: profile.email,
              phone: profile.phone,
            }
          : null
      }
    />
  );
}
