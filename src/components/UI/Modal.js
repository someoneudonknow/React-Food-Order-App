import classes from "./Modal.module.css";
import { createPortal } from "react-dom";
import { Fragment } from "react";

const Backdrop = ({onClick}) => {
  return <div onClick={onClick} className={classes.backdrop}></div>;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const portalEl = document.getElementById('overlay');

const Modal = ({ children, onClose }) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClick={onClose}/>, portalEl)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalEl)}
    </Fragment>
  );
};

export default Modal;
