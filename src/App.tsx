import React, { useState } from 'react';
import { check_rule, medical_rule } from './rules';

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
    <div>
      <h1>Rule-Based Diagnostic System</h1>
      <div>
        <label>
          Temperature:
          <input
            type="number"
            value={temperature ?? ''}
            onChange={handleTemperatureChange}
          />
        </label>
        {temperatureError && <p style={{ color: 'red' }}>{temperatureError}</p>}
      </div>
      <div>
        <label>
          Headache:
          <select
            value={headache !== undefined ? String(headache) : ''}
            onChange={(e) => setHeadache(e.target.value === 'true')}
          >
            <option value="">Select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </label>
      </div>
      <button onClick={handleSubmit}>Check Diagnosis</button>
      <div>
        <h2>Result:</h2>
        <p>{result !== null ? result : "No diagnosis yet"}</p>
      </div>
    </div>
  );
};

export default App;
