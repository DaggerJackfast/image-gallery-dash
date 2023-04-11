import React, { MouseEventHandler, useEffect } from "react";
import cx from "classnames";
import { createPortal } from "react-dom";

interface ModalProps {
  children: string | JSX.Element | JSX.Element[];
  className?: string;
  show: boolean;
  onOverlayClick: MouseEventHandler<HTMLDivElement>;
}

const Modal = ({ show, className, children, onOverlayClick }: ModalProps) => {
  const overlay = "fixed inset-0 z-10 overflow-y-auto bg-slate-900/[.5]";
  const onClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onOverlayClick(e);
    }
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (!body) {
      return;
    }
    if (show) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "unset";
    }
  }, [show]);

  const content = show ? (
    <div
      className={cx(overlay, className || "")}
      onClick={onClick}
      aria-hidden="true"
    >
      {children}
    </div>
  ) : null;

  const modalContainer = document.getElementById("modal-root") as Element;
  return <>{createPortal(content, modalContainer)}</>;
};

export default Modal;
