"use server";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { Invoices, Status, Customers } from "@/db/schema";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

export async function createAction(formData: FormData) {
  const { userId, redirectToSignIn }  = await auth();
  
  if (!userId) {
    return redirectToSignIn();
  }
  
  const amount = Math.floor(parseFloat(String(formData.get('amount'))) * 100);
  const description = formData.get('description') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  const [customer] = await db.insert(Customers)
    .values({
      name,
      email,
      userId,
    })
    .returning({
      id: Customers.id
    })

  const results = await db.insert(Invoices)
    .values({
      amount,
      description,
      userId,
      customerId: customer.id,
      status: 'open',
    })
    .returning({
      id: Invoices.id
    })

  redirect(`/invoices/${results[0].id}`)
}

export async function updateStatusAction(formData: FormData) {
  const { userId, redirectToSignIn }  = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const id = formData.get('id') as string;
  const status = formData.get('status') as Status;

  const results = await db.update(Invoices)
    .set({
      status
    })
    .where(
      and(
        eq(Invoices.id, parseInt(id)),
        eq(Invoices.userId, userId)
      )
  )
  
  revalidatePath(`/invoices/${id}`, 'page');
  console.log(results);
}

export async function deleteInvoiceAction(formData: FormData) {
  const { userId, redirectToSignIn }  = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const id = formData.get('id') as string;

  const results = await db.delete(Invoices)
    .where(
      and(
        eq(Invoices.id, parseInt(id)),
        eq(Invoices.userId, userId)
      )
  )
  
  redirect('/dashboard');
  console.log(results);
}