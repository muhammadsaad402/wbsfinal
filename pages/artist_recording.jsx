/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/ArtistRecording.module.css";
import Image from "next/image";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import dynamic from "next/dynamic";
import CircleIcon from "@mui/icons-material/Circle";
import { Select } from "@mui/material";
import SelectDropDown from "../src/higherComponents/SelectDropDown";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/router";
import { display, padding } from "@mui/system";
import KnowMoreAboutRecording from "../src/components/Artist Dashboard/KnowMoreAboutRecording";
import VideoUploader from "../src/components/VideoUpload";
import localStorage from "local-storage";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

function artist_recording() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [open, isOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFilePicked, setIsFilePicked] = useState(false);
  const [click, setOnclick] = useState(false);
  const [videoData, setVideoData] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const Recorder = dynamic(
    () => import("../src/components/reactRecorder/ReactRecorder"),
    {
      ssr: false,
    }
  );
  useEffect(() => {
    getArtistData();
  }, []);
  const [webcam, setWebcam] = useState();
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const handleSubmission = async (event) => {
    setOnclick(true);
    const data = reactLocalStorage.getObject("loginAuth");
    const token = data?.authorisation?.token;
    const user_id = data?.user?.id;
    const artistdata = reactLocalStorage.getObject("isArtist");
    const artistId = artistdata?.data?.id;

    event.preventDefault();
    const formData = new FormData();
    formData.append("video_file", selectedFile);
    formData.append("atrist_id", artistId);
    try {
      const response = await axios({
        method: "post",

        url:
          process.env.NEXT_PUBLIC_BASE_URL + "/api/artist/first_video_record",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer  ${token}`,
        },
      });
      if (response?.data?.status === true) {
        if (data !== "" && data?.user?.user_type === "user") {
          router.push("/artist_service_charges");
        } else if (data !== "" && data?.user?.user_type === "artist") {
          toast.warn(
            `${response?.data?.message}, Please login again to see your changes`
          );
          router.push("/");
        }
      } else {
        toast.success(response?.data?.message);
        setOnclick(false);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.video_file
          ? error?.response?.data?.errors?.video_file[0]
          : `${error?.response?.data?.message} please login again`
      );
      setOnclick(false);
    }
  };

  const getArtistData = async () => {
    const data = reactLocalStorage.getObject("loginAuth");
    const artistdata = reactLocalStorage.getObject("isArtist");
    const artistId = artistdata?.data?.id;
    const token = data?.authorisation?.token;
    const userId = data?.user?.id;
    await axios
      .get(
        // `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?artist_id=${artistId}`,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?user_id=${userId}&artist_id=${artistId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        setVideoData(response?.data?.data?.videos);
      })
      // .catch(function (error) {});
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // alert("token expire");
          toast.error("Unauthorized");
          reactLocalStorage?.remove("loginAuth");
          router.push("/login");
        } else {
          console.error("Error: ", error);
        }
      });
  };
  const deleteArtistData = async (id) => {
    const data = reactLocalStorage.getObject("loginAuth");
    const token = data?.authorisation?.token;
    await axios
      .get(
        // `https://dev7.sidat.digital/wbs/api/artist/video-delete/${id}`
        process.env.NEXT_PUBLIC_BASE_URL + "api/artist/video-delete/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        toast.success(response?.data?.message);
        setVideoData((prevVideoData) =>
          prevVideoData.filter((item) => item.id !== id)
        );
      })
      .catch(function (error) {});
  };
  const handleClick = () => {
    isOpen(!open);
  };

  //video uploading function start
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [videoSize, setVideoSize] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024);
      setVideoSize(`${fileSizeInMB.toFixed(2)} MB`);
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        const duration = videoElement.duration;
        if (duration > 32) {
          toast.warn("Video should be less than 30 seconds.");
          setVideoFile(null);
          setVideoPreview(null);
          setVideoSize("");
          setVideoDuration("");
        } else {
          setVideoDuration(`${duration.toFixed(2)} seconds`);
        }
      };
    }
  };
  const handleFileUpload = async () => {
    const artistdata = reactLocalStorage.getObject("isArtist");
    const artistId = artistdata?.data?.id;
    if (videoFile) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("video_file", videoFile);
        formData.append("artist_id", artistId);

        // console.log(videoFile);
        axios
          .post(
            // "https://dev7.sidat.digital/wbs/api/artist/first_video_record"
            process.env.NEXT_PUBLIC_BASE_URL + "/api/artist/first_video_record",
            formData,
            {
              headers: {
                Authorization:
                  "Bearer " +
                  localStorage.get("loginAuth")?.authorisation?.token,
              },
            }
          )
          .then((response) => {
            // toast.success("Video uploaded successfully!");
            if (response?.data?.status === true) {
              toast.success(response?.data?.message);
              // window.location.reload();
              router.push({
                pathname: "/artist_service_charges",
              });
            }
            if (response?.data?.status === false) {
              toast.warn(response?.data?.message);
            }
          })
          .catch((error) => {
            toast.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });

        // toast.success("Video uploaded successfully!");
        // setVideoFile(null);
        // setVideoPreview('');
        // setVideoSize('');
        // setVideoDuration('');
      } catch (error) {
        toast.error("Failed to upload video.");
      }
    }
  };

  const handleDeletePreview = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setVideoSize("");
    setVideoDuration("");
  };
  //video uploading function ends

  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };
  // const sortedVideoData = Array.isArray(videoData)
  //   ? videoData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  //   : [];

  const toggleVideoStatus = async (videoItem) => {
    const data = reactLocalStorage.getObject("loginAuth");
    const token = data?.authorisation?.token;

    try {
      const response = await axios.post(
        // Your API endpoint to toggle video status
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-video-active`,
        {
          video_id: videoItem.id,
          artist_id: videoItem.artist_id,
          is_active: videoItem.is_active === 1 ? 0 : 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.status === true) {
        // Update the local state to reflect the changed is_active value
        setVideoData((prevVideoData) =>
          prevVideoData.map((item) =>
            item.id === videoItem.id
              ? { ...item, is_active: videoItem.is_active === 1 ? 0 : 1 }
              : item
          )
        );
        window.location.reload();
        toast.success(response?.data?.message);
      } else {
        toast.warn(response?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Topbar />
        <ToastContainer className="tost" />
        {/* 
        <div
          className={styles.artist_recording_width_90}
          // style={{
          //   width: "90%",
          //   height: 1,
          //   backgroundColor: "#fff",
          //   // margin: "auto",
          // }}
        ></div> */}

        <h1
          className={styles.artist_recording_heading_h1}

          // style={{
          //   color: "#CEA234",
          //   textAlign: "center",
          //   fontWeight: "bold",
          //   fontSize: 52,
          // }}
        >
          RECORD YOUR FIRST SHOUTOUT
        </h1>

        <div
          className={styles.artist_recording_width_70}
          // style={{
          //   width: "70%",
          //   // height: 1200,
          //   backgroundColor: "#1B1B1B",
          //   // margin: "auto",
          //   display: "flex",
          //   alignItems: "center",
          //   flexDirection: "column",
          // }}
        >
          <div
            className={
              styles.artist_recording_width_75_marginleft_paddingtop_40
            }
            // style={{ width: "75%", marginLeft: 50, paddingTop: 40 }}
          >
            <h2
              className={styles.artist_recording_heading_color}
              // style={{ color: "white" }}
            >
              Instructions For Recording
            </h2>

            <p
              className={styles.artist_recording_color_fontsize_paragraph}
              // style={{ color: "white", fontSize: 18, lineHeight: 1.5 }}
            >
              Creating exciting content for our customers is our passion. Your
              enthusiasm and energy can brighten their day, forging a lasting
              connection that keeps them coming back for more. Let's inspire,
              entertain, and make every moment memorable!
            </p>
          </div>

          <div
            className={styles.artist_recording_width_80}
            style={
              {
                // width: "80%",
                // height: 494,
                // display: "flex",
                // flexDirection: "row",
                // justifyContent: "space-between",
                // alignItems: "center",
              }
            }
          >
            <div
              className={styles.artist_recording_width_47}
              // style={{
              //   width: "47%",
              //   height: "100%",
              //   borderStyle: "solid",
              //   borderWidth: "1px",
              //   borderColor: "#707070",
              //   borderRadius: 10,
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   flexDirection: "column",
              // }}
            >
              {open ? (
                <Recorder />
              ) : (
                <div
                  className={styles.artist_recording_height_100}
                  // style={{
                  //   height: "100%",
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   justifyContent: "space-around",
                  // }}
                >
                  <Image
                    src={require("../src/Asset/Images/videoRecorder.png")}
                    alt="Picture of the author"
                    width={"100%"}
                    height={"100%"}
                    // style={{ margin: "2%" }}
                  />
                  <button
                    className={styles.artist_recording_button_rec}
                    onClick={handleClick}
                    // style={{
                    //   // position: "absolute",
                    //   // bottom: 0,
                    //   width: 140,
                    //   height: 60,
                    //   cursor: "pointer",
                    //   borderRadius: 30,
                    //   display: "flex",
                    //   flexDirection: "row",
                    //   justifyContent: "space-around",
                    //   alignItems: "center",
                    //   backgroundColor: "transparent",
                    //   color: "red",
                    //   borderStyle: "solid",
                    //   borderColor: "red",
                    //   fontSize: 20,
                    // }}
                  >
                    REC
                    <CircleIcon />
                  </button>
                </div>
              )}
            </div>
            <div
              className={styles.artist_recording_width_47_height_100}
              // style={{ width: "47%", height: "100%" }}
            >
              <div
                className={
                  styles.artist_recording_margintop_40_disply_flexDirection
                }
                // style={{
                //   marginTop: 40,
                //   display: "flex",
                //   flexDirection: "column",
                // }}
              >
                <SelectDropDown />
                <FormGroup>
                  <FormControlLabel
                    className={styles.artist_recording_formControlLabel}
                    // style={{
                    //   color: "white",
                    //   fontSize: 20,
                    //   width: "40%",
                    //   marginBottom: "30px",
                    // }}
                    control={
                      <Checkbox
                        labelStyle={{ color: "#CEA234" }}
                        iconStyle={{ fill: "#CEA234" }}
                        inputStyle={{ color: "#CEA234" }}
                        style={{ color: "#CEA234" }}
                        defaultChecked
                      />
                    }
                    label="Cam + Audio"
                  />
                  {/* <FormControlLabel
                    style={{ color: "white", fontSize: 20 }}
                    control={
                      <Checkbox
                        labelStyle={{ color: "#fff" }}
                        iconStyle={{ fill: "#fff" }}
                        inputStyle={{ color: "#fff" }}
                        style={{ color: "#fff" }}
                        defaultChecked
                      />
                    }
                    label="Audio only "
                  /> */}
                </FormGroup>

                {/* <label
                  htmlFor="videoInput"
                  style={{
                    // width: 350,
                    height: 50,
                    borderRadius: 30,
                    alignItems: "center",
                    backgroundColor: "#CEA234",
                    color: "#000",
                    fontSize: 20,
                    marginTop: 10,
                    cursor: "pointer",
                    padding: "10px",
                    marginBottom: "30px",
                  }}
                >
                  Or Upload Mp4 video of 30 sec
                </label>
                <input
                  id="videoInput"
                  // type="file"
                  // onChange={changeHandler}
                  accept="video/*"
                  onChange={handleFileInputChange}
                  style={{
                    display: "none",
                  }}
                /> */}

                {/* {isLoading && <p>Loading...</p>} */}
                {videoPreview === null && (
                  <label
                    name="video"
                    className={styles.artist_recording_height_50_input}
                  >
                    Upload Video
                    <input
                      name="video"
                      style={{ display: "none" }}
                      type="file"
                      accept="video/*"
                      onChange={handleFileInputChange}
                      className={styles.artist_recording_height_50_input}
                      // style={{
                      //   // width: 350,
                      //   height: 50,
                      //   borderRadius: 30,
                      //   alignItems: "center",
                      //   backgroundColor: "#CEA234",
                      //   color: "#000",
                      //   fontSize: 20,
                      //   marginTop: 10,
                      //   cursor: "pointer",
                      //   padding: "10px",
                      //   marginBottom: "30px",
                      // }}
                    />
                  </label>
                )}
                {/* <input type="file" accept="video/*" onChange={handleFileInputChange} style={{
                  // width: 350,
                  height: 50,
                  borderRadius: 30,
                  alignItems: "center",
                  backgroundColor: "#CEA234",
                  color: "#000",
                  fontSize: 20,
                  marginTop: 10,
                  cursor: "pointer",
                  padding: "10px",
                  marginBottom: "30px",
                }} /> */}
                <Box
                  sx={{
                    display: click ? "flex" : "none",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
                {videoPreview && (
                  <>
                    <button
                      className={styles.artist_recording_button_upload}
                      style={{
                        // width: 350,
                        // height: 50,
                        // borderRadius: 30,
                        // alignItems: "center",
                        // backgroundColor: "#CEA234",
                        // color: "#000",
                        // cursor: "pointer",
                        // fontSize: 20,
                        // marginTop: 10,
                        display: click ? "none" : "",
                      }}
                      // onClick={handleSubmission}
                      onClick={handleFileUpload}
                    >
                      {/* Upload */}
                      {isLoading ? "Loading..." : "Upload"}
                    </button>

                    <button
                      className={styles.artist_recording_button_upload}
                      style={{
                        // width: 350,
                        // height: 50,
                        // borderRadius: 30,
                        // alignItems: "center",
                        // backgroundColor: "#CEA234",
                        // color: "#000",
                        // cursor: "pointer",
                        // fontSize: 20,
                        // marginTop: 10,
                        display: click ? "none" : "",
                      }}
                      // onClick={handleSubmission}
                      onClick={handleDeletePreview}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* video uplaod start */}
          <div>
            {videoPreview && (
              <>
                <div className={styles.video_parent}>
                  <video
                    ref={videoRef}
                    controls={false}
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    style={{
                      borderRadius: "10px",
                      boxShadow: "revert",
                    }}
                    src={videoPreview}
                  />
                  <button className={styles.play_button} onClick={togglePlay}>
                    {playing ? (
                      <PauseIcon className={styles.icon} />
                    ) : (
                      <PlayArrowIcon className={styles.icon} />
                    )}
                  </button>
                </div>
                <p style={{ color: "#fff", textAlign: "center" }}>
                  Size: {videoSize}
                </p>
                <p style={{ color: "#fff", textAlign: "center" }}>
                  Duration: {videoDuration}
                </p>
              </>
            )}
          </div>
          {/* webcam */}
          {/* video upload end */}
          <div
            className={styles.artist_recording_width_heigt_100}
            // style={{
            //   backgroundColor: "transparent",
            //   width: "100%",
            //   height: "100%",
            //   // marginBottom: "auto",
            //   padding: 10,
            //   flexDirection: "row",
            //   display: "flex",
            //   justifyContent: "space-evenly",
            // }}
          >
            {/* {sortedVideoData &&
              sortedVideoData?.map((item) => ( */}

            {videoData &&
              videoData?.map((item) => (
                <div
                  className={styles.artist_recording_video_data_width_height}
                  // style={{
                  //   display: "flex",
                  //   flexDirection: "column",
                  //   width: 300,
                  //   height: 500,
                  // }}
                >
                  <video controls width={300} height={500}>
                    <source
                      // src={`https://dev7.sidat.digital/wbs/${item?.video_url}`}
                      src={`${baseURL}/${item?.video_url}`}
                      // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                      type="video/mp4"
                    />
                  </video>
                  {/* Button to toggle is_active property */}
                  <button
                    className={styles.artist_recording_height_50_input}
                    onClick={() => toggleVideoStatus(item)}
                  >
                    {item.is_active === 1 ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    className={styles.artist_recording_height_50_input}
                    // className={styles.artist_recording_button_delete}
                    // style={{ marginTop: 20 }}
                    onClick={() => {
                      deleteArtistData(item?.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>

        <KnowMoreAboutRecording />
      </div>
      <Footer />
    </>
  );
}
export default artist_recording;
