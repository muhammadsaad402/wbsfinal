import Head from "next/head";
import styles from "../styles/ArtistProfileDetails.module.css";
import React from "react";
import Image from "next/image";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { width } from "@mui/system";
import ThankYouBox from "../src/components/thankyouBox/ThankYouBox";

function artist_profile_details_thankyou() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div
          className={styles.artist_profile_details_thankyou_width_100}
          // style={{
          //   width: "90%",
          //   height: 1,
          //   backgroundColor: "#fff",
          //   margin: "auto",
          // }}
        ></div>

        <div
          // style={{
          //   height: 100,
          // }}
          className={styles.artist_profile_details_thankyou_height}
        ></div>

        <h1
          className={styles.artist_profile_details_thankyou_heading_h1}
          // style={{
          //   color: "#CEA234",
          //   textAlign: "center",
          //   fontWeight: "bold",
          //   fontSize: 52,
          // }}
        >
          {" YOU'RE READY TO ROLL"}
        </h1>

        <p
          className={styles.artist_profile_details_thankyou_paragraph}
          // style={{
          //   color: "#fff",
          //   textAlign: "center",
          //   fontSize: 20,
          // }}
        >
          Your request has been placed
        </p>

        <ThankYouBox />
      </div>
      <Footer />
    </>
  );
}
export default artist_profile_details_thankyou;
