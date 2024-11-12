interface Rule {
    symptoms: string[];
    diagnosis: string;
}

const rules: Rule[] = [
    { symptoms: ["febre", "tosse"], diagnosis: "Gripe" },
    { symptoms: ["tosse", "dor de garganta"], diagnosis: "Resfriado" },
    { symptoms: ["fadiga", "tontura"], diagnosis: "Anemia" },
    { symptoms: ["dor de cabeça", "náusea"], diagnosis: "Enxaqueca" },
    { symptoms: ["dor abdominal", "diarreia"], diagnosis: "Gastroenterite" },
    { symptoms: ["febre", "calafrios"], diagnosis: "Infecção" },
    { symptoms: ["fadiga", "perda de apetite"], diagnosis: "Mononucleose" },
    { symptoms: ["dores musculares", "febre"], diagnosis: "Dengue" },
    { symptoms: ["tosse", "dificuldade para respirar"], diagnosis: "Bronquite" },
    { symptoms: ["erupção cutânea", "coceira"], diagnosis: "Alergia" },
    { symptoms: ["febre", "manchas vermelhas"], diagnosis: "Sarampo" },
    { symptoms: ["fadiga", "inchaço nas pernas"], diagnosis: "Insuficiência cardíaca" },
    { symptoms: ["visão embaçada", "sede excessiva"], diagnosis: "Diabetes" },
    { symptoms: ["dor de garganta", "febre"], diagnosis: "Amigdalite" },
    { symptoms: ["perda de cabelo", "fadiga"], diagnosis: "Deficiência de ferro" },
    { symptoms: ["zumbido nos ouvidos", "tontura"], diagnosis: "Vertigem" },
    { symptoms: ["tosse seca", "dor no peito"], diagnosis: "Pneumonia" },
    { symptoms: ["febre alta", "confusão mental"], diagnosis: "Meningite" },
    { symptoms: ["tontura", "desmaio"], diagnosis: "Pressão baixa" },
    { symptoms: ["dor nas articulações", "rigidez"], diagnosis: "Artrite" }
  ];
  

export const diagnose = (inputSymptoms: string[]): string[] => {
    const normalizedInput = inputSymptoms.map(symptom => symptom.toLowerCase());
  
    const possibleDiagnoses = rules
      .filter(rule => 
        rule.symptoms.some(symptom => normalizedInput.includes(symptom.toLowerCase()))
      )
      .map(rule => rule.diagnosis);
  
    return possibleDiagnoses.length > 0 ? possibleDiagnoses : ["Diagnóstico desconhecido"];
  };