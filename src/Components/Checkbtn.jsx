import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Checkbtn({ isRevealed, setIsRevealed, questions, answerAll }) {
  let skeleProps = {
    baseColor: "#4d5b9e33",
    highlightColor: "#4d5b9e0a",
    borderRadius: "10px",
    height: "45px",
    width: "140px",
  };
  console.log(answerAll);
  function isThereNull() {
    return questions.some(function (e) {
      return e.selectedAns == null;
    });
  }
  return questions.length < 1 ? (
    <span>
      <Skeleton {...skeleProps} />{" "}
    </span>
  ) : (
    <button
      className="check-answers"
      onClick={() => setIsRevealed((prevState) => !prevState)}
      disabled={answerAll && isThereNull()}
    >
      {!isRevealed ? "Check answers" : "Play again"}
    </button>
  );
}
export default Checkbtn;
