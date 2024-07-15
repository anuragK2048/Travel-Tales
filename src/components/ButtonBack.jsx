import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function ButtonBack() {
  const { setMapSearchInputValue } = useCities();
  const navigate = useNavigate();
  async function handleClick(e) {
    e.preventDefault();
    setMapSearchInputValue("");
    navigate(-1);
  }
  return (
    <Button type="back" onClick={handleClick}>
      &larr; Back
    </Button>
  );
}

export default ButtonBack;
