import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { Invoices, Customers } from "@/db/schema";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import Invoice from "./Invoice";

export default async function InvoicePage(props: { params: Promise<{ invoiceId: string; }> }) {
  const params = await props.params;
  const { userId }: { userId: string | null } = await auth()

  if (!userId) {
    return null;
  }

  const invoiceId = parseInt(params.invoiceId);

  const [result] = await db.select()
    .from(Invoices)
    .innerJoin(Customers, eq(Invoices.customerId, Customers.id))
    .where(
      and(
        eq(Invoices.id, invoiceId),
        eq(Invoices.userId, userId)
      )
    )
    .limit(1)

  if (!result) {
    return notFound();
  }

  const invoice = {
    ...result.invoices,
    customer: result.customers
  }

  return (
    <Invoice invoice={invoice} />
  );
}
