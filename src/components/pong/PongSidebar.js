import React, { useEffect } from 'react';
import '../../stylesheets/pong.css';
import { connect } from 'react-redux';
import { getAllMembers } from '../../store/actions/profileActions';
import { BiHeartCircle } from 'react-icons/bi';

const PongSidebar = ({ getAllMembers, allMembers }) => {
  useEffect(() => {
    getAllMembers();
  }, []);

  return (
    <aside className='pong-sidebar'>
      <section>
        <h2>Online Users:</h2>
        {allMembers &&
          allMembers
            .filter(member => {
              return member.isOnline;
            })
            .map(member => {
              return (
                <ul>
                  <li>
                    <span className='sidebar-left'>
                      <BiHeartCircle className='online-heart' />
                      &nbsp;
                      {member.firstName}
                    </span>
                    <span className='sidebar-right'>
                      <button className='pong-invite-button'>Invite</button>
                    </span>
                  </li>
                </ul>
              );
            })}
      </section>
      <section>
        <h2>Scoreboard:</h2>
        <ul>
          <li>
            <span className='sidebar-left'>1. Jesper</span>
            <span className='sidebar-right'>1693</span>
          </li>
          <li>
            <span className='sidebar-left'>2. Jesper</span>
            <span className='sidebar-right'>976</span>
          </li>
          <li>
            <span className='sidebar-left'>3. Jesper</span>
            <span className='sidebar-right'>763</span>
          </li>
          <li>
            <span className='sidebar-left'>4. Jesper</span>
            <span className='sidebar-right'>533</span>
          </li>
          <li>
            <span className='sidebar-left'>5. Jesper</span>
            <span className='sidebar-right'>500</span>
          </li>
          <li>
            <span className='sidebar-left'>6. Jesper</span>
            <span className='sidebar-right'>387</span>
          </li>
          <li>
            <span className='sidebar-left'>7. Jesper</span>
            <span className='sidebar-right'>344</span>
          </li>
          <li>
            <span className='sidebar-left'>8. Jesper</span>
            <span className='sidebar-right'>342</span>
          </li>
          <li>
            <span className='sidebar-left'>9. Alex</span>
            <span className='sidebar-right'>261</span>
          </li>
          <li>
            <span className='sidebar-left'>10. Jesper</span>
            <span className='sidebar-right'>124</span>
          </li>
        </ul>
      </section>
      <section>
        <div className='pong-sidebar-buttons'>
          <button>Restart</button>
          <button>Pause</button>
        </div>
      </section>
    </aside>
  );
};

const mapStateToProps = state => {
  return {
    allMembers: state.profileData.allMembers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllMembers: () => dispatch(getAllMembers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PongSidebar);
