import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonTemplate({ noOfQues, noOfAns }) {
  let eles = [...Array(+noOfQues)].map(() => (
    <div className="question-container">
      <div style={{ marginBottom: "14px" }}>
        <Skeleton width={600} />
        <Skeleton width={450} />
      </div>
      <div className="answers-container">
        {[...Array(noOfAns)].map(() => (
          <Skeleton borderRadius="8px" height={25} width={85} />
        ))}
      </div>
      <div className="solid"></div>
    </div>
  ));
  return (
    <>
      {
        <SkeletonTheme
          baseColor="#4d5b9e33"
          borderRadius="4px"
          highlightColor="#4d5b9e0a"
          height={20}
        >
          {eles}
        </SkeletonTheme>
      }
    </>
  );
}
export default SkeletonTemplate;
