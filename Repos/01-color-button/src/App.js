import { useState } from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor ] = useState('red');
  const [disabled, setDisabled] = useState(false)
  let newButtonColor = buttonColor === 'red' ? 'blue' : 'red';

  const handleButtonClick = () => {
    setButtonColor(newButtonColor)
    newButtonColor = buttonColor === 'red' ? 'blue' : 'red';
  }

  const handleCheckboxClick = (event) => {
    setDisabled(event.target.checked)
  }

  return (
    <div className="App">
      <button 
      disabled={disabled}
      style={{backgroundColor: buttonColor}}
      onClick={handleButtonClick}
      >
        Change to { newButtonColor }
      </button>
      <input type="checkbox" 
      onChange={handleCheckboxClick}
      defaultChecked={disabled}
      />
    </div>
  );
}

export default App;
