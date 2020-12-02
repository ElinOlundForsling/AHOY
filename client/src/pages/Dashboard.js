import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import '../stylesheets/dashboard.css';
import '../stylesheets/index.css';
import Sidebar from '../components/layout/Sidebar';
import MyTeam from '../components/widgets/MyTeam';
import LatestHires from '../components/widgets/LatestHires';
import Fika from '../components/widgets/Fika';
import Documents from '../components/widgets/Documents';
import Pong from '../components/widgets/Pong';
import Faq from '../components/widgets/Faq/Faq';
import Calendar from '../components/widgets/Calendar';
import MyDepartment from '../components/widgets/MyDepartment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Dashboard = ({ auth, profile }) => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const [cards, setCards] = useState([
    <LatestHires profiles={profile} />,
    <MyTeam profile={profile} />,
    <MyDepartment profile={profile} />,
    <Fika />,
    <Pong />,
    <Faq />,
    <Calendar />,
    <Documents />,
  ]);

  if (!auth.uid) {
    return <Redirect to="/signin" />;
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const items = reorder(cards, source.index, destination.index);

    setCards(items);
  }

  const addCard = (card) => {
    setCards((cards) => [card, ...cards]);
  };

  const deleteCard = (e) => {
    setCards(cards.filter((card, i) => cards[i] !== cards[e]));
  };

  return (
    <main className="main">
      <section className="sidebar-layout">
        <Sidebar
          width={200}
          auth={auth}
          profile={profile}
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
          addCard={addCard}
          deleteCard={deleteCard}
        />
      </section>

      <DragDropContext onDragEnd={onDragEnd}>
        <section
          className={`dashboard-layout
            ${sidebarIsOpen ? 'dashboard-sidebar' : 'dashboard-fullscreen'}
          `}
        >
          {cards.map((content, index) => (
            <Droppable droppableId={`drop-zone-${index}`} key={index}>
              {(provided, snapshot) => (
                <div
                  style={{ position: 'relative' }}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Draggable draggableId={`${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                      >
                        {content}
                        <IoMdRemoveCircleOutline
                          style={{
                            color: 'white',
                            position: 'absolute',
                            fontSize: '25px',
                            top: '5px',
                            left: '4px',
                          }}
                          onClick={(e) => {
                            deleteCard(
                              e.target.parentElement.dataset.rbdDraggableId
                            );
                          }}
                        />
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </section>
      </DragDropContext>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Dashboard);
