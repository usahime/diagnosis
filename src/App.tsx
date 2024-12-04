import React, { useState } from 'react';
import { Link, Element, animateScroll as scroll } from 'react-scroll';
import { check_rule, medical_rule, medical_rule2, medical_rule3 } from './rules';
import './App.css';

const App: React.FC = () => {
  const [temperature, setTemperature] = useState<number | undefined>(undefined);
  const [headache, setHeadache] = useState<boolean | undefined>(undefined);
  const [cough, setCough] = useState<boolean | undefined>(undefined);
  const [blood, setBlood] = useState<boolean | undefined>(undefined);
  const [nausea, setNausea] = useState<boolean | undefined>(undefined);
  const [vomit, setVomit] = useState<boolean | undefined>(undefined);
  
  const [result, setResult] = useState<string | null>(null);
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
        const symptoms1 = [
          { temperature: temperature },
          { headache: headache }
        ];
        const diagnosis1 = check_rule(medical_rule, symptoms1);
        
        const symptoms2 = [
          { cough: cough },
          { blood: blood }
        ];
        const diagnosis2 = check_rule(medical_rule2, symptoms2);
        
        const symptoms3 = [
          { nausea: nausea },
          { vomit: vomit }
        ];
        const diagnosis3 = check_rule(medical_rule3, symptoms3);

        if (diagnosis1 === "You are sick!" || diagnosis2 === "You are sick!" || diagnosis3 === "You are sick!") {
          setResult("You are sick!");
        } else {
          setResult("You are healthy");
        }

        setTemperatureError(null);
        // Navegar para a página de resultados
        scroll.scrollToBottom({ duration: 1500, smooth: true });
      }
    } else {
      alert("Please fill in all the fields.");
    }
  };

  return (
    <div className='container'>
      {/* Página 1 */}
      <Element name="page1">
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

          <div className='cough'>
            <h2>Cough:</h2>
            <select
              value={cough !== undefined ? String(cough) : ''}
              onChange={(e) => setCough(e.target.value === 'true')}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className='blood'>
            <h2>Blood:</h2>
            <select
              value={blood !== undefined ? String(blood) : ''}
              onChange={(e) => setBlood(e.target.value === 'true')}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className='nausea'>
            <h2>Nausea:</h2>
            <select
              value={nausea !== undefined ? String(nausea) : ''}
              onChange={(e) => setNausea(e.target.value === 'true')}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className='vomit'>
            <h2>Vomit:</h2>
            <select
              value={vomit !== undefined ? String(vomit) : ''}
              onChange={(e) => setVomit(e.target.value === 'true')}
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <button onClick={handleSubmit}>Check Diagnosis</button>
        </div>
      </Element>

      {/* Página 2 */}
      <Element name="page2">
        <div className='pages pages2 css-selector'>
          <div className='alinhar'>
            <span>R</span><h1>esults:</h1>
            <p className={`result-text ${result === "You are sick!" ? "sick" : "healthy"}`}>
              {result}
            </p>
          </div>
          <button onClick={() => scroll.scrollToTop( { duration: 1500, smooth: true  } )}>Back to Diagnosis</button>
        </div>
      </Element>
    </div>
  );
};

export default App;
