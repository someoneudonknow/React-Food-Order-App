import { useState, useRef } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import generateUniqueId from "../../../helper/generateUniqueId";

const MealItemForm = ({ onAddToCart }) => {
  const amountInputRef = useRef();
  const [amountIsValid, setAmountIsValid] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredAmount = Number(amountInputRef.current.value);

    if (enteredAmount > 10) {
      setAmountIsValid(false);
      amountInputRef.current.value = "1";
      return;
    }

    onAddToCart(enteredAmount);
    amountInputRef.current.value = "1";
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: `number`,
          id: `amount-${generateUniqueId()}`,
          min: "1",
          max: "10",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">Add</button>
      {!amountIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
};

export default MealItemForm;
