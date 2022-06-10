import { useState } from 'react';
import './App.css';

export function replaceCamelWithSpaces(colorName) {
  //Replace every capital letter in the middle of the text with a space plus the letter
  return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
  const [buttonColor, setButtonColor ] = useState('MediumVioletRed');
  const [disabled, setDisabled] = useState(false)
  let newButtonColor = buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  const handleButtonClick = () => {
    setButtonColor(newButtonColor)
    newButtonColor = buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

  }

  const handleCheckboxClick = (event) => {
    setDisabled(event.target.checked)
  }

  return (
    <div className="App">
      <button 
      disabled={disabled}
      style={{backgroundColor: disabled ? 'gray' : buttonColor}}
      onClick={handleButtonClick}
      >
        Change to { replaceCamelWithSpaces(newButtonColor) }
      </button>
      <input 
      type="checkbox" 
      id="disable-button-checkbox"
      onChange={handleCheckboxClick}
      defaultChecked={disabled}
      />
      <label htmlFor='disable-button-checkbox'>Disable button</label>
    </div>
  );
}

export default App;
