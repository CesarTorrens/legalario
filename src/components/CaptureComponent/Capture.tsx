"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import styles from "./capture.module.sass";
import { StepsContext } from "app/context/stepsContext";
import { useContext } from "react";

export const Capture = () => {
  const [permission, setPermission] = useState(false);
  const refVideo = useRef<null | HTMLVideoElement>(null);
  const refPicture = useRef<null | HTMLCanvasElement>(null);
  const refPhoto = useRef<null | HTMLImageElement>(null);
  const [srcPhoto, setSrcPhoto] = useState<string>("");
  const steps = useContext(StepsContext);
  const handleSubmit = () => {
    if (srcPhoto) {
      steps.saveData("photoValue", srcPhoto);
    }
  };

  const handlePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
        },
      });
      setPermission(true);
      steps.handlePermission();
      if (refVideo.current) {
        refVideo.current.srcObject = stream;
      }
      if (window.innerWidth <= 1120) {
        steps.handleBgBlue();
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const takePicture = () => {
    const ctx = refPicture.current?.getContext("2d");
    ctx?.drawImage(
      refVideo.current as HTMLVideoElement,
      0,
      0,
      refVideo.current?.videoWidth as number,
      refVideo.current?.videoHeight as number
    );
    const data = refPicture.current?.toDataURL();
    refPhoto.current?.setAttribute("src", data as string);
    setSrcPhoto(data as string);
    if (window.innerWidth <= 1120) {
      steps.handleBgBlue();
    }
  };

  const takeNewPicture = () => {
    setSrcPhoto("");
    if (window.innerWidth <= 1120) {
      steps.handleBgBlue();
    }
  };

  return (
    <section
      style={{
        height: `${
          steps.bgBlue || (srcPhoto && window.innerWidth <= 1120 && "100%")
        }`,
        justifyContent: `${
          steps.bgBlue ||
          (srcPhoto && window.innerWidth <= 1120 && "space-evenly")
        }`,
      }}
      className={!steps.bgBlue ? styles.MainContent : styles.MainContentMobile}
    >
      {!permission && (
        <Image
          src="/images/Rectangle-14940.png"
          width={225}
          height={205}
          alt="Foto de ejemplo"
        />
      )}
      {permission && (
        <p
          style={{ color: `${steps.bgBlue ? "white" : "#1D262C"}` }}
          className={styles.textWithPermission}
        >
          Tómate una selfie
        </p>
      )}
      <div
        style={{
          display: `${permission && !srcPhoto ? "block" : "none"}`,
        }}
        className={styles.videoContainer}
      >
        <video ref={refVideo} src="" id="video" autoPlay />
        <div className={styles.textMobileContainer}>
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

          <span>Ajusta tu cara dentro del área del scanner</span>
        </div>
      </div>
      <div
        style={{
          display: `${permission && srcPhoto ? "block" : "none"}`,
        }}
      >
        <canvas
          width={refVideo.current?.videoWidth}
          height={refVideo.current?.videoHeight}
          style={{
            display: `${!refPicture.current ? "block" : "none"}`,
          }}
          ref={refPicture}
        ></canvas>
        <div
          style={{
            display: `${permission && srcPhoto ? "block" : "none"}`,
          }}
          className={styles.canvasContainer}
        >
          <img ref={refPhoto} src={srcPhoto} alt="foto" />
        </div>
      </div>

      {!permission && (
        <div>
          <p>Ahora tómate una selfie</p>
          <span>
            Muéstranos tu sonrisa para terminar de validar tu identidad
          </span>
        </div>
      )}
      {!permission && (
        <>
          <button onClick={handlePermission} className={styles.buttonContinue}>
            Continuar
          </button>
        </>
      )}
      {permission && !srcPhoto && (
        <>
          {!steps.bgBlue && (
            <button onClick={takePicture} className={styles.buttonContinue}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.875 4.8125H15.4928L14.3215 3.05594C14.2587 2.96188 14.1737 2.88475 14.0741 2.83139C13.9744 2.77802 13.8631 2.75007 13.75 2.75H8.25C8.13693 2.75007 8.02562 2.77802 7.92594 2.83139C7.82625 2.88475 7.74127 2.96188 7.67852 3.05594L6.50633 4.8125H4.125C3.57799 4.8125 3.05339 5.0298 2.66659 5.41659C2.2798 5.80339 2.0625 6.32799 2.0625 6.875V16.5C2.0625 17.047 2.2798 17.5716 2.66659 17.9584C3.05339 18.3452 3.57799 18.5625 4.125 18.5625H17.875C18.422 18.5625 18.9466 18.3452 19.3334 17.9584C19.7202 17.5716 19.9375 17.047 19.9375 16.5V6.875C19.9375 6.32799 19.7202 5.80339 19.3334 5.41659C18.9466 5.0298 18.422 4.8125 17.875 4.8125ZM18.5625 16.5C18.5625 16.6823 18.4901 16.8572 18.3611 16.9861C18.2322 17.1151 18.0573 17.1875 17.875 17.1875H4.125C3.94266 17.1875 3.7678 17.1151 3.63886 16.9861C3.50993 16.8572 3.4375 16.6823 3.4375 16.5V6.875C3.4375 6.69266 3.50993 6.5178 3.63886 6.38886C3.7678 6.25993 3.94266 6.1875 4.125 6.1875H6.875C6.98822 6.18757 7.0997 6.15969 7.19954 6.10632C7.29939 6.05294 7.38451 5.97574 7.44734 5.88156L8.61781 4.125H13.3813L14.5527 5.88156C14.6155 5.97574 14.7006 6.05294 14.8005 6.10632C14.9003 6.15969 15.0118 6.18757 15.125 6.1875H17.875C18.0573 6.1875 18.2322 6.25993 18.3611 6.38886C18.4901 6.5178 18.5625 6.69266 18.5625 6.875V16.5ZM11 7.5625C10.2521 7.5625 9.52107 7.78427 8.89925 8.19976C8.27743 8.61524 7.79277 9.20579 7.50658 9.89673C7.22039 10.5877 7.14551 11.3479 7.29141 12.0814C7.43731 12.8149 7.79743 13.4887 8.32625 14.0175C8.85507 14.5463 9.52882 14.9064 10.2623 15.0523C10.9958 15.1982 11.7561 15.1234 12.447 14.8372C13.138 14.551 13.7285 14.0663 14.144 13.4445C14.5595 12.8227 14.7812 12.0916 14.7812 11.3438C14.7801 10.3412 14.3814 9.38013 13.6725 8.67126C12.9636 7.96238 12.0025 7.56364 11 7.5625ZM11 13.75C10.5241 13.75 10.0589 13.6089 9.66316 13.3445C9.26745 13.0801 8.95904 12.7043 8.77691 12.2646C8.59479 11.8249 8.54714 11.3411 8.63999 10.8743C8.73283 10.4075 8.962 9.97879 9.29852 9.64227C9.63504 9.30575 10.0638 9.07658 10.5306 8.98374C10.9973 8.89089 11.4811 8.93854 11.9208 9.12066C12.3605 9.30279 12.7363 9.6112 13.0007 10.0069C13.2651 10.4026 13.4062 10.8678 13.4062 11.3438C13.4062 11.9819 13.1527 12.594 12.7015 13.0452C12.2502 13.4965 11.6382 13.75 11 13.75Z"
                  fill="white"
                />
              </svg>
              Tomar foto
            </button>
          )}
          {steps.bgBlue && (
            <div className={styles.ContainerCircleButton}>
              <button onClick={takePicture}></button>
            </div>
          )}
        </>
      )}
      {srcPhoto && (
        <div className={styles.newPicturesButtons}>
          <button onClick={takeNewPicture} className={styles.ButtonBack}>
            <svg
              width="23"
              height="22"
              viewBox="0 0 23 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.0625 8.9375H3.9375C3.75516 8.9375 3.5803 8.86507 3.45136 8.73614C3.32243 8.6072 3.25 8.43234 3.25 8.25V4.125C3.25 3.94266 3.32243 3.7678 3.45136 3.63886C3.5803 3.50993 3.75516 3.4375 3.9375 3.4375C4.11984 3.4375 4.2947 3.50993 4.42364 3.63886C4.55257 3.7678 4.625 3.94266 4.625 4.125V6.17461C5.95445 4.675 8.2868 2.75 11.5 2.75C15.1798 2.75 17.3936 4.92164 17.4864 5.01359C17.6156 5.14237 17.6884 5.31721 17.6887 5.49964C17.6891 5.68208 17.6169 5.85718 17.4881 5.98641C17.3593 6.11564 17.1845 6.18842 17.0021 6.18874C16.8196 6.18906 16.6445 6.1169 16.5153 5.98813C16.4921 5.96492 14.5869 4.125 11.5 4.125C8.49219 4.125 6.32398 6.24336 5.26437 7.5625H8.0625C8.24484 7.5625 8.4197 7.63493 8.54864 7.76386C8.67757 7.8928 8.75 8.06766 8.75 8.25C8.75 8.43234 8.67757 8.6072 8.54864 8.73614C8.4197 8.86507 8.24484 8.9375 8.0625 8.9375ZM19.0625 13.0625H14.9375C14.7552 13.0625 14.5803 13.1349 14.4514 13.2639C14.3224 13.3928 14.25 13.5677 14.25 13.75C14.25 13.9323 14.3224 14.1072 14.4514 14.2361C14.5803 14.3651 14.7552 14.4375 14.9375 14.4375H17.7356C16.676 15.7566 14.5078 17.875 11.5 17.875C8.41313 17.875 6.50789 16.0351 6.48469 16.0119C6.35546 15.8831 6.18036 15.8109 5.99793 15.8113C5.81549 15.8116 5.64065 15.8844 5.51187 16.0136C5.3831 16.1428 5.31094 16.3179 5.31126 16.5004C5.31158 16.6828 5.38436 16.8576 5.51359 16.9864C5.60641 17.0784 7.82016 19.25 11.5 19.25C14.7132 19.25 17.0455 17.325 18.375 15.8254V17.875C18.375 18.0573 18.4474 18.2322 18.5764 18.3611C18.7053 18.4901 18.8802 18.5625 19.0625 18.5625C19.2448 18.5625 19.4197 18.4901 19.5486 18.3611C19.6776 18.2322 19.75 18.0573 19.75 17.875V13.75C19.75 13.5677 19.6776 13.3928 19.5486 13.2639C19.4197 13.1349 19.2448 13.0625 19.0625 13.0625Z"
                fill="#2481FF"
              />
            </svg>
            Volver a tomar
          </button>
          <button onClick={handleSubmit} className={styles.buttonContinue}>
            Continuar
          </button>
        </div>
      )}
    </section>
  );
};
