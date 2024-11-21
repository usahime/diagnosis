import React, { useState } from 'react';
import { check_rule, medical_rule } from './rules';
import './App.css'

const App: React.FC = () => {
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [headache, setHeadache] = useState<boolean | undefined>(undefined);
  const [result, setResult] = useState<string | boolean | null>(null);
  const [temperatureError, setTemperatureError] = useState<string | null>(null);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setTemperature(undefined);
      setTemperatureError(null);
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setTemperature(parsedValue);
      }
    }
  };

  const handleSubmit = () => {
    if (temperature !== undefined && headache !== undefined) {
      if (temperature > 100) {
        setTemperatureError("Temperature cannot be above 100.");
      } else {
        const symptoms = [
          { temperature: temperature },
          { headache: headache }
        ];
        const diagnosis = check_rule(medical_rule, symptoms);
        setResult(diagnosis);
        setTemperatureError(null);
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (

    <div className='container'>

      <div className='pages pages1 css-selector'>

        <div className='alinhar'>
          <span>R</span><h1>ule-Based Diagnostic System</h1>
        </div>

        <div className='temperature'>
          <h2>Temperature:</h2>
          <input
            type="number"
            value={temperature ?? ''}
            onChange={handleTemperatureChange}
          />
          {temperatureError && <p style={{ color: 'red', padding: '0px 15px' }}>{temperatureError}</p>}
        </div>


        <div className='headache'>
          <h2>Headache:</h2>
          <select
            value={headache !== undefined ? String(headache) : ''}
            onChange={(e) => setHeadache(e.target.value === 'true')}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

        </div>
        <button onClick={handleSubmit}>Check Diagnosis</button>

      </div>

      <div className='pages pages2 css-selector'>

        <div className='alinhar'>
          <span>R</span><h1>esult:</h1>
          <p className={`result-text ${result === "You are sick!" ? "sick" : "healthy"}`}>
            {result}
          </p>
        </div>

      </div>


    </div>
  );
};

export default App;
