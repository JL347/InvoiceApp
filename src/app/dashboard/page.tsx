import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import Link from "next/link";
import { db } from "@/db";
import { Invoices } from "@/db/schema";
import { cn } from "@/lib/utils";
import Container from "@/components/Container";

export default async function Home() {
  const results = await db.select().from(Invoices)
  console.log(results);

  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">
            Invoices
          </h1>
          <p>
            <Button
              variant="ghost"
              className="inline-flex gap-2"
              asChild
            >
              <Link href="/invoices/new">
                <CirclePlus className="h-4 w-4" />
                Create Invoice
              </Link>
            </Button>
          </p>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] p-4">
                Date
              </TableHead>
              <TableHead className="p-4">
                Customer
              </TableHead>
              <TableHead className="p-4">
                Email
              </TableHead>
              <TableHead className="text-center p-4">
                Status
              </TableHead>
              <TableHead className="text-right p-4">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result) => {
              return (
                <TableRow key={result.id}>
                  <TableCell className="text-left p-0">
                    <Link href={`/invoices/${result.id}`} className="font-semibold p-4 block">
                      {new Date(result.createTs).toLocaleDateString()}
                    </Link>
                  </TableCell>
                  <TableCell className="text-left p-0">
                    <Link href={`/invoices/${result.id}`} className="font-semibold p-4 block">
                      Jared Lemke
                    </Link>
                  </TableCell>
                  <TableCell className="text-left p-0">
                    <Link href={`/invoices/${result.id}`} className="p-4 block">
                      jared@lemke.com
                    </Link>
                  </TableCell>
                  <TableCell className="text-center p-0">
                    <Link href={`/invoices/${result.id}`} className="p-4 block">
                      <Badge className={cn(
                        "rounded-full capitalize",
                        result.status === 'open' && 'bg-blue-500',
                        result.status === 'paid' && 'bg-green-500',
                        result.status === 'void' && 'bg-gray-500',
                        result.status === 'uncollectible' && 'bg-red-500',
                      )}>
                        {result.status}
                      </Badge>
                    </Link>
                  </TableCell>
                  <TableCell className="text-right p-0">
                    <Link href={`/invoices/${result.id}`} className="font-semibold p-4 block">
                      ${(result.amount / 100).toFixed(2)}
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Container>
    </main>
  );
}
