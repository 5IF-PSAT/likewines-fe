import { useParams } from "react-router-dom";
import PredictionInfo from "../components/Prediction/PredictionInfo";
import WineInfo from "../components/WineInfo";
import Title from "../components/Title";
function Prediction() {
  const id = Number(useParams().id);

  return (
    <>
      <Title text="Wine Quality Prediction" />
      <WineInfo id={id} />
      <PredictionInfo id={id} />
    </>
  );
}

export default Prediction;
