import { redirect } from "next/navigation";
import { verifyToken } from "@/src/featurs/auth/server/auth.action";
import { getUserOrders } from "@/src/featurs/orders/services/orders.actions";
import MyOrdersScreen from "@/src/featurs/orders/screens/MyOrdersScreen";

export default async function MyOrdersPage() {
  const auth = await verifyToken();
  const userId = auth.userInfo?.id;

  if (!auth.isAuthenticated || !userId) {
    redirect("/login");
  }

  const result = await getUserOrders(String(userId));

  return <MyOrdersScreen orders={result.data ?? []} />;
}
