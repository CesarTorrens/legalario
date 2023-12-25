"use client";
import { useMemo, useState } from "react";
import styles from "./step2.module.sass";
import { Capture } from "app/components/CaptureComponent/Capture";
import { useContext } from "react";
import { StepsContext } from "app/context/stepsContext";

export default function Step2() {
  const steps = useContext(StepsContext);

  if (!steps.shouldRenderStep2) {
    return null;
  }
  return (
    <main
      className={!steps.permission ? styles.Main : styles.MainContentMobile}
    >
      <Capture />
    </main>
  );
}
