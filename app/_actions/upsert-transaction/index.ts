"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/_lib/prisma";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import { upsertTransactionSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
  id?: string;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  paymentMethod: TransactionPaymentMethod;
  date: Date;
}

export const upsertTransaction = async (params: AddTransactionParams) => {
  upsertTransactionSchema.parse(params);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Faça Login");
  }

  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },
    where: {
      id: params.id ?? "",
    },
  });
  revalidatePath("/transactions");
};
