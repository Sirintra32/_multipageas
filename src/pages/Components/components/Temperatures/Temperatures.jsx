import { useState, useEffect } from 'react';
import Variable from '../Variable/Variable';
import './Temperatures.css';

function Temperatures() {
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(32); // Default for 0°C
    const [kelvin, setKelvin] = useState(273.15); // Default for 0°C

    useEffect(() => {
        // Update Fahrenheit and Kelvin when Celsius changes
        setFahrenheit((celsius * 9/5) + 32);
        setKelvin(celsius + 273.15);
    }, [celsius]);

    useEffect(() => {
        // Update Celsius and Kelvin when Fahrenheit changes
        setCelsius((fahrenheit - 32) * 5/9);
        setKelvin((fahrenheit - 32) * 5/9 + 273.15);
    }, [fahrenheit]);

    useEffect(() => {
        // Update Celsius and Fahrenheit when Kelvin changes
        setCelsius(kelvin - 273.15);
        setFahrenheit((kelvin - 273.15) * 9/5 + 32);
    }, [kelvin]);

    return (
        <div className='temperatures-container'>
            <h3 className='temperatures-title'>Temperatures</h3>
            <h3 className='temperatures-display'>
                <span className='badge bg-primary'>{celsius.toFixed(2)} °C</span>
                <span className='badge bg-primary'>{fahrenheit.toFixed(2)} °F</span>
                <span className='badge bg-primary'>{kelvin.toFixed(2)} K</span>
            </h3>
            <div className='temperatures-variables'>
                <Variable name='celsius' value={celsius} setValue={setCelsius} />
                <Variable name='fahrenheit' value={fahrenheit} setValue={setFahrenheit} />
                <Variable name='kelvin' value={kelvin} setValue={setKelvin} />
            </div>
        </div>
    );
}

export default Temperatures;
