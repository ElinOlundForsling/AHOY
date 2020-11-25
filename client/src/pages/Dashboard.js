import React from 'react';
import Sidebar from '../components/layout/Sidebar';

export const Dashboard = () => {
  // if (!auth.uid) {
  //   return <Redirect to='/signin' />;
  // }
  return (
    <div>
      <h4>Hello World!</h4>
      <Sidebar width={200} height={'100vh'}></Sidebar>
    </div>
  );
};
