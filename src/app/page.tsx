"use client";
import { useEffect, useState } from "react";
import { SignatureDialog } from "app/components/Dialog/SignatureDialog";
import styles from "./page.module.sass";
import { AlertDialog } from "app/components/Dialog/AlertDialog";
import { StepsContext } from "app/context/stepsContext";
import { useContext } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { InputFile } from "app/components/InputFile/InputFile";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const [openAlert, setOpenAlert] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const [loading, setLoading] = useState(true);
  const steps = useContext(StepsContext);
  const searchParams = useSearchParams();
  // console.log(searchParams.get("pdfValue"));
  // useEffect(() => {
  //   if (searchParams.get("pdfValue")) {
  //     steps.saveData("pdfValue", searchParams.get("pdfValue"));
  //   }
  //   setLoading(false);
  // }, []);

  const handleClickOpen = (key?: any) => {
    if (key === "alert") {
      setOpenAlert(true);
    } else {
      setOpenSignature(true);
    }
  };

  const handleClose = (key?: string) => {
    if (key === "alert") {
      setOpenAlert(false);
    } else {
      setOpenSignature(false);
    }
  };

  useEffect(() => {
    if (steps.data.signatureValue) {
      setOpenAlert(true);
    }
  }, [openSignature]);

  return (
    <main className={styles.MainContent}>
      <section className={styles.sectionStyle}>
        <div className={styles.LeftSide}>
          <InputFile />
          {steps.data?.pdfValue && (
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={steps.data.pdfValue} />
            </Worker>
          )}
        </div>
        <aside className={styles.RightSide}>
          <div className={styles.Box}>
            <div className={styles.FirstSectionBox}>
              <p>Revisa y tus documentos</p>
              <div>
                <p>Contrato laboral</p>
                <div></div>
                <span>3 páginas</span>
              </div>
            </div>
            <div className={styles.SecondSectionBox}>
              <button disabled={!steps.data.pdfValue} onClick={handleClickOpen}>
                Firmar documento
              </button>
            </div>
          </div>
        </aside>

        <div className={styles.ButtonMobile}>
          <button disabled={!steps.data.pdfValue} onClick={handleClickOpen}>
            Firmar documento
          </button>
        </div>
      </section>

      <AlertDialog open={openAlert} handleClose={() => handleClose("alert")} />
      <SignatureDialog open={openSignature} handleClose={handleClose} />
    </main>
  );
}
