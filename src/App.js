import './App.css';
import './reset.css';
import { useEffect, useState } from 'react';

function App() {
  // fetchしたデータを保持するために必要
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      // 基本は下のURL部分を変えるだけでおっけい
      const result = await fetch('https://jsonplaceholder.typicode.com/albums');
      setData(await result.json());
    })();
  }, []);

  // mapの説明用
  const colors = ['orange', 'green', 'blue'];
  return (
    <>
      {/* map無しバージョン */}
      <div>orange</div>
      <div>green</div>
      <div>blue</div>

      {/* map有りバージョン */}
      {colors.map((color) => (
        <div>{color}</div>
      ))}

      {/* fetchしたdataを表示 */}
      <div className='wrapper'>
        {data?.map((item) => (
          <div key={item.id} className='item'>
            <h2>title: {item.title}</h2>
            <p>id: {item.id}</p>
            <p>userId: {item.userId}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
