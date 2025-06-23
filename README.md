Fetch api 란?

https://nextjs-ko.org/docs/app/building-your-application/data-fetching/fetching

```
export default async function Page() {
const data = await fetch('https://api.example.com/...').then((res) =>
res.json(),
)

return '...'
}
```
fetch란 
비동기 방식으로 서버에 request(req)를 보내고, 서버로부터 response(res)를 받는 함수


res 란? 
응답 객체 (response)객체
fetch 함수는 비동기적으로 http 요청을 보내고 서버로부터
응답을 받으면, 해당 응답에 대한 정보를 담은 리스폰스 객체를 반환핟다
이 객체는 응답의 상태 코드, 헤더, 본문 등 다양한 정보를 포함한다.

then ? 이란?
then 메소드는 response가 왔을 때 등록된 콜백 함수를 실행한다 라고하는데
콜백함수는 뭐지

매개변수로 함수 객체를 전달해서 호출함수 내에서 매개변수 함수를 실행하는 것
콜백 함수란 파라미터로 일반적인 변수나 값을 전달하는 것이 아닌 함수 자체를 전달하는 것
라고 하는데 내용이 방대해서 이정도만 알아보기로하자.


promise란?
fetch 함수와 then 메소드가 리턴하는 객체

프로미스란? 
https://docs.tosspayments.com/blog/using-promises
에이씽크 어웨잇 문법
https://docs.tosspayments.com/blog/async-await-example


```

function requestPayment(paymentData) {
	// ...
	return new Promise((resolve, reject) {    // Pending 상태
		if(isSuccess) {
			resolve(data)                     // 성공 상태
		}
		else {
			reject(error)                     // 실패 상태
		}
	})
}
```
프로미스는 3가지 상태를 가진다
대기 성공 실패
결제 전 대기
결제 성공하면 프로미스는 data 값을 가지게됨
실패하면 reject 를 호출하고 error 데이터를 가지게됨

```

paymentWidget.requestPayment({
  orderId: "t9JI0Bs1SVdJxRs8yjiQJ",
  orderName: "토스 티셔츠 외 2건",
})
.then(function (data) {
  console.log(data);
})
.catch(function (error) {
  if (error.code == "NEED_CARD_PAYMENT_DETAIL") {
    console.log(error.message);
  }
})
```

하지만 Promise에도 콜백과 비슷한 문제가 일어날 수 있어요. 
then() 체인을 길게 이어 나가면 콜백 체인과 마찬가지로 코드의 가독성이 떨어지고
에러가 어디서 일어났는지 보기 어렵다

그래서 async와 await 로 보완할수있는데 

await는 async 에서만 사용할수있는 함수이다
프로미스를 반환하는 함수 앞에 await 를 붙이면 
프로미스의 상태가 바뀔때 까지 코드를 기다린다.
성공 또는 실패 상태로 바뀌기 전까지 다음 연산을 하지않는다.

```
async function handleSubmit() {
    try {
        const paymentData = await paymentWidget.requestPayment({
        orderId: "KOISABLdLiIzeM-VGU_8Z", // 주문 ID(직접 만들어주세요)
        orderName: "토스 티셔츠 외 2건" // 주문명
        });
        console.log(paymentData);
        // 성공 처리
        return paymentData;
    } catch (error) {
        // 에러 처리
        console.log(error.message);
    }
}
```

