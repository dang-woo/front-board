import BoardList from "@/app/components/BoardList";
import PaginationTest from "@/app/components/PaginationTest";
import Comment from "@/app/components/Comment";

export default async function Home({ searchParams }) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 0; //삼항연산자    parseInt(params.page) 가 있으면 반환 없으면 0

  return (
    <>
      <PaginationTest page={page}/>
      {/*<BoardList/>*/}
    </>
  );
}