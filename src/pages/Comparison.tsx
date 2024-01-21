import { useParams } from "react-router-dom";
import ComparisonInfo from "../components/Comparison/ComparisonInfo";
import Title from "../components/Title";
import WineInfo from "../components/WineInfo";
function Comparison() {
  const id = Number(useParams().id);

  return (
    <>
      <Title text="Wine Similarity" />
      <WineInfo id={id} />
      <ComparisonInfo id={id} />
    </>
  );
}

export default Comparison;
