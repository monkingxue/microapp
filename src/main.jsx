import {
  Component,
  useReducer,
  useState,
  useEffect,
  useLayoutEffect,
} from "../js/minireact/react";
import ReactDOM from "../js/minireact/react-dom";
import "./index.css";
let myWorker = new Worker('../js/worker.js');
function FunctionComponent(props) {
  // const [count, setCount] = useReducer((x) => x+1, 0);
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  
  myWorker.onmessage = function (event) { // 接收
    let revdata = JSON.parse(event.data);
    console.log('Received message:',revdata);
    switch (revdata.type){
      case 'add1':
        setCount(revdata.num);
        break;
      case 'add2':
        setCount2(revdata.num);
        break;
      default:  
        break;
    }
  };
  useEffect(() => {
    console.log("omg useEffect", count2); //sy-log
  }, [count2]);

  useLayoutEffect(() => {
    console.log("omg useLayoutEffect", count2); //sy-log
  }, [count2]);
  return (
    <div className="border">
      <p>{props.name}</p>
      <button onClick={() => {
        myWorker.postMessage(JSON.stringify({
          type: 'add1',
          num: count
        }));
      }}>
          {count}
      </button>
      <button
        onClick={() => {
          myWorker.postMessage(JSON.stringify({
            type: 'add2',
            num: count2
          }));
        }}
      >
        {count2}
      </button>

      {count % 2 ? <div>omg</div> : <span>123</span>}

      <ul>
        {count2 === 2
          ? [2, 1, 3, 4].map((item) => {
              return <li key={item}>{item}</li>;
            })
          : [0, 1, 2, 3, 4].map((item) => {
              return <li key={item}>{item}</li>;
            })}
      </ul>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <h3>{this.props.name}</h3>
        我是文本
      </div>
    );
  }
}

function FragmentComponent() {
  return (
    <ul>
      <>
        <li>part1</li>
        <li>part2</li>
      </>
    </ul>
  );
}
const jsx = (
  <div className="border">
  <h1>demo</h1>
  <FunctionComponent name="函数组件" />
  <ClassComponent name="类组件" />
  <FragmentComponent />
  </div>
  );

ReactDOM.createRoot(document.getElementById("root")).render(jsx);

// 实现了常见组件初次渲染

// 原生标签
// 函数组件
// 类组件
// 文本
// Fragment
