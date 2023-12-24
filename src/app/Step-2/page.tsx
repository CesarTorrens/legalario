"use client";
import { useState } from "react";
import styles from "./step2.module.sass";
import { Capture } from "app/components/CaptureComponent/Capture";

export default function Step2() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <main className={styles.Main}>
      <Capture />
    </main>
  );
}
