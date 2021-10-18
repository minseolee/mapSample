import { useState, useRef, useEffect } from "react";

function Main() {
  const [testState, setTestState] = useState(0);
  const testRef = useRef(null);

  function clickHandler(event) {
    event.preventDefault();

    setTestState(() => 5);
  }

  useEffect(() => {
    if (!testRef) return;

    testRef.current.addEventListener('contextmenu', (event) => { clickHandler(event) });
    console.log('event added');

    return () => {
      window.removeEventListener('contextmenu', clickHandler)
    }
  }, [testRef]);

  useEffect(() => {
    console.log('testState: ', testState);
  }, [testState]);

  return (
    <div
      ref={testRef}
      style={{width: '100%', display: 'block', height: '32px', backgroundColor: 'red'}}
    />
  );
}

export default Main;
