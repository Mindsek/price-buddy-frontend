"use client";

import { addSupermarket } from "@/app/actions/supermarkets";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Nom du supermarché doit contenir au moins 2 caractères.",
  }),
  address: z.string().min(2, {
    message: "Adresse doit contenir au moins 2 caractères.",
  }),
});

type AddSupermarketDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddSupermarketDialog({
  isOpen,
  onClose,
}: AddSupermarketDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      address: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await addSupermarket(data.name, data.address);

      form.reset();
      onClose();
      toast.success(`Supermarché ${data.name} ajouté avec succès`);
    } catch (error) {
      console.error("Erreur lors de l'ajout du supermarché:", error);
      toast.error(`Erreur lors de l'ajout du supermarché ${data.name}`);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un supermarché</DialogTitle>
          <DialogDescription>
            Entrez les informations du nouveau supermarché.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du supermarché</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Carrefour" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="ex: 123 Avenue de la République, 75011 Paris"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Ajout en cours..." : "Ajouter"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
