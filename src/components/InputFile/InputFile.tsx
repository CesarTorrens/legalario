import * as React from "react";
import Button from "@mui/joy/Button";
import SvgIcon from "@mui/joy/SvgIcon";
import { styled } from "@mui/joy";
import { StepsContext } from "app/context/stepsContext";
import { useContext } from "react";

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export function InputFile() {
  const steps = useContext(StepsContext);

  const [pdf, setPdf] = React.useState<string | null>();

  const uploadPdf = (e: any) => {
    if (e.target.files[0].type !== "application/pdf") {
      alert("Debe ingresar un archivo PDF");
      return;
    }
    if (e.target.files[0]) {
      const pdfData = e.target.files[0];
      const url = URL.createObjectURL(pdfData);
      setPdf(url);
    }
  };
  React.useEffect(() => {
    steps.saveData("pdfValue", pdf);
  }, [pdf]);
  return (
    <Button
      sx={{
        background: "#2481FF",
        color: "white",
        fontSize: "16px",
        margin: "0 auto",
        "&:hover": {
          background: "#2481FF",
          opacity: "0.8",
        },
      }}
      component="label"
      tabIndex={-1}
      variant="outlined"
      startDecorator={
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </SvgIcon>
      }
    >
      Carga un documento
      <VisuallyHiddenInput onChange={uploadPdf} type="file" />
    </Button>
  );
}
