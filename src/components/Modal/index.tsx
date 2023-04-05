import React, { MouseEventHandler } from "react";
import cx from "classnames";
import { createPortal } from "react-dom";

interface ModalProps {
  children: string | JSX.Element | JSX.Element[];
  className: string;
  show: boolean;
  onOverlayClick: MouseEventHandler<HTMLDivElement>;
}

const Modal = ({
  className = "",
  show = false,
  children,
  onOverlayClick,
}: ModalProps) => {
  const overlay = "fixed inset-0 z-10 overflow-y-auto bg-slate-900/[.5]";

  const content = show ? (
    <div
      className={cx(overlay, className)}
      onClick={onOverlayClick}
      aria-hidden="true"
    >
      {children}
    </div>
  ) : null;

  const modalContainer = document.getElementById("modal-root") as Element;
  return <>{createPortal(content, modalContainer)}</>;
};

export default Modal;
