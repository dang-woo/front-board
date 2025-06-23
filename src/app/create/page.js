"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";


export default function CreateBoardPage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const router = useRouter();

    const submit = async (e) => {
        e.preventDefault(); //새로고침방지
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const response = await fetch(`${apiUrl}board/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({title, content}),
            });

            if (response.status === 201) {
                const savedBoard = await response.json();
                router.push('/');
            } else {
                alert('게시글 추가에 실패했습니다.');
            }
        } catch (e) {
            alert('게시글 저장 중 오류가 발생했습니다.');
        }
    }

    return (
        <div>
            <h1>게시글 추가</h1>
            {/* 폼 제출 버튼을 누르며 submit 함수 호출됨 */}
            <form onSubmit={submit}>
                <div>
                    <label htmlFor="title">제목: </label>
                    <Input 
                        id="title"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">내용: </label>
                    <textarea
                        id="content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                        required
                        className="px-2 py-1  border rounded text-slate-950 w-80 h-40 resize-none"
                    />
                </div>
                <Button text="글쓰기" type="submit"/>
            </form>
        </div>
    );
}