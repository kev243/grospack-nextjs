"use client";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { prospectAction } from "@/app/actions/prospect-action";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { prospectSchema } from "@/lib/zod-shemas";

export function WaitlistButton() {
  const [openCity, setOpenCity] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // État pour le Drawer

  const form = useForm<z.infer<typeof prospectSchema>>({
    resolver: zodResolver(prospectSchema),
    defaultValues: {
      email: "",
      city: "",
      drink: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  // Fonction de soumission du formulaire
  const onSubmit = async (values: z.infer<typeof prospectSchema>) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("city", values.city);
      formData.append("drink", values.drink);

      const response = await prospectAction(formData);
      if (response.success) {
        toast.success(response.message);
        form.reset();
        setIsDrawerOpen(false);
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-green-600 rounded-full" />
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button className="relative px-8 py-6 bg-zinc-900 text-white font-medium rounded-full border-0 hover:bg-zinc-800 transform translate-y-[-4px] translate-x-[-4px]">
            Rejoindre la liste d&apos;attente
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Rejoindre notre liste d&apos;attente</DrawerTitle>
              <DrawerDescription>
                Remplissez ce formulaire pour être parmi les premiers informés
                de notre lancement.
              </DrawerDescription>
            </DrawerHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="px-4 space-y-4"
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Ville */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville</FormLabel>
                      <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openCity}
                              className="w-full justify-between"
                            >
                              {field.value
                                ? canadianCities.find(
                                    (c) => c.value === field.value
                                  )?.label
                                : "Sélectionnez une ville..."}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
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
                                    onSelect={() => {
                                      form.setValue("city", c.value);
                                      setOpenCity(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        field.value === c.value
                                          ? "opacity-100"
                                          : "opacity-0"
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Drink */}
                <FormField
                  control={form.control}
                  name="drink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de boisson préférée</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un type de boisson" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bières">Bières</SelectItem>
                          <SelectItem value="gazeuses">Gazeuses</SelectItem>
                          <SelectItem value="jus">Jus</SelectItem>
                          <SelectItem value="sportive">Sportives</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DrawerFooter className="pt-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Envoi en cours..." : "Rejoindre"}
                  </Button>
                  <DrawerClose asChild>
                    <Button disabled={isSubmitting} variant="outline">
                      Annuler
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </Form>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
