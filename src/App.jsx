import React, { useEffect, useState } from "react";
import Question from "./Components/Question";
import SkeletonTemplate from "./Components/SkeletonTemplate";
import Checkbtn from "./Components/Checkbtn";
import Homepage from "./Components/Homepage";
import { nanoid } from "nanoid";
function App() {
  let noOfAns = 4;

  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [starred, setStarred] = useState(
    () => JSON.parse(localStorage.getItem("starred")) || []
  );
  const [starredFlag, setStarredFlag] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [preferences, setPreferences] = useState({
    difficulty: "easy",
    category: "any",
    noOfQues: 5,
    canRevealAnswers: true,
  });

  let { difficulty, category, noOfQues, canRevealAnswers } = preferences;

  useEffect(() => {
    if (isRevealed || starredFlag || !start) {
      //  (!start) so it won't load the questions on the first mount and reloads on quiz start causing a UI bug
      if (starredFlag && !isRevealed) {
        // when the user plays again using starred questions we gotta reset the selected answer and isCorrect back to false
        // setting the questions state with the starred that already has selectedAns as null and iscorrect to false
        // will update the UI and since we don't have a unique key for each question
        // will cause a problem you can use a unique key for the key using nanoid
        //   setQuestions((prevState) => {
        //     let arr;
        //     // arr = prevState.map((e) => ({
        //     //   ...e,
        //     //   selectedAns: null,
        //     //   isCorrect: false,
        //     // }));
        //     // return [...arr];
        //   });
        // }
        if (starred.length !== 0) {
          setQuestions([...starred]);
        } else {
          setStart(false);
        }
      }
      return;
    } // if the user decided to play another game with the same preferences
    // he shouldn't get them immediately after he reveals the answers
    if (questions.length !== 0) setQuestions([]); // reset questions

    let categoryQuery = category !== "any" ? `&category=${category}` : "";

    fetch(
      `https://opentdb.com/api.php?amount=${noOfQues}${categoryQuery}&difficulty=${difficulty}&type=multiple`
    )
      .then((response) => response.json())
      .then((data) => {
        let arr = data.results.map((e) => {
          // let { type, ...rest } = e; // execlude type
          return {
            ...e,
            selectedAns: null,
            isCorrect: false, // isCorrect can be removed and replaced by comparing selectedAns with correct_ans but it's better to keep it that way for
            // readability
            key: nanoid(), // so if any change were happen to the UI ((ex)unstarred a question)
            // and the questions array got updated with the updated starred when the user decided to play again (isRevealed && starredFlag)
            // we won't run into bugs (using index as a key will cause bugs)
          };
        });
        setQuestions(arr);
      });
  }, [isRevealed, start]); // (noOfQues category, difficulty) were orignally there but were removed so an api request won't be fired
  // everytime they get changed but get fired whenever the user starts a new quiz with the same preferences(isRevealed) or with other prefernces (start)
  // starredflag isn't needed in the depencies array as it's set in the homepage only where start is equal to false

  function getScore() {
    let number = 0;
    questions.forEach((e) => {
      if (e.isCorrect) number += 1;
    });
    return isRevealed ? number : 0;
  }
  const quesElements = questions.map(function (questionObj, index) {
    return (
      <Question
        key={questionObj.key}
        index={index}
        questionObj={questionObj}
        setQuestions={setQuestions}
        isRevealed={isRevealed}
        starred={starred}
        questions={questions}
        setStarred={setStarred}
      />
    );
  });

  return (
    <>
      <div className="starred">
        <div className="star active">
          <svg
            viewBox="0 0 42 40"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path d="M21,34 L10.4346982,39.5545079 C8.47875732,40.5828068 7.19697214,39.6450119 7.56952871,37.4728404 L9.5873218,25.7082039 L1.03981311,17.3764421 C-0.542576313,15.8339937 -0.0467737017,14.3251489 2.13421047,14.0082334 L13.946577,12.2917961 L19.2292279,1.58797623 C20.2071983,-0.393608322 21.7954064,-0.388330682 22.7707721,1.58797623 L28.053423,12.2917961 L39.8657895,14.0082334 C42.0525979,14.3259953 42.5383619,15.8381017 40.9601869,17.3764421 L32.4126782,25.7082039 L34.4304713,37.4728404 C34.8040228,39.6508126 33.5160333,40.5800681 31.5653018,39.5545079 L21,34 Z"></path>
          </svg>
        </div>
        <span>{starred.length}</span>
      </div>
      {start ? (
        <main className={`App-container ${isRevealed ? "revealed" : ""}`}>
          <div>
            {!!questions.length ? (
              quesElements
            ) : (
              <SkeletonTemplate noOfAns={noOfAns} noOfQues={noOfQues} />
            )}
          </div>
          <div
            className="button-container"
            style={{ margin: questions.length ? "unset" : "0 auto" }}
          >
            {!!questions.length && (
              <p className="score">
                {getScore()}/{questions.length} correct answers
              </p>
            )}
            <Checkbtn
              isRevealed={isRevealed}
              setIsRevealed={setIsRevealed}
              questions={questions}
              canRevealAnswers={canRevealAnswers}
            />
            {!!questions.length && (
              <p
                className="change-settings"
                onClick={() => {
                  setStarredFlag(false); // this should be there in case your homepage had some functions using starredflag so it won't be still set to true
                  // if you were previously on take a quiz with starred ques
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
          starred={starred}
          setQuestions={setQuestions}
          setStarredFlag={setStarredFlag}
        />
      )}
    </>
  );
}
export default App;
