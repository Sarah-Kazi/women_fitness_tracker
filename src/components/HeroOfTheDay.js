// src/components/HeroOfTheDay.js  
import React, { useState } from 'react';  
import { askAI } from '../services/gemini';  

function HeroOfTheDay() {  
  const [heroInfo, setHeroInfo] = useState('');  

  const getHero = async () => {  
    const info = await askAI(  
      "Tell me about an inspiring woman in sports or science in 3 sentences"  
    );  
    setHeroInfo(info);  
  };  

  return (  
    <div className="hero-box">  
      <h2>🌟 Today's Superwoman</h2>  
      <button onClick={getHero}>Meet Her!</button>  
      <p>{heroInfo}</p>  
    </div>  
  );  
}  

export default HeroOfTheDay;  