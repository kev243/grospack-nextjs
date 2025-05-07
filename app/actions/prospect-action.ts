"use server";
import prisma from "@/lib/prisma";
import { prospectSchema } from "@/lib/zod-shemas";

export async function prospectAction(data: FormData) {
  // Extraire les données du formulaire
  const email = data.get("email") as string;
  const city = data.get("city") as string;
  const drink = data.get("drink") as string;

  // Valider les données avec Zod
  const validationResult = prospectSchema.safeParse({ email, city, drink });

  if (!validationResult.success) {
    // Retourner les erreurs de validation
    const errors = validationResult.error.errors
      .map((err) => err.message)
      .join(", ");
    throw new Error(`Validation échouée : ${errors}`);
  }

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingProspect = await prisma.prospect.findUnique({
      where: { email },
    });

    if (existingProspect) {
      return {
        success: true,
        message: "Vous êtes déjà sur la liste d'attente, merci !",
        data: existingProspect,
      };
    }
    // Enregistrement dans la base de données
    const prospect = await prisma.prospect.create({
      data: {
        email,
        city,
        drink,
      },
    });

    return { success: true, message: "Inscription réussie ! ", prospect };
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du prospect :", error);
    throw new Error(
      "Impossible d'enregistrer les données. Veuillez réessayer."
    );
  }
}
