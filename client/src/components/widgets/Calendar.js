import React from 'react';
import Card from '../layout/Card';
import '../../stylesheets/card.css';

const Calendar = () => {
  return (
    <Card
      heading="My department calendar"
      subHeading="What's going on?"
      className="calendar-component"
    >
      <div className="responsiveCal">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FStockholm&amp;src=ZDUzNDlvMzFwZG1xOGFzNHBianA4anZwdGdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;color=%233F51B5&amp;showNav=0&amp;showDate=1&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&mode=AGENDA"
          width="800px"
          height="600px"
          border="none"
          border-radius="15px"
        ></iframe>
      </div>
    </Card>
  );
};

export default Calendar;
