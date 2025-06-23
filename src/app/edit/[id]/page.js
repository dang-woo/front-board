"use client"; //use 머시기 를 쓸려면 무조건 클라이언트 컴포넌트 를 사용해야함

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";



export default function EditBoardPage() {
    const params = useParams(); //클라이언트 캄퍼넌트는 params를 useParams 를 사용해야 한다고함
    const { id } = params;

    const [title, setTitle] = useState(""); //제목 상태관리
    const [content, setContent] = useState(""); //내용 상태관리
    const router = useRouter(); //라우터가 있어야 수정 후 페이지 이동 가능
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    //컴포넌트 마운트 나 아이디가 변경될때 실행
    //컴포넌트 마운트란? 화면에 처음 나오는 시점 이라고함.
    useEffect(() => {

        if (id) { //아이디가 존재할때만 가져옴

            //서버에서 데이터 가져오는 함수
            const fetchBoardData = async () => {
                try {

                    const res = await fetch(`${apiUrl}board/${id}`);
                    if (!res.ok) {
                        throw new Error("게시글 을 불러오는 데 실패했습니다.");
                    }
                    const data = await res.json();

                    // 가져온 데이터를 title과 content 에 넣어줌.
                    setTitle(data.title); //제목
                    setContent(data.content); //내용
                } catch (e) {
                    alert("게시글 을 불러오는데 실패했습니다");
                }
            };
            //데이터 가져오는 함수 실행 - 여기서 실행해야 수정 첫화면 들어왔을때 서버한테 받아와짐
            fetchBoardData();
        }
    }, [id]); // 아이디가 변경되면 유즈이펙트 실행

    //수정하고 서버로 보내는 함수
    const handleUpdate = async (e) => {
        e.preventDefault(); //새로고침 방지

        try {
            const res = await fetch(`${apiUrl}board/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }), // 수정된 title과 content를 전송
            });

            if (res.ok) {
                router.push(`/${id}`);
            } else {
                alert('게시글 수정에 실패했습니다.');
            }
        } catch (e) {
            alert('게시글 수정에 실패했습니다.');
        }
    };

    return (
        <div>
            <h1>게시글 수정</h1>
            {/* 수정완료 버튼 누르면 handleUpdate 함수 호출. */}
            <form onSubmit={handleUpdate}>
                <div>
                    <label htmlFor="title">제목: </label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} //e 의 타겟 즉 여기서는 제목 벨류는 값 즉 유저가 입력한 값
                        required  //제목 필수
                    />
                </div>
                <div>
                    <label htmlFor="content">내용: </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required //내용 필수
                        className="px-2 py-1  border rounded text-slate-950 w-80 h-40 resize-none"
                    />
                </div>
                <Button text="수정 완료" type="submit" />
            </form>
        </div>
    );
}