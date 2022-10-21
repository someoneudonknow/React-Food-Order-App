import classes from "./HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = ({ onClick }) => {
  const cartContext = useContext(CartContext);
  const [btnBump, setBtnBump] = useState(false);
  const { items } = cartContext;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setBtnBump(true);
    const timerId = setTimeout(() => {
      setBtnBump(false);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${btnBump && classes.bump}`;

  const numberOfCartItems = items.reduce((currentNum, item) => {
    return currentNum + item.amount;
  }, 0);

  return (
    <button onClick={onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
