"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart } from "lucide-react";

export function Analytics() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Évolution des prix</CardTitle>
          <CardDescription>
            Tendance des prix sur les 30 derniers jours
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <LineChart className="h-16 w-16 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Les données analytiques seront disponibles prochainement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Répartition des économies</CardTitle>
          <CardDescription>Par catégorie de produit</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <BarChart className="h-16 w-16 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Les données analytiques seront disponibles prochainement
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
