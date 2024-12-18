"use server";

import { redirect } from "next/navigation";

import { Invoices } from "@/db/schema";
import { db } from "@/db";

export async function createAction(formData: FormData) {
  const amount = Math.floor(parseFloat(String(formData.get('amount'))) * 100);
  const description = formData.get('description') as string;

  const results = await db.insert(Invoices)
    .values({
      amount,
      description,
      status: 'open',
    })
    .returning({
      id: Invoices.id
    })

  redirect(`/invoices/${results[0].id}`)
}