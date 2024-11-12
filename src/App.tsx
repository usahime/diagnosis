import React, { useState } from 'react';
import { diagnose } from './rules';

const App: React.FC = () => {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const handleSubmit = () => {
    const diagnoses = diagnose(symptoms);
    setResults(diagnoses);
  };

  return (
    <div>
      <h1>Diagnóstico Baseado em Regras</h1>
      <input
        type="text"
        placeholder="Insira sintomas separados por vírgula"
        onChange={(e) => setSymptoms(e.target.value.split(',').map(s => s.trim()))}
      />
      <button onClick={handleSubmit}>Diagnosticar</button>
      <div>
        <h2>Sintomas encontrados nos seguintes diagnósticos:</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
