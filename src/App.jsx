import React, { useEffect, useState } from "react";
import Question from "./Components/Question";
import SkeletonTemplate from "./Components/SkeletonTemplate";
import Checkbtn from "./Components/Checkbtn";
import Homepage from "./Components/Homepage";
function App() {
  let noOfAns = 4;
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isRevealed, setIsRevealed] = useState(false);
  const [preferences, setPreferences] = useState({
    difficulty: "medium",
    category: "any",
    noOfQues: 5,
  });

  let { difficulty, category, noOfQues } = preferences;

  useEffect(() => {
    if (isRevealed) return; // if the user decided to play another game with the same preferences
    // he shouldn't get them immediately after he reveals the answers
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
  // everytime they get changed but get fired whenever the user starts a new quiz with the same preferences(isRevealed) or with new ones (start)

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
              <p className="score">{getScore()} correct answers</p>
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
          preferences={preferences}
          setPreferences={setPreferences}
        />
      )}
    </>
  );
}
export default App;
