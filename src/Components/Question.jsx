import React, { useState } from "react";
import { Interweave } from "interweave";
// Interweave is a robust React library that can safely render HTML without using dangerouslySetInnerHTML.
// Safely strip HTML tags.
// Automatic XSS and injection protection.

function Question({
  index,
  questionObj,
  setQuestions,
  questions,
  setStarred,
  starred,
  isRevealed,
}) {
  let { question, correct_answer, incorrect_answers, selectedAns, isCorrect } =
    questionObj;
  // console.log(questions);
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
  function starQuestion(e) {
    let qIndex = e.currentTarget.dataset.qindex;
    let callbackFunc;
    let activeState = e.currentTarget.classList.toggle("active"); // true = active class has been added and viceversa
    callbackFunc = (prevState) => {
      let arr;
      if (activeState) {
        // add the question to the starred array and localStorage
        // there can't be any type of duplicates as checkStarred already compares the questions title with the starred array
        // and stars them
        arr = [
          ...prevState,
          { ...questions[qIndex], isCorrect: false, selectedAns: null },
        ];
      } else {
        // remove the question from the starred array and localStorage
        arr = prevState.filter((e) => {
          return e.question !== questions[qIndex].question;
        });
      }
      localStorage.setItem("starred", JSON.stringify(arr));
      return arr;
    };

    setStarred(callbackFunc);
  }
  function checkStarred(index) {
    let q = questions[index];
    let res = starred.find((e) => e.question === q.question);
    return res !== undefined ? " active" : "";
  }
  function setSelectedAns(e) {
    if (isRevealed) return; // so the user won't be able to highlight answer after he revealed them
    let [quesIndex, answIndex] = e.currentTarget.id.split("-");
    setQuestions((prevState) => {
      prevState[quesIndex] = {
        ...prevState[quesIndex],
        selectedAns: shuffledAns[answIndex],
        isCorrect:
          prevState[quesIndex].correct_answer === shuffledAns[answIndex], // returns boolean to tell wether the selected answer is the correct one or not
      };
      /*
      /return prevState; 
      React uses reference equality to determine if a state change should trigger a re-render.
       When you return the same reference to the state, React will not trigger a re-render, even if the state's contents have changed. 
       */
      return [...prevState];
    });
  }
  let answersElements = shuffledAns.map(function (e, i) {
    let className;
    if (isRevealed) {
      if (e === selectedAns && !isCorrect) className = "incorrect";
      else if (e === correct_answer) className = "correct";
    }
    return (
      <>
        <input
          key={i}
          type="radio"
          id={`${index}-${i}`}
          name={`Q${index}`}
          value={e}
          checked={selectedAns === e}
          onChange={setSelectedAns}
          disabled={isRevealed}
        />

        <label htmlFor={`${index}-${i}`} className={className}>
          <Interweave content={e} />
        </label>
      </>
    );
  });

  return (
    <>
      <div className="question-container">
        <div className="title-container">
          <Interweave className="question-title" content={question} />
          <div
            className={`star${checkStarred(index)}`}
            data-qindex={index}
            onClick={starQuestion}
          >
            <svg
              viewBox="0 0 42 40"
              version="1.1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path d="M21,34 L10.4346982,39.5545079 C8.47875732,40.5828068 7.19697214,39.6450119 7.56952871,37.4728404 L9.5873218,25.7082039 L1.03981311,17.3764421 C-0.542576313,15.8339937 -0.0467737017,14.3251489 2.13421047,14.0082334 L13.946577,12.2917961 L19.2292279,1.58797623 C20.2071983,-0.393608322 21.7954064,-0.388330682 22.7707721,1.58797623 L28.053423,12.2917961 L39.8657895,14.0082334 C42.0525979,14.3259953 42.5383619,15.8381017 40.9601869,17.3764421 L32.4126782,25.7082039 L34.4304713,37.4728404 C34.8040228,39.6508126 33.5160333,40.5800681 31.5653018,39.5545079 L21,34 Z"></path>
            </svg>
          </div>
        </div>
        <div className="answers-container">{answersElements}</div>
        <div className="solid"></div>
      </div>
    </>
  );
}
export default Question;
