import axios from "axios";
import localStorage from "local-storage";
import styles from "../../../styles/ProfileCard.module.css";

import React, { useEffect, useState } from "react";
import { RecordWebcam, useRecordWebcam } from "react-record-webcam";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { ToastContainer, toast } from "react-toastify";
// import { Api } from "../../config/Config";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const OPTIONS = {
  fileName: "test-filename",
  mimeType: "video/mp4",
  width: 480,
  height: 390,
  disableLogs: true,
  audio: true,
};
const MAX_RECORDING_DURATION = 30 * 1000; //30 Sec

const ArtistOrderCompleting = ({ order_id }) => {
  const [cameraOpened, setCameraOpened] = useState(false); // State variable to track camera state
  const [recordingTimeout, setRecordingTimeOut] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const recordWebcam = useRecordWebcam(OPTIONS);
  const router = useRouter(); // Initialize useRouter

  // useEffect ka use karke component load hone par camera ko khud ba-khud open karein
  useEffect(() => {
    if (!cameraOpened) {
      recordWebcam.open();
      setCameraOpened(true);
    }
  }, []);
  // console.log(order_id);/
  const handleOnCloseClick = () => {
    recordWebcam.close();
    // router.push("/artist_recording");
    setCameraOpened(false);
    window.location.reload();
  };
  const startRecording = () => {
    recordWebcam.start();
    const timeoutId = setTimeout(() => {
      recordWebcam.stop();
    }, MAX_RECORDING_DURATION);
    setRecordingTimeOut(timeoutId);
  };
  const stopRecording = () => {
    recordWebcam.stop();
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
    }
  };

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const getRecordingFile = async () => {
    const blob = await recordWebcam.getRecording();
    // console.log(blob);
    setIsLoading(true);

    const file = new File([blob], "Testing file.mp4", { type: "video/mp4" });
    try {
      const formData = new FormData();
      formData.append("order_id", order_id);
      formData.append("video", file);
      // console.log(formData);
      axios
        .post(
          // Api?.ORDER_COMPLETE,
          `${baseURL}/api/artist/order-complete`,

          formData,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.get("loginAuth")?.authorisation?.token,
            },
          }
        )
        .then((response) => {
          if (response?.data?.status === true) {
            toast.success(response?.data?.message);
            router.push({
              pathname: "/artist_dashboard",
            });
          }
          if (response?.data?.status === false) {
            toast.warn(response?.data?.message);
          }
          // {
          //   console.log(response);
          // }
          // toast.success("Video uploaded successfully!");
          // router.push({
          //   pathname: "/artist_service_charges",
          // });
        })
        .catch((error) => {
          toast.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      toast.error("Failed to upload video.");
    }
  };

  return (
    <div>
      <ToastContainer className="tost" />

      <div>
        <>
          {recordWebcam.status === "OPEN" && (
            <>
              <button
                onClick={handleOnCloseClick} // Call handleOnCloseClick function on button click
                style={{
                  display: recordWebcam.status === "CLOSED" ? "none" : "block",
                }}
              >
                Close camera
              </button>
              <button
                // onClick={recordWebcam.start}
                onClick={startRecording}
                style={{
                  display:
                    recordWebcam.status === "CLOSED" ||
                    recordWebcam.status === "RECORDING" ||
                    recordWebcam.status === "PREVIEW"
                      ? "none"
                      : "block",
                }}
              >
                Start recording
              </button>
            </>
          )}
          {recordWebcam.status === "CLOSED" && (
            <>
              <button
                onClick={recordWebcam.open}
                style={{
                  display:
                    recordWebcam.status === "OPEN" ||
                    recordWebcam.status === "RECORDING" ||
                    recordWebcam.status === "PREVIEW"
                      ? "none"
                      : "block",
                }}
              >
                Open camera
              </button>
            </>
          )}
          {recordWebcam.status === "RECORDING" && (
            <>
              <button
                // onClick={recordWebcam.stop}
                onClick={stopRecording}
                style={{
                  display:
                    recordWebcam.status !== "RECORDING" ? "none" : "block",
                }}
              >
                Stop recording
              </button>
            </>
          )}
          {recordWebcam.status === "PREVIEW" && (
            <>
              <button
                disabled={recordWebcam.status !== "PREVIEW"}
                onClick={recordWebcam.retake}
              >
                Retake
              </button>
              <button
                onClick={recordWebcam.download}
                style={{
                  display: recordWebcam.status !== "PREVIEW" ? "none" : "block",
                }}
              >
                Download
              </button>
              <button
                onClick={getRecordingFile}
                style={{
                  display: recordWebcam.status !== "PREVIEW" ? "none" : "block",
                }}
              >
                {/* Upload */}
                {isLoading ? "Loading..." : "Upload"}
              </button>
            </>
          )}
        </>
      </div>
      <video
        ref={recordWebcam.webcamRef}
        className={styles.Order_CompleteVideo_Record_Video}
        style={{
          // borderBottomLeftRadius: "10px",
          // borderBottomRightRadius: "10px",
          display: `${
            recordWebcam.status === "OPEN" ||
            recordWebcam.status === "RECORDING"
              ? "block"
              : "none"
          }`,
        }}
        autoPlay
      />
      <video
        ref={recordWebcam.previewRef}
        className={styles.Order_CompleteVideo_Record_Video_width_height}
        style={{
          // borderBottomLeftRadius: "10px",
          // borderBottomRightRadius: "10px",
          // width: 480,
          // height: 390,
          display: `${recordWebcam.status === "PREVIEW" ? "block" : "none"}`,
        }}
        autoPlay
        controls
        // loop
      />
    </div>
  );
};
export default ArtistOrderCompleting;
