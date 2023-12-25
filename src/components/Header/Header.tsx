"use client";
import { GloboIcon } from "app/Icons/GloboIcon";
import { QRIcon } from "app/Icons/QRIcon";
import { LogoOppo } from "../LogoOppo/LogoOppo";
import styles from "./Header.module.sass";
// import { useMobile } from "app/hooks/useMobile";
import { usePathname } from "next/navigation";
import { StepsContext } from "app/context/stepsContext";
import { useContext } from "react";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import QRCode from "react-qr-code";

export const Header = () => {
  // const { width, height } = useMobile();
  const path = usePathname();
  const steps = useContext(StepsContext);
  return (
    <header
      // style={{
      //   background: `${path !== "/" && width <= 1120 ? "#0E1C32" : ""}`,
      // }}
      className={styles.Header}
    >
      <LogoOppo />
      <span className={styles.steepsText}>
        {`${steps.value} de ${steps.totalSteps}`}
      </span>

      <div>
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
              <QRCode value="http://192.168.11.2:3000/" />
            </MenuItem>
          </Menu>
        </Dropdown>

        <GloboIcon />
      </div>
    </header>
  );
};
