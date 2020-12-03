import React, { useState } from 'react';
import Notification from '../utils/Notification';

//allow react dev tools work
window.React = React;

const NotificationTest = () => {
  const [ignore, setIgnore] = useState(true);
  const [title, setTitle] = useState('true');
  const [options, setOptions] = useState({});

  const handlePermissionGranted = () => {
    console.log('Permission Granted');
    setIgnore(false);
  };
  const handlePermissionDenied = () => {
    console.log('Permission Denied');
    setIgnore(true);
  };
  const handleNotSupported = () => {
    console.log('Web Notification not Supported');
    setIgnore(true);
  };

  const handleNotificationOnClick = (e, tag) => {
    console.log(e, 'Notification clicked tag:' + tag);
  };

  const handleNotificationOnError = (e, tag) => {
    console.log(e, 'Notification error tag:' + tag);
  };

  const handleNotificationOnClose = (e, tag) => {
    console.log(e, 'Notification closed tag:' + tag);
  };

  const handleNotificationOnShow = (e, tag) => {
    console.log(e, 'Notification shown tag:' + tag);
  };

  const handleButtonClick = () => {
    if (ignore) {
      return;
    }

    const now = Date.now();

    const title = 'React-Web-Notification' + now;
    const body = 'Hello' + new Date();
    const tag = now;
    const icon =
      'http://mobilusoss.github.io/react-web-notification/example/Notifications_button_24.png';
    // const icon = 'http://localhost:3000/Notifications_button_24.png';

    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      lang: 'en',
      dir: 'ltr',
      sound: './sound.mp3', // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    };
    setTitle(title);
    setOptions(options);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Notify!</button>

      <Notification
        ignore={ignore && title !== ''}
        notSupported={handleNotSupported}
        onPermissionGranted={handlePermissionGranted}
        onPermissionDenied={handlePermissionDenied}
        onShow={handleNotificationOnShow}
        onClick={handleNotificationOnClick}
        onClose={handleNotificationOnClose}
        onError={handleNotificationOnError}
        timeout={5000}
        title={title}
        options={options}
        swRegistration={null}
      />
    </div>
  );
};

export default NotificationTest;
