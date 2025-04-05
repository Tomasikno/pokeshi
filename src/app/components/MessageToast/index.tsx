"use client";

import { useState, useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styles from './MessageToast.module.css';

interface ToastMessageProps {
  message: string | null;
  variant?: "success" | "danger" | "info";
  onClose?: () => void;
  duration?: number;
}

export default function ToastMessage({
  message,
  variant = "info",
  onClose,
  duration = 3000,
}: ToastMessageProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
    }
  }, [message]);

  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  if (!message) return null;

  return (
    <ToastContainer className={`${styles.scrollable} p-3`}>
      <Toast
        onClose={handleClose}
        show={show}
        delay={duration}
        autohide
        bg={variant}
      >
        <Toast.Header>
          <strong className="me-auto">
            {variant === "success" ? "Success" : variant === "danger" ? "Error" : "Info"}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}