import { z } from "zod";

export const prospectSchema = z.object({
  email: z.string().email({ message: "L'adresse email n'est pas valide." }),
  city: z
    .string()
    .min(1, { message: "La ville est obligatoire." })
    .max(30, {
      message: "Le nom de la ville est trop long (100 caractères max).",
    }),
  drink: z
    .string()
    .min(1, { message: "La boisson est obligatoire." })
    .max(20, {
      message: "Le nom de la boisson est trop long (50 caractères max).",
    }),
});
