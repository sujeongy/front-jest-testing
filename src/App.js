import './App.css';
import { useState } from "react";

function App() {
  const [ counter, setCounter] = useState(0);
  const [ isDisabled, setIsDisabled ] = useState(false); // on: true / off: false

  return (
    <div className="App">
      <div className="section">
        <h2>Simple Counter</h2>
        <h3 data-testid="counter">{counter}</h3>
        <div className="button-wrap">
          <button
            type="button"
            data-testid="button-minus"
            onClick={()=>{setCounter(counter - 1)}}
            disabled={!counter || !isDisabled}>
            빼기
          </button>
          <button
            type="button"
            data-testid="button-plus"
            onClick={()=>{setCounter(counter + 1)}}
            disabled={!isDisabled}>
            더하기
          </button>
        </div>

        <button
          type='button'
          data-testid="button-onoff"
          style={{backgroundColor: isDisabled? 'greenyellow':'grey'}}
          onClick={()=>{setIsDisabled(!isDisabled);setCounter(0)}}>
          ON/OFF
        </button>
      </div>
    </div>
  );
}

export default App;
