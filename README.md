This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


First, install dependency:

```bash
npm i
```

Second, build the code as production build:

```bash
npm run build
```

if some error occurs (such as M1) please run as

````bash
npm run dev
````

Third, Open [http://localhost:3000](http://localhost:3000)

### Recommend Chrome browser


Review
Drag구현과 React전반적인 사용방법을 묻는 문제였습니다. 
 구현은 부분적이지만 성공적으로 해주셨습니다. 특히나 mousemoveHandler를 통해 직접 구현하신 로직은 가산점으로 생각됩니다. 다만 react-draggable 라이브러리를 사용한 부분은 좀 아쉬웠습니다. react-draggable에서 사용되는 position 변경보다 더 좋은 퍼포먼스로 구현하는 방법도 존재함을 알려드립니다. 
 그리고 컴포넌트 구조에서 약간 의아하게도 index.tsx에 모든 컴포넌트와 로직이 함께 있는 부분도 의아했습니다. State의 사용 또한 약간 의아한 형태인 array in array방식으로 사용하셨습니다. state는 모든 변화가 리렌더링을 불러오는 만큼, 다른 방식의 구현도 생각해보셨으면 좋았을 것 같습니다.
Typescript를 사용함에도 private, public 선언 없이 사용하신 부분도 구조화되지 않아 아쉬운 부분이었습니다.
