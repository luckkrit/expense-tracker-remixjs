import { useFetcher, useNavigate } from '@remix-run/react'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '~/components/ui/button'
import { toast } from '~/components/ui/use-toast'
import { DeleteBudgetProps } from '~/global'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "~/components/ui/alert-dialog"

export const DeleteBudget = ({ budgetId }: DeleteBudgetProps) => {
    const fetcher = useFetcher()
    const intent = "delete_budget"
    const [error, setError] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        console.log('fetcher delete')
        if (fetcher.data !== undefined && fetcher.state === 'loading') {
            const data: any = fetcher.data
            if (data['error'] === null) {
                toast({
                    title: "Delete Budget",
                    description: "Success",
                })
            } else {
                setError(() => data['error'])
                toast({
                    title: "Delete Budget",
                    description: data['error'],
                    variant: 'destructive'
                })
            }
        }
    }, [fetcher.data])
    return (
        <fetcher.Form action={`/dashboard/budgets/${budgetId}/delete`} method='post'>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="flex gap-2" variant={"destructive"}>
                        <Trash />
                        Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Delete budget?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => {
                            const formData = new FormData();
                            fetcher.submit(formData, { method: 'post', action: `/dashboard/budgets/${budgetId}/delete` })
                        }}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

        </fetcher.Form>
    )
}
