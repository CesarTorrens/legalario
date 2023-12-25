"use client";
import { GloboIcon } from "app/Icons/GloboIcon";
import { QRIcon } from "app/Icons/QRIcon";
import { LogoOppo } from "../LogoOppo/LogoOppo";
import styles from "./Header.module.sass";
import { usePathname } from "next/navigation";
import { StepsContext } from "app/context/stepsContext";
import { useContext } from "react";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import QRCode from "react-qr-code";

export const Header = () => {
  const path = usePathname();
  const { value, totalSteps, data, permission } = useContext(StepsContext);
  return (
    <header className={!permission ? styles.Header : styles.HeaderMobile}>
      <LogoOppo />
      <span className={styles.steepsText}>
        {`Paso ${value} de ${totalSteps}`}
      </span>

      <div className={styles.QRInput}>
        <span className={styles.text}>continuar desde el teléfono</span>
        <Dropdown>
          <MenuButton
            sx={{
              background: "#f0f0f0",
              fontWeight: 600,
              gap: "2px",
              alignItems: "center",
            }}
            variant="soft"
          >
            <QRIcon />
            Obtener código QR
          </MenuButton>
          <Menu>
            <MenuItem>
              <QRCode
                value={`http://localhost:3000?pdfValue=${
                  data.pdfValue
                }&signatureValue=${!!data.signatureValue}&checkPolitiesValue=${
                  data.checkPolitiesValue
                }&photoValue=${!!data.photoValue}`}
              />
            </MenuItem>
          </Menu>
        </Dropdown>

        <GloboIcon />
      </div>
    </header>
  );
};
