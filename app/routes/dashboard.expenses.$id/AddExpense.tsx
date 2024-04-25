import { Form, useFetcher, useNavigate } from "@remix-run/react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { AddExpenseProps } from "~/global";

export const AddExpense = ({ budgetId }: AddExpenseProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const fetcher = useFetcher()
  useEffect(() => {
    if (fetcher.data !== undefined && fetcher.state === 'loading') {
      const data: any = fetcher.data
      if (data['error'] === null) {
        setAmount(() => "0")
        setError(() => "")
        setName(() => "")
        toast({
          title: "Create Expense",
          description: "Success",
        })
      } else {
        setError(() => data['error'])
        toast({
          title: "Create Expense",
          description: data['error'],
          variant: 'destructive'
        })
      }
    }
  }, [fetcher.data])
  return (
    <fetcher.Form method="post" action={`/dashboard/expenses/${budgetId}/create`}>
      <div className="border p-5 rounded-lg">
        <h2 className="font-bold text-lg">Add Expense</h2>
        <div className="mt-2">
          <h2 className="text-black font-medium my-1">Expense Name</h2>
          <input
            name="name"
            className="border rounded-full p-3 my-1 mx-2 outline-none w-full"
            type="text"
            value={name}
            onChange={(e) => {
              setName(() => e.target.value);
            }}
            placeholder="e.g. Bedroom Decor"
          />
        </div>
        <div className="mt-2">
          <h2 className="text-black font-medium my-1">Expense Amount</h2>
          <input
            name="amount"
            className="border rounded-full p-3 my-1 mx-2 outline-none w-full"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(() => e.target.value);
            }}
            placeholder="e.g. $1000"
          />
        </div>
        <Button
          disabled={name.length === 0 || parseInt(amount) === 0 || fetcher.state !== 'idle'}
          className="mt-3 bg-blue-700 w-full"
        >
          {fetcher.state === 'loading' ? <Loader className="animate-pulse" /> :
            "Add New Expense"
          }
        </Button>
      </div>
    </fetcher.Form>
  );
};
