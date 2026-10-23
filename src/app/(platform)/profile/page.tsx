import { redirect } from "next/navigation";
import { verifyToken } from "@/src/featurs/auth/server/auth.action";
import { getUserProfile } from "@/src/featurs/profile/services/profile.service";
import { getUserOrders } from "@/src/featurs/orders/services/orders.actions";
import { getAddresses } from "@/src/featurs/profile/services/address.actions";
import ProfileOverviewScreen from "@/src/featurs/profile/screens/ProfileOverviewScreen";

export default async function ProfilePage() {
  const auth = await verifyToken();

  if (!auth.isAuthenticated || !auth.userInfo?.id) {
    redirect("/login");
  }

  const userId = String(auth.userInfo.id);
  const [profile, ordersResult, addressesResult] = await Promise.all([
    getUserProfile(userId),
    getUserOrders(userId),
    getAddresses(),
  ]);

  return (
    <ProfileOverviewScreen
      name={profile?.name || auth.userInfo?.name || "Guest"}
      email={profile?.email}
      phone={profile?.phone}
      role={profile?.role}
      memberSince={profile?.createdAt}
      orders={ordersResult.data ?? []}
      wishlistCount={profile?.wishlist?.length ?? 0}
      addressesCount={addressesResult.data?.length ?? 0}
    />
  );
}
