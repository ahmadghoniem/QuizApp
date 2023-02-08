import React, { useEffect, useState } from "react";
import Question from "./Components/Question";

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

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        let arr = data.results.map(function ({
          question,
          category,
          difficulty,
          correct_answer,
          incorrect_answers,
        }) {
          return {
            question: question,
            category: category,
            difficulty: difficulty,
            correctAnswer: correct_answer,
            incorrectAnswers: incorrect_answers,
            selectedAns: null,
            isCorrect: false,
          };
        });
        setQuestions(arr);
      });
  }, []);

  function checkAnswers() {
    setIsRevealed(true);
    //count no of correctAnswers
    questions.forEach((e) => {
      if (e.isCorrect) number += 1;
    });
    console.log(`${number}/5`);
  }

  function getCorrectAnsCount() {
    let number = 0;
    questions.forEach((e) => {
      if (e.isCorrect) number += 1;
    });
    return number;
  }

  const quesElements = questions.map(function (
    { question, correctAnswer, incorrectAnswers, selectedAns, isCorrect },
    index
  ) {
    return (
      <Question
        key={index}
        index={index}
        question={question}
        questions={questions}
        correctAnswer={correctAnswer}
        incorrectAnswers={incorrectAnswers}
        setQuestions={setQuestions}
        isRevealed={isRevealed}
        selectedAns={selectedAns}
        isCorrect={isCorrect}
      />
    );
  });

  return (
    <main className="App-container">
      <div className={isRevealed ? "revealed" : ""}>{quesElements}</div>
      {}
      <button
        className="check-answers"
        onClick={() => {
          checkAnswers();
        }}
      >
        {isRevealed ? `${getCorrectAnsCount()}/5` : "Check answers"}
      </button>
    </main>
  );
}
export default App;
