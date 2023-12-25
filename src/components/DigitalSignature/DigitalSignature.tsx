import SignatureCanvas from "react-signature-canvas";
import { useRef, useState, useEffect } from "react";
import styles from "./DigitalSignature.module.sass";
import { useContext } from "react";
import { StepsContext } from "app/context/stepsContext";

export const DigitalSignature = (props: any) => {
  const { setSignature } = props;
  const signatureRef = useRef<any>({});
  const [imageData, setImageData] = useState<string | null>("");
  const [error, setError] = useState(true);
  const steps = useContext(StepsContext);

  const saveSignature = (signature: string | null) => {
    setImageData(signature);
    setSignature(signature);
  };

  //   useEffect(() => {
  //     console.log(imageData);
  //   }, [imageData]);
  return (
    <>
      <SignatureCanvas
        canvasProps={{
          height: 200,
          style: { width: "100%", border: "1px solid #000000" },
        }}
        ref={signatureRef}
        onBegin={() => {
          setError(false);
        }}
        onEnd={() => {
          saveSignature(
            signatureRef.current.getTrimmedCanvas().toDataURL("image/jpg")
          );
        }}
      />
      <button
        className={styles.ClearButton}
        onClick={() => {
          signatureRef.current.clear();
          saveSignature(null);
        }}
      >
        {" "}
        Limpiar firma{" "}
      </button>
      <pre className={styles.Error}>
        {error ? <div>La firma es obligatoria</div> : false}
      </pre>
      {/* <span>{imageData}</span> */}
    </>
  );
};
