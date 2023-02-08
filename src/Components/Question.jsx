import React, { useEffect, useState } from "react";
import { Interweave } from "interweave";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Interweave is a robust React library that can...

// Safely render HTML without using dangerouslySetInnerHTML.
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
  function shuffleAnswers(correct_answer, incorrect_answers) {
    let array = [...incorrect_answers, correct_answer];

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const [shuffledAns, setShuffledAns] = useState([]);
  useEffect(function () {
    // if (isRevealed) return;
    setShuffledAns([...shuffleAnswers(correct_answer, incorrect_answers)]);
  }, []);
  function setSelectedAns(e) {
    Array.from(e.currentTarget.parentElement.children).forEach((e) =>
      e.classList.remove("active")
    );
    e.currentTarget.classList.add("active");
    let value = e.currentTarget.dataset.answercontent;
    let i = e.currentTarget.dataset.questionindex;

    setQuestions((prevState) => {
      prevState[i] = {
        ...prevState[i],
        selectedAns: value,
        isCorrect: prevState[i].correct_answer === value,
      };
      return prevState;
    });
  }
  let answersElements = shuffledAns.map(function (e, i) {
    return (
      <button
        key={i}
        className={`${
          isRevealed && e === selectedAns && !isCorrect ? "incorrect" : ""
        } ${e === correct_answer && isRevealed ? "correct" : ""}`}
        data-answercontent={e}
        data-questionindex={index}
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
