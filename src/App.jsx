import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Question from "./Components/Question";
import SkeletonTemplate from "./Components/SkeletonTemplate";
import Checkbtn from "./Components/Checkbtn";
import Homepage from "./Components/Homepage";
function App() {
  let noOfAns = 4;

  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [isRevealed, setIsRevealed] = useState(false);
  const [category, setCategory] = useState("10");
  const [noOfQues, setnoOfQues] = useState(5);
  useEffect(() => {
    if (isRevealed) return;
    setQuestions([]);
    fetch(
      `https://opentdb.com/api.php?amount=${noOfQues}&category=${category}&difficulty=${difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        let arr = data.results.map((e) => {
          let { category, difficulty, type, ...rest } = e; // execlude category and difficulty
          return {
            ...rest,
            selectedAns: null,
            isCorrect: false,
          };
        });
        setQuestions(arr);
      });
  }, [noOfQues, category, difficulty, isRevealed]);

  function getScore() {
    let number = 0;
    questions.forEach((e) => {
      if (e.isCorrect) number += 1;
    });
    return `${number}/${noOfQues}`;
  }
  const quesElements = questions.map(function (questionObj, index) {
    return (
      <Question
        key={index}
        index={index}
        {...questionObj}
        setQuestions={setQuestions}
        isRevealed={isRevealed}
      />
    );
  });

  return (
    <>
      {start ? (
        <main className={`App-container ${isRevealed ? "revealed" : ""}`}>
          <div>
            {questions.length < 1 ? (
              <SkeletonTemplate noOfQues={noOfQues} noOfAns={noOfAns} />
            ) : (
              quesElements
            )}
          </div>
          <div className="button-container">
            {isRevealed && (
              <p className="score">You scored {getScore()} correct answers</p>
            )}

            <Checkbtn
              isRevealed={isRevealed}
              setIsRevealed={setIsRevealed}
              questions={questions}
            />
            {isRevealed && (
              <p
                className="change-settings"
                onClick={() => {
                  setIsRevealed(false);
                  setStart(false);
                }}
              >
                change settings⚙️
              </p>
            )}
          </div>
        </main>
      ) : (
        <Homepage
          setStart={setStart}
          difficulty={difficulty}
          category={category}
          noOfQues={noOfQues}
          setDifficulty={setDifficulty}
          setCategory={setCategory}
          setnoOfQues={setnoOfQues}
        />
      )}
    </>
  );
}
export default App;
