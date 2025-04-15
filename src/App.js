
import './App.css';
import Navbar from './components/Navbar';  
import CycleTracker from './components/CycleTracker'; 
import WorkoutPlan from './components/WorkoutPlan';  
import HeroOfTheDay from './components/HeroOfTheDay';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import CalendarPage from './components/CalendarPage';
import { useState } from 'react'; 
import ProtectedRoute from "./components/ProtectedRoute"; 



function App() {
  const [predictedDates, setPredictedDates] = useState([]); 
  const [periodDates, setPeriodDates] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true' // Proper boolean check
  );  

  return (
    <Router>
      <div className="App">
        {!isLoggedIn ? (
          <Routes>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/" element={<ProtectedRoute><Navbar/></ProtectedRoute>} />
            <Route path="*" element={<navigate to="/login" />} />
          </Routes>
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={
                <>
                  <CycleTracker 
                    onNewPeriod={(date) => setPeriodDates([...periodDates, date])}
                    onPredictedDates={(dates) => setPredictedDates(dates)}
                  />
                  <div className="container">
                    <WorkoutPlan />
                    <HeroOfTheDay />
                  </div>
                </>
              } />
              <Route path="/calendar" element={
                <CalendarPage periodDates={periodDates}
                predictedDates={predictedDates} />
              } />
              <Route path="*" element={<navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App; 
