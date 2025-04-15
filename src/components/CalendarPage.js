// src/components/CalendarPage.js
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addMonths from 'date-fns/addMonths'
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = { 'en-US': require('date-fns/locale/en-US') };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarPage({ periodDates, predictedDates }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = [
    // Actual period dates
    ...periodDates.map(date => ({
      title: 'Period Day 🔴',
      start: new Date(date),
      end: new Date(date),
      allDay: true,
      className: 'actual-period', // Add class for styling
    })),
    // Predicted period dates
    ...predictedDates.map(date => ({
      title: 'Predicted Period 🔴',
      start: new Date(date),
      end: new Date(date),
      allDay: true,
      className: 'predicted-period', // Add class for styling
    })),
  ];

  return (
    <div className="calendar-page">
      <h2>🗓️ My Cycle Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate} // Control the displayed date
        onNavigate={(newDate) => setCurrentDate(newDate)}
        style={{ height: 500 }}
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.className === 'actual-period' ? '#ff69b4' : 'rgba(255, 105, 180, 0.5)', // Transparent red for predicted
          },
        })}
      />
    </div>
  );
}

export default CalendarPage;