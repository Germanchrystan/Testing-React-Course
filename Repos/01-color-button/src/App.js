import { useState } from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor ] = useState('red');
  let newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  const handleClick = () => {
    setButtonColor(newButtonColor)
    newButtonColor = buttonColor === 'red' ? 'blue' : 'red';
  }

  return (
    <div className="App">
      <button 
      style={{backgroundColor: buttonColor}}
      onClick={handleClick}
      >
        Change to { newButtonColor }
      </button>
      <input type="checkbox" />
    </div>
  );
}

export default App;
