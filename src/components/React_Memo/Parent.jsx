import React, {
  useState,
  useRef,
  lazy,
  Suspense,
  memo,
  useCallback,
} from "react";
import SyncLoader from "react-spinners/SyncLoader";
import styles from "./Parent.module.css";

//Lazy Loading Child Component
const Child = lazy(() => import("./Child"));

const Parent = () => {
  const [count, setCount] = useState(0);
  const [childName, setChildName] = useState("Default");
  const inputRef = useRef("");
  const ctRef = useRef(0)

  const handleCallback = useCallback(() => {
    setChildName(inputRef.current.value);
  }, [inputRef]);

  const handleClick = () => {
    ctRef.current += 1;
  }

  console.log("Parent component rendered");
  console.log(ctRef.current)
  return (
    <div className={styles.parent}>
      <div>Parent</div>
      <h3>Count : {count}</h3>
      <button onClick={() => setCount((c) => c + 1)}>Counter</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <br />
      <input type="text" placeholder="Enter Name" ref={inputRef} />
      <button onClick={handleCallback}>Apply Name</button>
      <Suspense fallback={<SyncLoader color={"green"} />}>
        <Child name={childName} className={styles.child} />
      </Suspense>
      <h4>{ctRef.current}</h4>
      <button onClick={handleClick}>Counter 2</button>
    </div>
  );
};

export default memo(Parent);
