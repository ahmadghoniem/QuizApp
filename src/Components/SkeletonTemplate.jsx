import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonTemplate({ noOfQues, noOfAns }) {
  let props = {
    baseColor: "#4d5b9e33",
    highlightColor: "#4d5b9e0a",
    borderRadius: "8px",
  };

  let eles = [...Array(parseInt(noOfQues))].map(() => (
    <div className="question-container">
      <span className="question-title">
        <Skeleton {...props} borderRadius="4px" height={20} width={600} />
        <Skeleton {...props} borderRadius="4px" height={20} width={450} />
      </span>
      <div className="answers-container">
        {[...Array(noOfAns)].map(() => (
          <Skeleton {...props} height={25} width={85} />
        ))}
      </div>
      <div className="solid" style={{ width: "600px" }}></div>
    </div>
  ));
  return <>{eles}</>;
}
export default SkeletonTemplate;
