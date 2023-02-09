import React, { useEffect, useState } from "react";
import { Interweave } from "interweave";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Interweave is a robust React library that can safely render HTML without using dangerouslySetInnerHTML.
// Safely strip HTML tags.
// Automatic XSS and injection protection.

function Question({
  question,
  correct_answer,
  incorrect_answers,
  setQuestions,
  index,
  isRevealed,
  selectedAns,
  isCorrect,
}) {
  const [shuffledAns, setShuffledAns] = useState(() => [
    ...shuffleAnswers(correct_answer, incorrect_answers),
  ]);
  function shuffleAnswers(correct_answer, incorrect_answers) {
    let array = [...incorrect_answers, correct_answer];
    let i = array.length;
    while (--i) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function setSelectedAns(e) {
    if (isRevealed) return; // so the user won't be able to highlight answer after he revealed them
    Array.from(e.currentTarget.parentElement.children).forEach((e) =>
      e.classList.remove("active")
    );
    e.currentTarget.classList.add("active");
    let value = e.currentTarget.dataset.anscontent;
    let i = e.currentTarget.dataset.quesindex;

    setQuestions((prevState) => {
      prevState[i] = {
        ...prevState[i],
        selectedAns: value,
        isCorrect: prevState[i].correct_answer === value, // returns boolean to tell wether the selected answer is the correct one or not
      };
      return prevState;
    });
  }
  let answersElements = shuffledAns.map(function (e, i) {
    let className;
    if (isRevealed) {
      if (e === selectedAns && !isCorrect) className = "incorrect";
      else if (e === correct_answer) className = "correct";
    }
    return (
      <button
        key={i}
        className={className}
        data-anscontent={e}
        data-quesindex={index}
        onClick={setSelectedAns}
      >
        <Interweave content={e} />
      </button>
    );
  });

  return (
    <>
      <div className="question-container">
        <Interweave className="question-title" content={question} />
        <div className="answers-container">{answersElements}</div>
        <div className="solid"></div>
      </div>
    </>
  );
}
export default Question;
