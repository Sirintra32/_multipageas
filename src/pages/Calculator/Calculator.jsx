import './Calculator.css'
import React, { useState } from 'react'

function Calculator  () {

    const [display, setDisplay] = useState('');

    const clearDisplay = () => {
        setDisplay('');
    };

    const appendToDisplay = (value) => {
        setDisplay(display + value);
    };

    const calculate = () => {
        try {
            setDisplay(eval(display).toString());
        } catch (e) {
            setDisplay('Error');
        }
    }



    const checkkeyboard = (event) => {
        console.log(event.key) 
        
    if(event.key === 'Enter'){
        calculate('=')
        } else if (event.key === 'Escape') {
            appendToDisplay('C')
        } else if (event.key === '+'){
            appendToDisplay('+')
        } else if (event.key === '-'){
            appendToDisplay('-')
        } else if (event.key >= '0' && event.key <= '9'){
            appendToDisplay(event.key)
        }
    }
    document.addEventListener('keydown',checkkeyboard)   
    return ( 
        <div id="calculator">
        <input type="text" id="display" value={display} readOnly />
        <div id="number">
            <button className="calculator-button" onClick={clearDisplay}>C</button>
            <button className="calculator-button" onClick={() => appendToDisplay('1')}>1</button>
            <button className="calculator-button" onClick={() => appendToDisplay('2')}>2</button>
            <button className="calculator-button" onClick={() => appendToDisplay('3')}>3</button>
            <button className="calculator-button" onClick={() => appendToDisplay('/')}>/</button>
            <button className="calculator-button" onClick={() => appendToDisplay('4')}>4</button>
            <button className="calculator-button" onClick={() => appendToDisplay('5')}>5</button>
            <button className="calculator-button" onClick={() => appendToDisplay('6')}>6</button>
            <button className="calculator-button" onClick={() => appendToDisplay('*')}>*</button>
            <button className="calculator-button" onClick={() => appendToDisplay('7')}>7</button>
            <button className="calculator-button" onClick={() => appendToDisplay('8')}>8</button>
            <button className="calculator-button" onClick={() => appendToDisplay('9')}>9</button>
            <button className="calculator-button" onClick={() => appendToDisplay('-')}>-</button>
            <button className="calculator-button" onClick={() => appendToDisplay('0')}>0</button>
            <button className="calculator-button" onClick={() => appendToDisplay('+')}>+</button>
            <button className="calculator-button" onClick={() => appendToDisplay('.')}>.</button>
            <button className="calculator-button" onClick={calculate}>=</button>
        </div>
    </div>
    )
}

export default Calculator