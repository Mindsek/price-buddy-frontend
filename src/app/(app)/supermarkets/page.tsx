import { getSupermarkets } from "@/app/actions/supermarkets";
import SupermarketsPage from "@/components/pages/supermarkets/supermarkets";
import { Supermarket } from "@/types/price-buddy";
export default async function Supermarkets() {
  let supermarkets: Supermarket[] = [];
  try {
    supermarkets = await getSupermarkets();
  } catch (error) {
    console.error("Erreur lors du chargement des supermarchés:", error);
  }
  return <SupermarketsPage supermarkets={supermarkets} />;
}
