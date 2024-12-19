"use client";

import { SyntheticEvent, useState } from "react";
import Form from 'next/form';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/SubmitButton";
import { createAction } from "@/app/actions";
import Container from "@/components/Container";

export default function Home() {
  const [state, setState] = useState('ready');

  async function handleOnSubmit(event: SyntheticEvent) {
    if (state === 'pending') {
      event.preventDefault();
      return;
    }
    setState('pending');
  }

  return (
    <main className="h-full">
      <Container>
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-semibold">
            Create Invoice
          </h1>
        </div>

        <Form action={createAction} onSubmit={handleOnSubmit} className="grid gap-4 max-w-xs">
          <div>
            <Label htmlFor="name" className="block mb-2 font-semibold text-sm">Billing Name</Label>
            <Input id="name" name="name" type="text" />
          </div>
          <div>
            <Label htmlFor="email" className="block mb-2 font-semibold text-sm">Billing Email</Label>
            <Input id="email" name="email" type="email" />
          </div>
          <div>
            <Label htmlFor="amount" className="block mb-2 font-semibold text-sm">Amount</Label>
            <Input id="amount" name="amount" type="text" />
          </div>
          <div>
            <Label htmlFor="description" className="block mb-2 font-semibold text-sm">Description</Label>
            <Textarea id="description" name="description" />
          </div>
          <div>
            <SubmitButton />
          </div>
        </Form>
      </Container>
    </main>
  );
}
