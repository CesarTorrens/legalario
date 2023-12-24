import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AlertDialog.module.sass";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { StepsContext } from "app/context/stepsContext";

export const AlertDialog = (props: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { open, handleClose } = props;
  const router = useRouter();
  const [politiesCheck, setPolitiesCheck] = React.useState(false);
  const steps = useContext(StepsContext);

  const handleSubmit = () => {
    if (politiesCheck) {
      steps.handleCount();
      router.push("/Step-2");
    }
  };
  const handleCheck = (e) => {
    setPolitiesCheck(e.target.checked);
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <div className={styles.ContainerCard}>
          <div className={styles.Header}>
            <div className={styles.HeaderTexts}>
              <p>Antes de firmar,</p>
              <span>Declaración de consentimiento</span>
            </div>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          <DialogContent>
            <div>
              <div className={styles.Step}>
                <div className={styles.textNumber}>
                  <span>1</span>
                </div>
                <span className={styles.text}>
                  Consiento de manera exspanresa e informada la <br />{" "}
                  recolección de:
                </span>
              </div>
              <div className={styles.Documents}>
                <div className={styles.DocumentsChecked}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.64391 13.4687L4.75225 10.5771C4.42725 10.2521 3.90225 10.2521 3.57725 10.5771C3.25225 10.9021 3.25225 11.4271 3.57725 11.7521L7.06058 15.2354C7.38558 15.5604 7.91058 15.5604 8.23558 15.2354L17.0522 6.41875C17.3772 6.09375 17.3772 5.56875 17.0522 5.24375C16.7272 4.91875 16.2022 4.91875 15.8772 5.24375L7.64391 13.4687Z"
                      fill="#24DE9C"
                    />
                  </svg>
                  <span>Mi identificación oficial</span>
                </div>
                <div className={styles.DocumentsChecked}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.64391 13.4687L4.75225 10.5771C4.42725 10.2521 3.90225 10.2521 3.57725 10.5771C3.25225 10.9021 3.25225 11.4271 3.57725 11.7521L7.06058 15.2354C7.38558 15.5604 7.91058 15.5604 8.23558 15.2354L17.0522 6.41875C17.3772 6.09375 17.3772 5.56875 17.0522 5.24375C16.7272 4.91875 16.2022 4.91875 15.8772 5.24375L7.64391 13.4687Z"
                      fill="#24DE9C"
                    />
                  </svg>
                  <span>Una imagen o fotografía de mi rostro</span>
                </div>
              </div>
            </div>
            <div className={styles.Step}>
              <div className={styles.textNumber}>
                <span>2</span>
              </div>
              <span className={styles.text}>
                Confirmo que soy el titular de dichos datos personales sensibles
                conforme a lo que establece la legislación aplicable
              </span>
            </div>
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
                Estas medidas se toman para{" "}
                <b>autenticar y verificar su identidad</b> para la firma
                electrónica de este y futuros actos jurídicos
              </div>
            </div>
            <div className={styles.Polities}>
              <input onChange={handleCheck} id="check" type="checkbox" />
              <label htmlFor="check">
                He leído el Aviso de Privacidad Integral y manifiesto mi
                consentimiento.
              </label>
            </div>
          </DialogContent>

          <DialogActions className={styles.containerButtons}>
            <button className={styles.buttonBack} onClick={handleClose}>
              Regresar
            </button>
            <button
              disabled={!politiesCheck}
              className={styles.buttonContinue}
              onClick={handleSubmit}
            >
              Continuar
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
