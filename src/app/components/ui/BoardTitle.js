import Button from "@/app/components/ui/Button";
import Link from "next/link";

function BoardTitle({ text }) {
    return (
        <div className="w-200 h-10 my-4 border flex items-center">
            <h2 className="font-bold px-4">{text}
            </h2>
        </div>
    );
}

export default BoardTitle;