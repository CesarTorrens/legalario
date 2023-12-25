"use client";
import { useEffect, useState } from "react";
import { SignatureDialog } from "app/components/Dialog/SignatureDialog";
import styles from "./page.module.sass";
import { AlertDialog } from "app/components/Dialog/AlertDialog";
import { useMobile } from "app/hooks/useMobile";
import { StepsContext } from "app/context/stepsContext";
import { useContext } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function Home() {
  const [openAlert, setOpenAlert] = useState(false);
  const [openSignature, setOpenSignature] = useState(false);
  const { height, width } = useMobile();
  const [pdf, setPdf] = useState<string | null>();
  const steps = useContext(StepsContext);

  const urlPdf = (pdf: any) => {
    if (pdf) {
      const url = URL.createObjectURL(pdf);
      console.log(url);
    }
  };

  const handleClickOpen = (key?: any) => {
    if (key === "alert") {
      setOpenAlert(true);
    } else {
      setOpenSignature(true);
    }
  };

  const uploadPdf = (e: any) => {
    const pdfData = e.target.files[0];
    const url = URL.createObjectURL(pdfData);
    setPdf(url);
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
          <input onChange={uploadPdf} type="file" />
          {pdf && (
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={pdf} />
            </Worker>
          )}
        </div>
        {width >= 1120 && (
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
                <button onClick={handleClickOpen}>Firmar documento</button>
              </div>
            </div>
          </aside>
        )}

        {width <= 1119 && (
          <div className={styles.ButtonMobile}>
            <button onClick={() => handleClickOpen()}>Firmar documento</button>
          </div>
        )}
      </section>
      <AlertDialog open={openAlert} handleClose={() => handleClose("alert")} />
      <SignatureDialog open={openSignature} handleClose={handleClose} />
    </main>
  );
}
