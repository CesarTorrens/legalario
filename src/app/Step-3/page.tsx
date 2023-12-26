"use client";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./step3.module.sass";
import { StepsContext } from "app/context/stepsContext";
import { useContext } from "react";
import Input from "@mui/joy/Input";

const regex =
  /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
export default function Step3() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sendValue, setSendValue] = useState(true);
  const steps = useContext(StepsContext);

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const validate = () => {
    return !email && regex.test(email);
  };

  const sendDocument = () => {
    setLoading(true);
    setSendValue(false);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };
  const backToHome = (): void => {
    steps.clearData();
  };
  if (!steps.shouldRenderStep3) {
    return null;
  }

  return (
    <main className={styles.Main}>
      {sendValue && (
        <div className={styles.InputContainer}>
          <p>Ingrese su correo para enviar su documento firmado.</p>
          <Input
            error={!validate}
            onChange={handleEmail}
            sx={{
              width: "300px",
            }}
            size="md"
            placeholder="legalario@gmail.com"
          />
          <button
            disabled={!regex.test(email)}
            onClick={sendDocument}
            className={styles.buttonContinue}
          >
            Enviar
          </button>
        </div>
      )}
      {loading && (
        <>
          <CircularProgress color="primary" />
          <p className={styles.title}>Procesando datos biométricos</p>
          <p className={styles.subTitle}>
            Estamos validando la foto de tu INE con la imagen de tu rostro para
            confirmar tu identidad
          </p>
          <div className={styles.ContentBlue}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 14C11.7528 14 11.5111 14.0733 11.3055 14.2107C11.1 14.348 10.9398 14.5432 10.8452 14.7716C10.7505 15.0001 10.7258 15.2514 10.774 15.4939C10.8223 15.7363 10.9413 15.9591 11.1161 16.1339C11.2909 16.3087 11.5137 16.4277 11.7561 16.476C11.9986 16.5242 12.25 16.4995 12.4784 16.4049C12.7068 16.3102 12.902 16.15 13.0393 15.9445C13.1767 15.7389 13.25 15.4972 13.25 15.25C13.25 14.9185 13.1183 14.6005 12.8839 14.3661C12.6495 14.1317 12.3315 14 12 14ZM12 12.5C12.2652 12.5 12.5196 12.3946 12.7071 12.2071C12.8946 12.0196 13 11.7652 13 11.5V8.5C13 8.23478 12.8946 7.98043 12.7071 7.79289C12.5196 7.60536 12.2652 7.5 12 7.5C11.7348 7.5 11.4804 7.60536 11.2929 7.79289C11.1054 7.98043 11 8.23478 11 8.5V11.5C11 11.7652 11.1054 12.0196 11.2929 12.2071C11.4804 12.3946 11.7348 12.5 12 12.5ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51809 6.3459 2.76121 8.17317C2.00433 10.0004 1.8063 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92894 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8079C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C21.9971 9.34874 20.9425 6.80691 19.0678 4.93219C17.1931 3.05746 14.6513 2.00295 12 2ZM12 20C10.4178 20 8.87104 19.5308 7.55544 18.6518C6.23985 17.7727 5.21447 16.5233 4.60897 15.0615C4.00347 13.5997 3.84504 11.9911 4.15372 10.4393C4.4624 8.88743 5.22433 7.46197 6.34315 6.34315C7.46197 5.22433 8.88743 4.4624 10.4393 4.15372C11.9911 3.84504 13.5997 4.00346 15.0615 4.60896C16.5233 5.21447 17.7727 6.23984 18.6518 7.55544C19.5308 8.87103 20 10.4177 20 12C19.9976 14.121 19.1539 16.1544 17.6542 17.6542C16.1544 19.1539 14.121 19.9976 12 20Z"
                fill="#2481FF"
              />
            </svg>

            <div>
              <b>No cierres esta ventana</b>, esto podría tardar unos minutos
              dependiendo de tu conexión a internet
            </div>
          </div>
        </>
      )}
      {!loading && !sendValue && (
        <>
          <svg
            width="42"
            height="42"
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M37.6786 12.7411L16.6786 33.7411C16.5567 33.8631 16.4119 33.9599 16.2526 34.026C16.0933 34.092 15.9225 34.126 15.75 34.126C15.5775 34.126 15.4067 34.092 15.2474 34.026C15.0881 33.9599 14.9433 33.8631 14.8214 33.7411L5.6339 24.5536C5.38763 24.3073 5.24927 23.9733 5.24927 23.625C5.24927 23.2767 5.38763 22.9427 5.6339 22.6964C5.88018 22.4501 6.21421 22.3118 6.5625 22.3118C6.91079 22.3118 7.24481 22.4501 7.49109 22.6964L15.75 30.957L35.8214 10.8839C36.0677 10.6376 36.4017 10.4993 36.75 10.4993C37.0983 10.4993 37.4323 10.6376 37.6786 10.8839C37.9249 11.1302 38.0632 11.4642 38.0632 11.8125C38.0632 12.1608 37.9249 12.4948 37.6786 12.7411Z"
              fill="#24DE9C"
            />
          </svg>

          <p className={styles.title}>Datos procesados correctamente</p>
          <button onClick={backToHome} className={styles.buttonContinue}>
            Firmar otro documento
          </button>
        </>
      )}
    </main>
  );
}
