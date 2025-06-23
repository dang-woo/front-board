import Link from "next/link";
import Button from "@/app/components/ui/Button";
import BoardTitle from "@/app/components/ui/BoardTitle";

// then은  콜백함수를 실행한다 그래서 콜백지옥이 생길 수 있으므로
// await 을 사용하도록하자 await가 가독성과 코드안정성이 더 좋다고한다

//프로미스란? 비동기 함수가 반환하는객체
//함수의 성공 실패 상태를 알려줌  대기 성공 실패 3가지 상태를 가질수 있다

async function getBoards() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${apiUrl}board/?page=1&size=10`, {cache: "no-store"});
        // const res = await fetch("http://localhost:8080/api/board/", {cache: "no-store"});
        // no-store 언제든 새로운게시물이 생길수 있으므로 캐시를 저장하지 않는다
        if (!res.ok) //200 코드가 아니면
        {
            const error = await res.json();
            throw new Error(error);

        }
        return res.json();//성공시 리스폰스로 받아온 제이슨 형태의 정보들을 받아옴


    } catch (e) {
        console.error("게시판 데이터를 불러올 수 없습니다");
        return []; // 실패시 빈 리스트를 주도록 하자.
    }


}

export default async function BoardList() {
    const boards = await getBoards();
    //https://tailwindcss.com/docs/width
    //https://tailwindcss.com/docs/font-size
    //px 수평패딩 py 수직패딩 text- n xl 텍스트 크기 종류

    return (
        <div className="w-full h-screen flex flex-col items-center">
            <div className="w-full max-w-4xl flex justify-between items-center px-4 py-3">
                <p className="text-2xl font-bold"> 동우의 게시판 </p>
                <Link href="/create">
                    <Button text="글쓰기"/>
                </Link>
            </div>

            <div>
                {boards.map((board) => (
                    <div key={board.boardId}>
                        <Link href={`/${board.boardId}`}>
                            <BoardTitle text={board.title}/>
                        </Link>

                    </div>
                ))}
            </div>

        </div>

    );
}