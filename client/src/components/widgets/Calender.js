import React, { useState } from 'react';
import Card from '../layout/Card';
import '../../stylesheets/widget-calender.css';
import Calendar from 'react_google_calendar';

const Calender = () => {
  // const calendar_configuration = {
  //   api_key: 'AIzaSyAReahf8a0aLj-CqFFAWrgDhNKljmk7vF0',
  //   calendars: [
  //     {
  //       name: 'demo',
  //       url: 'exampleURL@group.calendar.google.com',
  //     },
  //   ],
  //   dailyRecurrence: 700,
  //   weeklyRecurrence: 500,
  //   monthlyRecurrence: 20,
  // };
  // const [events, setEvents] = useState([]);
  return (
    <Card heading='Calender' className='calender-component'>
      {/* <Calendar events={events} config={calendar_configuration} /> */}
    </Card>
  );
};

export default Calender;
