import Board from "@/app/components/Board";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import {fetch} from "next/dist/compiled/@edge-runtime/primitives";
import DeleteButton from "@/app/components/DeleteButton";
import Comment from "@/app/components/Comment";




async function getBoardById(id) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${apiUrl}board/${parseInt(id)}`, {cache: "no-store"});

        const data = await res.json();
        if (!res.ok) {
            throw new Error("게시글을 불러올 수 없습니다");
        }
        return data;

    } catch (e) {
        let errorMessage = "서버와 연결되지 않았습니다"
        return errorMessage;
    }
}

export default async function Page({params}) {
    const {id} = await params
    console.log(id);
    const board = await getBoardById(id); //id 값을 getBoardById 로 보내준다 그리고 board 값을 받아온다

    return <div>

        <div className="flex justify-items-center gap-4">
            <Link href="/">
                <Button text="뒤로가기"/>
            </Link>
            <Link href="/">
                <DeleteButton boardId={id}/>
            </Link>
            <Link href={`/edit/${id}`}>
                <Button text="수정하기"/>
            </Link>

        </div>
        <div className="border-2 border-gray-300 p-4 my-4 w-2xl">
            <p>게시글 번호: {id}</p>
            <p>제목: {board.title}</p>
            <p>내용 : {board.content}</p>
        </div>

        <Comment boardId={id}/>

    </div>
}