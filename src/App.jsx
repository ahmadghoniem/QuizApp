import React, { useEffect, useState } from "react";
import Question from "./Components/Question";
import SkeletonTemplate from "./Components/SkeletonTemplate";
import Checkbtn from "./Components/Checkbtn";
import Homepage from "./Components/Homepage";
function App() {
  let noOfAns = 4;

  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("easy");
  const [isRevealed, setIsRevealed] = useState(false);
  const [category, setCategory] = useState("any"); //
  const [noOfQues, setnoOfQues] = useState(5); // set prefernces into one state (TODO)
  useEffect(() => {
    if (isRevealed) return; // check against start so apicalls wont be repetitive when you change fields
    setQuestions([]);
    let categoryQuery = category !== "any" ? `&category=${category}` : "";
    fetch(
      `https://opentdb.com/api.php?amount=${noOfQues}${categoryQuery}&difficulty=${difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        let arr = data.results.map((e) => {
          let { category, difficulty, type, ...rest } = e; // execlude category and difficulty and type
          return {
            ...rest,
            selectedAns: null,
            isCorrect: false,
          };
        });
        setQuestions(arr);
      });
  }, [isRevealed, start]); // (noOfQues category, difficulty) were orignally there but were removed so an api request won't be fired
  // everytime they get changed but get fired whenever the user starts a new quiz with the same settings or with new ones

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
