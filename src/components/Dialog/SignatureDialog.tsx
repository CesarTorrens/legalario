import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AlertDialog.module.sass";
import { useContext, useState } from "react";
import { StepsContext } from "app/context/stepsContext";
import { DigitalSignature } from "../DigitalSignature/DigitalSignature";

export const SignatureDialog = (props: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { open, handleClose } = props;
  const [signature, setSignature] = useState("");
  const steps = useContext(StepsContext);

  const handleSubmit = () => {
    steps.saveData("signatureValue", signature);
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <div className={styles.ContainerCard}>
          <div className={styles.Header}>
            <div className={styles.HeaderTexts}>
              <p>Escriba su firma.</p>
            </div>
            <button onClick={handleClose}>
              <CloseIcon />
            </button>
          </div>
          <DialogContent>
            <DigitalSignature setSignature={setSignature} />
          </DialogContent>

          <DialogActions className={styles.containerButtons}>
            <button
              disabled={!signature}
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
