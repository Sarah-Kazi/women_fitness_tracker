// src/components/WorkoutPlan.js  
import React, { useState } from 'react';  
import { askAI } from '../services/gemini';  

function WorkoutPlan({ currentPhase }) {  
  const [workoutPlan, setWorkoutPlan] = useState('');  

  const getWorkout = async () => {
    const plan = await askAI(
      `Create a ${currentPhase} phase workout for women. 4 exercises with sets/reps. Use emojis!`
    );
    setWorkoutPlan(plan);
  };

  return (  
    <div className="workout-box">  
      <h2>💪 Your Personalized Workout</h2>  
      <button onClick={getWorkout}>Generate Workout</button>  
      <p>{workoutPlan}</p>  
    </div>  
  );  
}  

export default WorkoutPlan;  