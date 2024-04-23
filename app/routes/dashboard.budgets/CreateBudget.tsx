import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/components/ui/dialog"
import InputEmoji from "react-input-emoji";
import { useState } from "react";
import emojiRegex from 'emoji-regex';
import { Button } from "~/components/ui/button";
import { Form } from "@remix-run/react";

export const CreateBudget = () => {
    const [text, setText] = useState("");
    const [icon, setIcon] = useState("");
    const [amount, setAmount] = useState("0")

    function handleOnEnter(text: string) {
        console.log("enter", text);
    }
    return (
        <div>
            <Dialog>
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
                            <Form>
                                <div className="mt-2 h-5">
                                    {icon.length > 0 ?
                                        <div className="border rounded-full w-fit px-2 mx-2">
                                            {icon}
                                        </div> : null}
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">Budget Name</h2>
                                    <InputEmoji value={text} onChange={(e) => {
                                        const regex = emojiRegex();
                                        let budgetName = e;
                                        let value = e;
                                        let allIcons = icon
                                        for (const match of value.matchAll(regex)) {
                                            const emoji = match[0];
                                            // console.log(`Matched sequence ${emoji} — code points: ${[...emoji].length}`);
                                            allIcons += emoji
                                            // budgetName = budgetName.replaceAll(emoji, '')
                                        }
                                        setIcon(() => allIcons)
                                        setText(() => budgetName)
                                        console.log(allIcons)
                                    }} shouldReturn={false} cleanOnEnter={true} shouldConvertEmojiToImage={false} onEnter={handleOnEnter} />
                                </div>
                                <div className="mt-2">
                                    <h2 className="text-black font-medium my-1">Budget Amount</h2>
                                    <input className="border rounded-full p-3 my-1 mx-2 outline-none w-full" type="number" value={amount} onChange={(e) => setAmount(() => e.target.value)} />
                                </div>
                                <Button disabled={text.length === 0 || parseInt(amount) === 0} className="mt-5 w-full bg-blue-700 text-white">Create Budget</Button>
                            </Form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
