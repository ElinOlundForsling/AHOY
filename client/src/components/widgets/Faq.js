import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../layout/Card';

import '../../stylesheets/faq.css';
import '../../stylesheets/index.css';

const Faq = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
  React.useEffect(() => {
    const results = information.filter(person =>
      person.toLowerCase().includes(searchTerm),
    );
    setSearchResults(results);
  }, [searchTerm]);

  const information = ['Office', 'Paperwork', 'IT'];

  return (
    <Card heading='FAQ' subHeading='Got questions?' className='faq-component'>
      <input
        type='text'
        placeholder='Search'
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <div className='faq-card'>
        <h6>What will my first day look like?</h6>
        <p>
          Even experienced new hires have first-day nerves. Your employee
          onboarding programme should address the practicalities of their first
          day, so new hires can stop worrying and focus on bringing their
          A-game.
        </p>
        <h6>How does everything work?</h6>
        <p>
          Understanding the practicalities, processes and policies in a new
          organisation isn’t the most exciting part of starting a new job. But
          it’s one of the most important.
        </p>
        <h6>How do I fit into the bigger picture? </h6>
        <p>
          Simon Sinek’s now-famous TED talk, talks about the importance of
          knowing your Why. For Sinek, inspiration comes from purpose – so when
          employees understand WHY their job matters, they’re inspired to do
          better.
        </p>
        <h6>What do you expect from me?</h6>
        <p>
          Whether interns, graduates, managers or C-Suite, all new hires want to
          have a positive impact. They want to know your expectations so they
          can meet – and exceed – them.{' '}
        </p>
      </div>
    </Card>
  );
};

export default Faq;
