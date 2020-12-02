import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { BsHouseDoor } from 'react-icons/bs';
import '../../stylesheets/workFromToggle.css';
import { toggleWorkPlace } from '../../store/actions/profileActions';

const WorkingFromToggle = ({ toggleWorkPlace, auth, profile }) => {
  const [isToggled, setIsToggled] = useState(profile.workFromHome);

  useEffect(() => {
    toggleWorkPlace(auth, isToggled);
  }, [isToggled]);

  const onToggle = () => {
    setIsToggled(!isToggled);
  };
  return (
    <div className='work-from-toggle'>
      <HiOutlineOfficeBuilding />
      <label className='toggle-switch'>
        <input type='checkbox' checked={isToggled} onChange={onToggle} />
        <span className='switch' />
      </label>
      <BsHouseDoor />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    toggleWorkPlace: (auth, isToggled) =>
      dispatch(toggleWorkPlace(auth, isToggled)),
  };
};

export default connect(null, mapDispatchToProps)(WorkingFromToggle);
