import React, { useState, useEffect } from 'react';
import { askAI } from '../services/gemini'; 



function CycleTracker({ onNewPeriod, onPredictedDates }) {  
  const [date, setDate] = useState('');  
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28); // Default 28 days
  const [currentPhase, setCurrentPhase] = useState(''); 
  const [advice, setAdvice] = useState('');
  const calculatePhase = () => {
    const today = new Date();
    const lastDate = new Date(lastPeriod);
    const diffTime = today - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays % cycleLength;
  };
  const getPhaseInfo = async () => {
    const dayInCycle = calculatePhase();
    let phase = '';

    if (dayInCycle <= 5) phase = "Menstruation 🌸";
    else if (dayInCycle <= 13) phase = "Follicular 🌱";
    else if (dayInCycle <= 15) phase = "Ovulation 🥚";
    else phase = "Luteal 🌕";

    const tips = await askAI(
      `Give 2 bullet points of health tips for ${phase} phase. Use emojis!`
    );

    setCurrentPhase(phase);
    setAdvice(tips);
  };
  
  
  const [predictedDates, setPredictedDates] = useState([]);
  const predictCycle = async () => {  
    const prediction = await askAI(  
        `Predict menstrual cycle starting from ${date}. Respond in 1 sentence.`  
      );  
      alert(prediction);  
  };  
  const predictPeriods = () => {
    if (!lastPeriod || !cycleLength) return [];
    const predictions = [];
    const lastDate = new Date(lastPeriod);
    for (let i = 1; i <= 3; i++) { // Predict next 3 periods
      const nextDate = new Date(lastDate);
      nextDate.setDate(lastDate.getDate() + cycleLength * i);
      predictions.push(nextDate.toISOString().split('T')[0]); // Format as YYYY-MM-DD
    }
    setPredictedDates(predictions);
    return predictions;
  };
  
  // Call predictPeriods when lastPeriod or cycleLength changes
  useEffect(() => {
    if (lastPeriod && cycleLength) {
      const dates = predictPeriods();
      setPredictedDates(dates);
      onPredictedDates(dates); // Send to parent
    }
  }, [lastPeriod, cycleLength]);

  return (  
    <div className="cycle-box">  
      <h2>🌙 Period Tracker</h2>  
      <input  
        type="date"  
        value={date}  
        onChange={(e) => setDate(e.target.value)}  
      />  
      <button onClick={predictCycle}>Predict</button> 
      
      <h2>🌙 Cycle Tracker</h2>
      <div className="input-group">
        <label>Last Period Start:</label>
        <input 
          type="date" 
          value={lastPeriod}
          onChange={(e) => setLastPeriod(e.target.value)}
        />
      </div> 
      <div className="input-group">
        <label>Cycle Length (days):</label>
        <input
          type="number"
          value={cycleLength}
          onChange={(e) => setCycleLength(e.target.value)}
        />
      </div>

      <button onClick={getPhaseInfo}>Show My Phase</button>
      {currentPhase && (
        <div className="phase-result">
          <h3>Current Phase: {currentPhase}</h3>
          <p>{advice}</p>
        </div>
      )}
    </div>
  );
}

export default CycleTracker; 