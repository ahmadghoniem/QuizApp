import React, { useEffect, useState } from "react";
import Question from "./Components/Question";
import SkeletonTemplate from "./Components/SkeletonTemplate";
function App() {
  const [start, setStart] = useState(true);
  const [questions, setQuestions] = useState([
    // {
    //   question:
    //     "In the movie &ldquo;The Iron Giant,&rdquo; this character is the protagonist.",
    //   category: "Entertainment: Film",
    //   difficulty: "medium",
    //   correctAnswer: "XHogarth Hughes",
    //   incorrectAnswers: ["Kent Mansley", "Dean McCoppin", "Annie Hughes"],
    //   selectedAns: null,
    //   isCorrect: false,
    // },
    // {
    //   question:
    //     "Which actor played the main character in the 1990 film &quot;Edward Scissorhands&quot;?",
    //   category: "Entertainment: Film",
    //   difficulty: "medium",
    //   correctAnswer: "XJohnny Depp",
    //   incorrectAnswers: [" Clint Eastwood", "Leonardo DiCaprio", "Ben Stiller"],
    //   selectedAns: null,
    //   isCorrect: false,
    // },
    // {
    //   question:
    //     "Leonardo Di Caprio won his first Best Actor Oscar for his performance in which film?",
    //   category: "Entertainment: Film",
    //   difficulty: "medium",
    //   correctAnswer: "XThe Revenant",
    //   incorrectAnswers: [
    //     "The Wolf Of Wall Street",
    //     "Shutter Island",
    //     "Inception",
    //   ],
    //   selectedAns: null,
    //   isCorrect: false,
    // },
    // {
    //   question: "Who directed the movie &quot;Alien&quot;?",
    //   category: "Entertainment: Film",
    //   difficulty: "medium",
    //   correctAnswer: "XRidley Scott",
    //   incorrectAnswers: ["Christopher Nolan", "Michael Bay", "James Cameron"],
    //   selectedAns: null,
    //   isCorrect: false,
    // },
    // {
    //   question:
    //     "Which town is the setting for the Disney movie The Love Bug (1968)?",
    //   category: "Entertainment: Film",
    //   difficulty: "medium",
    //   correctAnswer: "XSan Francisco",
    //   incorrectAnswers: ["Los Angeles", "Sacramento", "San Jose"],
    //   selectedAns: null,
    //   isCorrect: false,
    // },
  ]);
  const [difficulty, setDifficulty] = useState("easy");
  const [isRevealed, setIsRevealed] = useState(false);
  const [category, setCategory] = useState("films");
  const [noOfQuestions, setNoOFQuestions] = useState(5);
  console.log(process.env.API_URL);
  useEffect(() => {
    // if (isRevealed) return;
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        let arr = data.results.map(function (e) {
          let { category, difficulty, type, ...rest } = e;
          return {
            ...rest,
            selectedAns: null,
            isCorrect: false,
          };
        });
        setQuestions(arr);
      });
  }, []);

  function checkAnswers() {
    setIsRevealed(true);
  }

  function getCorrectAnsCount() {
    let number = 0;
    questions.forEach((e) => {
      if (e.isCorrect) number += 1;
    });
    return number;
  }
  const quesElements = questions.map(function (questionObj, index) {
    return (
      <Question
        key={index}
        index={index}
        {...questionObj}
        questions={questions}
        setQuestions={setQuestions}
        isRevealed={isRevealed}
      />
    );
  });

  return (
    <main className={`App-container ${isRevealed ? "revealed" : ""}`}>
      <div>
        {questions.length < 1 ? (
          <SkeletonTemplate noOfQuestions={noOfQuestions} />
        ) : (
          quesElements
        )}
      </div>
      <div className="button-container">
        {isRevealed && (
          <p className="score">
            You scored {getCorrectAnsCount()}/5 correct answers
          </p>
        )}

        <button className="check-answers" onClick={checkAnswers}>
          {!isRevealed ? "Check answers" : "Play again"}
        </button>
      </div>
    </main>
  );
}
export default App;
