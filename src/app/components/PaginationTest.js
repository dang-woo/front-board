import Link from "next/link";
import Button from "@/app/components/ui/Button";
import BoardTitle from "@/app/components/ui/BoardTitle";

async function getBoards(page) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`https://back.dangwoo.shop/api/board/?page=${page}`, {cache: "no-store"});

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || "200 코드가 아님, 데이터를 불러올 수 없습니다");
        }
        return res.json();
    } catch (e) {
        console.error("게시판 데이터를 불러올 수 없습니다:", e);
        return null;
    }
}

export default async function BoardList({page}) {
    const boardPage = await getBoards(page);

    const boards = boardPage.content;

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
                ))
                }
            </div>

            <div>
                <div>
                    { //화살표함수는 즉시 실행가능 - (() => {})

                        (() => {
                        const buttons = []; //담아줄 빈 배열을 만들어준다
                        for (let i = 0; i < boardPage.totalPages; i++) //페이지네이션의 수만큼 반복
                        {
                            buttons.push //.push 배열에 추가
                            (
                                <Link key={i} href={`/?page=${i}`}>
                                    <Button text={i} />
                                </Link>
                            );  //다 돌면 버튼이 페이지네이션의 수만큼 생김
                        }
                        return buttons;
                        // 반복문이 끝나면 반환
                    })()}
                </div>
                <div>
                    <p className="inline-block m-auto">현재 페이지: {boardPage.number + 1} (총 {boardPage.totalPages} 페이지)</p>
                </div>
            </div>
        </div>
    );
}
