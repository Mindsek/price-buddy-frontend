import { getSupermarkets } from "@/app/actions/supermarkets";
import SupermarketsPage from "@/components/pages/supermarkets/supermarkets";

export default async function Supermarkets() {
  try {
    const supermarkets = await getSupermarkets();
    return <SupermarketsPage supermarkets={supermarkets} />;
  } catch (error) {
    console.error("Erreur lors du chargement des supermarchés:", error);
    return <SupermarketsPage supermarkets={[]} />;
  }
}
