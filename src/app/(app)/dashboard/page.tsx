import { getDashboardData } from "@/app/actions/dashboard";
import DashboardPage from "@/components/pages/dashboard/dashboard";

export default async function Dashboard() {
  const data = await getDashboardData();
  return <DashboardPage data={data} />;
}
