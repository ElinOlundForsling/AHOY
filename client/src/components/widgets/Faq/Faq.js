import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Card from '../../layout/Card';
import DocumentContainer from './DocumentContainer';

import '../../../stylesheets/faq.css';
import '../../../stylesheets/index.css';
import '../../../stylesheets/card.css';

const Faq = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documents, setDocuments] = useState([
    {
      title: 'What will my first day look like?',
      content:
        'Even experienced new hires have first-day nerves. Your employee onboarding programme should address the practicalities of their first day, so new hires can stop worrying and focus on bringing their A-game.',
    },

    {
      title: 'How does everything work?',
      content:
        'Understanding the practicalities, processes and policies in a new organisation isn’t the most exciting part of starting a new job. But it’s one of the most important.',
    },
    {
      title: 'How do I fit into the bigger picture?',
      content:
        'Simon Sinek’s now-famous TED talk, talks about the importance of knowing your Why. For Sinek, inspiration comes from purpose – so when employees understand WHY their job matters, they’re inspired to do better.',
    },
    {
      title: 'What do you expect from me?',
      content:
        'Whether interns, graduates, managers or C-Suite, all new hires want to have a positive impact. They want to know your expectations so they can meet – and exceed – them.',
    },
    {
      title: 'What should I focus on doing today?',
      content:
        'It’s important for you and your manager to align on expectations immediately, says Joseph Liu, a career change consultant and host of the Career Relaunch Podcast. Don’t assume you fully understand your role and begin working on a project incorrectly—or sit idly by and wait for someone to tell you to work. Asking this question conveys to your manager that you respect his or her authority, you’re a team player and you’re ready to hit the ground running.',
    },
    {
      title: 'Who are a few people I should try and meet this week?',
      content:
        'Begin forming relationships with key stakeholders as soon as possible, says Elene Cafasso, executive career coach at Enerpace, Inc. Doing so will help you move up through your new company and achieve your goals. “Your success or failure will be determined by the relationships you create,” Cafasso says. “Be sure to communicate what you stand for and what you want to create in this position.”',
    },
    {
      title: 'Who do I report to when my manager is not available?',
      content:
        'There will eventually be a time when your direct manager is unavailable due to meetings or absences. Knowing who to direct your questions to when this happens will help you remain calm and organized, says Grant van der Harst, managing director for Anglo Liners, a road marking company. “It also shows initiative and drive,” says van der Harst.',
    },
    {
      title: 'What’s the preferred channel of communication in the office?',
      content:
        'While you can definitely pick up on the primary means of communication just by observing your co-workers, it’s still important to ask your manager to clue you in on what’s appropriate and what’s not when sending messages or emails to others within the office,” says Zachary Painter, a career adviser and hiring manager at ReumeGenius.com.',
    },
    {
      title: 'Will there be formal training?',
      content:
        'It’s important to establish early on what you’re expected to be able to do on your own and what skills and training you should wait for, says Marc Prosser, co-founder of FitSmallBusiness.com, a small business advice website.',
    },
  ]);

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const dynamicSearch = () => {
    return documents.filter((document) =>
      document.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <Card heading="FAQ" subHeading="Got questions?" className="faq-component">
      <div className="faq-card">
        <input
          type="text"
          className="faq-input"
          value={searchTerm}
          onChange={editSearchTerm}
          placeholder="Search here!"
        />
        <br></br>

        <DocumentContainer
          searchTerm={searchTerm}
          documents={dynamicSearch()}
        />
      </div>
    </Card>
  );
};

export default Faq;
