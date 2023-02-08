import React, { useState } from "react";
import { Interweave } from "interweave";
// Interweave is a robust React library that can...

// Safely render HTML without using dangerouslySetInnerHTML.
// Safely strip HTML tags.
// Automatic XSS and injection protection.

function Question({
  question,
  correctAnswer,
  incorrectAnswers,
  setQuestions,
  index,
  questions,
  isRevealed,
  selectedAns,
  isCorrect,
}) {
  function shuffleAnswers(correctAnswer, incorrectAnswers) {
    let array = [...incorrectAnswers, correctAnswer];

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const [shuffledAns, setShuffledAns] = useState(() => [
    ...shuffleAnswers(correctAnswer, incorrectAnswers),
  ]);

  function setSelectedAns(e) {
    Array.from(e.currentTarget.parentElement.children).forEach((e) =>
      e.classList.remove("active")
    );
    e.currentTarget.classList.add("active");
    let value = e.currentTarget.dataset.answercontent;
    let index = e.currentTarget.dataset.questionindex;

    setQuestions((prevState) => {
      prevState[index] = {
        ...prevState[index],
        selectedAns: value,
        isCorrect: prevState[index].correctAnswer === value,
      };
      return prevState;
    });
    console.log(questions);
  }
  let answersElements = shuffledAns.map(function (e) {
    let name = isRevealed && e === selectedAns && !isCorrect ? "incorrect" : "";
    return (
      <button
        className={`${name} ${
          e === correctAnswer && isRevealed ? "correct" : ""
        }`}
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
        <div className="answers-container" data-index={index}>
          {answersElements}
        </div>
        <div className="solid"></div>
      </div>
    </>
  );
}
export default Question;
