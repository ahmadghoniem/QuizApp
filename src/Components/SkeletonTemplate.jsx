import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonTemplate({ noOfQuestions, noOfAnswers }) {
  let props = {
    baseColor: "#4d5b9e33",
    highlightColor: "#4d5b9e0a",
    borderRadius: "8px",
  };
  let eles = [...Array(noOfQuestions)].map(() => (
    <div className="question-container">
      <span className="question-title">
        <Skeleton {...props} height={20} width={385} />
      </span>
      <div className="answers-container">
        {[...Array(noOfAnswers)].map(() => (
          <Skeleton {...props} height={25} width={85} />
        ))}
      </div>
      <div className="solid"></div>
    </div>
  ));
  return <>{eles}</>;
}
export default SkeletonTemplate;
