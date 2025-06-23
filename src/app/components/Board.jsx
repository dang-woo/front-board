import Link from "next/link";
import Button from "@/app/components/ui/Button";

//안쓰는 코드
async function getBoardById(id) {
    try {

        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${apiUrl}board/${parseInt(id)}`, {cache: "no-store"});
        // const res = await fetch(`http://localhost:8080/api/board/${id}`, {cache: "no-store"}); //"undefined"

        //하드코딩으로 하면 정상동작
        // const res = await fetch(`http://localhost:8080/api/board/4`, {cache: "no-store"});
        //게시글 수정 가능성이 있으므로 역시 캐시를 저장하지않는다
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data || "게시글을 불러올 수 없습니다");
        }
        return data;

    }catch (e) {
        let errorMessage = "서버와 연결되지 않았습니다"
        return errorMessage;
    }
}


export default async function Board({ params }) {
    const {id} = await params
    console.log(id);
    const board = await getBoardById(id); //id 값을 getBoardById 로 보내준다 그리고 board 값을 받아온다

    return <div>
        <p>동적 url 번호: {id}</p>
        <p>제목: {board.title}</p>
        <p>내용 : {board.content}</p>
        <p>생성시간 : {board.createdAt}</p>
        <p>업데이트 시간 : {board.updatedAt}</p>
        <br/>
        <Link href="/">
            <Button text="뒤로가기"/>
        </Link>
        <br/><br/>
        <Button text="삭제하기 - 미구현"/>
        <br/>
        <Button text="수정하기 - 미구현"/>
    </div>
}
