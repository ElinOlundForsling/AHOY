import React from 'react';
import Card from '../layout/Card';
import '../../stylesheets/card.css';

const Calendar = () => {
  return (
    <Card
      heading="Department calendar"
      subHeading="What's going on?"
      className="calendar-component"
    >
      <div className="responsiveCal">
        <div className="box-cal">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FStockholm&amp;src=Y184NHE3bWpkOXB1MjR1ZmFidmFnMHNhNnN1b0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4uc3dlZGlzaCNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23009688&amp;color=%230B8043&amp;showTz=0&amp;showCalendars=1&amp;showTabs=0&amp;showPrint=0&amp;showNav=0&amp;showTitle=0"
            width="800px"
            height="600px"
            border="none"
          ></iframe>
        </div>
        <div className="agenda-cal">
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FStockholm&amp;src=Y184NHE3bWpkOXB1MjR1ZmFidmFnMHNhNnN1b0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&amp;src=ZW4uc3dlZGlzaCNob2xpZGF5QGdyb3VwLnYuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%23009688&amp;color=%230B8043&amp;showTz=0&amp;showCalendars=1&amp;showTabs=0&amp;showPrint=0&amp;showNav=0&amp;showTitle=0&amp;mode=AGENDA"
            width="800px"
            height="600px"
            border="none"
          ></iframe>
        </div>
      </div>
    </Card>
  );
};

export default Calendar;
