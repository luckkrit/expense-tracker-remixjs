import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog";
import InputEmoji from "react-input-emoji";
import { useEffect, useState } from "react";
import emojiRegex from 'emoji-regex';
import { Button } from "~/components/ui/button";
import { useFetcher, useNavigate } from "@remix-run/react";
import { useToast } from "~/components/ui/use-toast";
import { Loader, PenBox } from "lucide-react";
import { EditBudgetProps } from "~/global";

export const EditBudget = ({ budget }: EditBudgetProps) => {

    const [text, setText] = useState(budget.name);
    const [name, setName] = useState(budget.name)
    const [icon, setIcon] = useState(budget.icon);
    const [amount, setAmount] = useState(budget.amount)
    const [error, setError] = useState("")
    const fetcher = useFetcher();
    const navigate = useNavigate()
    const { toast } = useToast()
    const [open, setOpen] = useState(false);
    useEffect(() => {
        console.log(fetcher.data, fetcher.state)
        if (fetcher.data !== undefined && fetcher.state === 'loading') {
            const data: any = fetcher.data
            if (data['error'] === null) {
                setOpen(() => false)
                setIcon(() => "❌")
                setAmount(() => "0")
                setError(() => "")
                setName(() => "")
                setText(() => "")
                toast({
                    title: "Edit Budget",
                    description: "Success",
                })
            } else {
                setError(() => data['error'])
                toast({
                    title: "Edit Budget",
                    description: data['error'],
                    variant: 'destructive'
                })
            }
        }
    }, [fetcher.data, fetcher.state])
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>

                    <Button className="flex gap-2">
                        <PenBox />
                        Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Budget</DialogTitle>
                        <DialogDescription asChild>
                            <fetcher.Form action="/dashboard/budgets/edit" method="post" >
                                <div className="mt-2 h-5">
                                    {icon.length > 0 ?
                                        <div className="border rounded-full w-fit px-2 mx-2">
                                            {icon}
                                        </div> : null}

                                    <input type="hidden" name="icon" value={icon} />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">Budget Name</h2>
                                    <InputEmoji value={text} onChange={(e) => {
                                        const regex = emojiRegex();
                                        let budgetName = e;
                                        let n = e;
                                        let value = e;
                                        let allIcons = icon
                                        for (const match of value.matchAll(regex)) {
                                            const emoji = match[0];
                                            // console.log(`Matched sequence ${emoji} — code points: ${[...emoji].length}`);
                                            // allIcons += emoji
                                            allIcons = emoji
                                            n = n.replaceAll(emoji, '')
                                        }
                                        setIcon(() => allIcons)
                                        setText(() => budgetName)
                                        setName(() => n)
                                        console.log(allIcons)
                                    }} shouldReturn={false} cleanOnEnter={true} shouldConvertEmojiToImage={false} />
                                    <input type="hidden" name="name" value={name} placeholder="e.g. Home Decor" />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">Budget Amount</h2>
                                    <input name="amount" className="border rounded-full p-3 my-1 mx-2 outline-none w-full" type="number" value={amount} onClick={(e) => {
                                        const target: EventTarget = e.target
                                        if (target instanceof HTMLInputElement) {
                                            const input: HTMLInputElement = target as HTMLInputElement
                                            input.select()
                                        }
                                    }} onChange={(e) => setAmount(() => e.target.value)} placeholder="e.g. $5000" />
                                </div>
                                <Button name="id" value={budget.id} disabled={text.length === 0 || parseInt(amount) === 0 || fetcher.state !== 'idle'} className="mt-5 w-full bg-blue-700 text-white">
                                    {
                                        fetcher.state === 'loading' ?
                                            <Loader className="animate-spin" />
                                            :
                                            "Edit Budget"
                                    }

                                </Button>
                            </fetcher.Form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
