"use client";

import { useRouter } from "next/navigation"; // useRouter 훅은 'next/navigation'에서 가져옵니다.
import Button from "@/app/components/ui/Button";
 // 기존 Button 컴포넌트

async function deleteBoardById(id) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${apiUrl}board/delete/${parseInt(id)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "게시글 삭제 실패");
        }

        return res.json();
    } catch (e) {

        throw new Error("게시글 삭제 중 오류가 발생했습니다.");
    }
}

export default function DeleteButton({ boardId }) {
    const router = useRouter();

    const handleDelete = async () => {

        await deleteBoardById(boardId);
        alert("게시글이 성공적으로 삭제되었습니다.");
        router.push("/"); // 삭제 후 홈 페이지로 이동
        router.refresh(); // 데이터 재검증을 통해 최신 상태 반영


    };

    return (
        <Button text="삭제하기" onClick={handleDelete} />
    );
}