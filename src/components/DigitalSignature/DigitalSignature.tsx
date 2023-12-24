import SignatureCanvas from "react-signature-canvas";
import { useRef, useState, useEffect } from "react";

export const DigitalSignature = (props: any) => {
  const { setSignature } = props;
  const signatureRef = useRef({});
  const [imageData, setImageData] = useState<string | null>("");
  const [error, setError] = useState(true);

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
        onClick={() => {
          signatureRef.current.clear();
          saveSignature(null);
        }}
      >
        {" "}
        Limpiar firma{" "}
      </button>
      <pre>{error ? <div>La firma es obligatoria</div> : false}</pre>
    </>
  );
};
