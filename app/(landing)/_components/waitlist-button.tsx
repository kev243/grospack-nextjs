"use client";
import { Button } from "@/components/ui/button";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { canadianCities } from "@/utils/Data";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function WaitlistButton() {
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [openCity, setOpenCity] = useState(false);
  const [drink, setDrink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // État pour le Drawer

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !city || !drink) {
      toast.error("Veuillez remplir tous les champs du formulaire.");
      return;
    }

    setIsSubmitting(true);

    //  envoi de données
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Inscription réussie!");

      // Réinitialiser le formulaire
      setEmail("");
      setCity("");
      setDrink("");

      // Fermer le Drawer
      setIsDrawerOpen(false);
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative inline-block">
      {/* Couche verte (bordure) */}
      <div className="absolute inset-0 bg-green-600 rounded-full" />

      {/* Bouton noir avec texte blanc */}
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button
            className="relative px-8 py-6 bg-zinc-900 text-white font-medium rounded-full border-0 hover:bg-zinc-800 transform translate-y-[-4px] translate-x-[-4px]"
            onClick={() => setIsDrawerOpen(true)}
          >
            Rejoindre la liste d&apos;attente
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          {/* <div className="w-20 h-1 mx-auto   bg-black rounded-2xl" /> */}
          <div className="mx-auto w-full max-w-sm ">
            <DrawerHeader>
              <DrawerTitle>Rejoindre notre liste d&apos;attente</DrawerTitle>
              <DrawerDescription>
                Remplissez ce formulaire pour être parmi les premiers à être
                informés de notre lancement.
              </DrawerDescription>
            </DrawerHeader>

            <form onSubmit={handleSubmit} className="px-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Popover open={openCity} onOpenChange={setOpenCity}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCity}
                      className="w-full justify-between"
                    >
                      {city
                        ? canadianCities.find((c) => c.value === city)?.label
                        : "Sélectionnez une ville..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Rechercher une ville..." />
                      <CommandList>
                        <CommandEmpty>Aucune ville trouvée.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-y-auto">
                          {canadianCities.map((c) => (
                            <CommandItem
                              key={c.value}
                              value={c.value}
                              onSelect={(currentValue) => {
                                setCity(
                                  currentValue === city ? "" : currentValue
                                );
                                setOpenCity(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  city === c.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {c.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="drink">Type de boisson préférée</Label>
                <Select value={drink} onValueChange={setDrink} required>
                  <SelectTrigger id="drink">
                    <SelectValue placeholder="Sélectionnez un type de boisson" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bières">Bières</SelectItem>
                    <SelectItem value="gazeuses">Gazeuses</SelectItem>
                    <SelectItem value="jus">Jus</SelectItem>
                    <SelectItem value="sportive">Sportives</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </form>

            <DrawerFooter className="pt-2">
              <Button
                onClick={() =>
                  handleSubmit(
                    new Event(
                      "submit"
                    ) as unknown as React.FormEvent<HTMLFormElement>
                  )
                }
                disabled={isSubmitting}
              >
                {isSubmitting ? "Envoi en cours..." : "Rejoindre"}
              </Button>
              <DrawerClose asChild>
                <Button
                  disabled={isSubmitting}
                  onClick={() => setIsDrawerOpen(false)}
                  variant="outline"
                >
                  Annuler
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
