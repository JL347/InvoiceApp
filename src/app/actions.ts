"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { Invoices } from "@/db/schema";
import { db } from "@/db";

export async function createAction(formData: FormData) {
  const { userId, redirectToSignIn }  = await auth();
  const amount = Math.floor(parseFloat(String(formData.get('amount'))) * 100);
  const description = formData.get('description') as string;

  if (!userId) {
    return redirectToSignIn();
  }

  const results = await db.insert(Invoices)
    .values({
      amount,
      description,
      userId,
      status: 'open',
    })
    .returning({
      id: Invoices.id
    })

  redirect(`/invoices/${results[0].id}`)
}