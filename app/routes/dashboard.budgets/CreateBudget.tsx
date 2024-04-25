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
import { Loader } from "lucide-react";

export const CreateBudget = () => {
    const [text, setText] = useState("");
    const [name, setName] = useState("")
    const [icon, setIcon] = useState("❌");
    const [amount, setAmount] = useState("0")
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
                    title: "Create Budget",
                    description: "Success",
                })
            } else {
                setError(() => data['error'])
                toast({
                    title: "Create Budget",
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

                    <div className="flex flex-col bg-slate-100 p-10 rounded-md items-center border-2 border-dashed cursor-pointer hover:shadow-md">
                        <div className="text-3xl">+</div>
                        <div className="text-3xl">Create New Budget</div>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
                        <DialogDescription asChild>
                            <fetcher.Form action="/dashboard/budgets/create" method="post" >
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
                                    }} shouldReturn={false} cleanOnEnter={true} shouldConvertEmojiToImage={false} />
                                    <input type="hidden" name="name" value={name} placeholder="e.g. Home Decor" />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">Budget Amount</h2>
                                    <input name="amount" className="border rounded-full p-3 my-1 mx-2 outline-none w-full" type="number" value={amount}
                                        onClick={(e) => {
                                            const target: EventTarget = e.target
                                            if (target instanceof HTMLInputElement) {
                                                const input: HTMLInputElement = target as HTMLInputElement
                                                input.select()
                                            }
                                        }}
                                        onChange={(e) => setAmount(() => e.target.value)} placeholder="e.g. $5000" />
                                </div>
                                <Button disabled={text.length === 0 || parseInt(amount) === 0 || fetcher.state !== 'idle'} className="mt-5 w-full bg-blue-700 text-white">
                                    {fetcher.state === 'loading' ?
                                        <Loader className="animate-spin" />
                                        :
                                        "Create Budget"
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
