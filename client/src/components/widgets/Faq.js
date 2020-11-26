import React, { useState } from "react";
import Card from "../layout/Card";
import "../../stylesheets/widget-image.css";

import '../../stylesheets/faq.css';

const Faq = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  return (
    <Card heading="FAQ" subHeading="Got questions?" className="faq-component">
      <div className="faq-card">
        <h3>What will my first day look like?</h3>
        <p>
          Even experienced new hires have first-day nerves. Your employee
          onboarding programme should address the practicalities of their first
          day, so new hires can stop worrying and focus on bringing their
          A-game.
        </p>
        <h3>How does everything work?</h3>
        <p>
          Understanding the practicalities, processes and policies in a new
          organisation isn’t the most exciting part of starting a new job. But
          it’s one of the most important.
        </p>
        <h3>How do I fit into the bigger picture? </h3>
        <p>
          Simon Sinek’s now-famous TED talk, talks about the importance of
          knowing your Why. For Sinek, inspiration comes from purpose – so when
          employees understand WHY their job matters, they’re inspired to do
          better.
        </p>
        <h3>What do you expect from me?</h3>
        <p>
          Whether interns, graduates, managers or C-Suite, all new hires want to
          have a positive impact. They want to know your expectations so they
          can meet – and exceed – them.{" "}
        </p>
      </div>
    </Card>
  );
};

export default Faq;
