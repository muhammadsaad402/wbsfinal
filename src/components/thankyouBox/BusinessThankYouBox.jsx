import Head from "next/head";
// import styles from "../../../styles/Footer.module.css";
import styles from "../../../styles/BusinessThankYouBox.module.css";

import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { width } from "@mui/system";
function BusinessThankYouBox(isPayment) {
  const rootRef = React.useRef(null);
  return (
    <Box
      className={styles.BusinessThankBox}
      // style={{
      //   width: "40%",
      //   justifyContent: "center",
      //   margin: "auto",
      //   display: "flex",
      //   alignItems: "center",
      // }}
      sx={{
        height: 440,
        flexGrow: 1,
        minWidth: 500,
        transform: "translateZ(0)",
        backgroundColor: "#1B1B1B",
        borderRadius: 2,
        // The position fixed scoping doesn't work in IE11.
        // Disable this demo to preserve the others.
        "@media all and (-ms-high-contrast: none)": {
          display: "none",
        },
      }}
      ref={rootRef}
    >
      <Box
        sx={{
          height: 380,
          position: "relative",
          width: 650,
          border: "2px solid #CEA234",
          borderRadius: 2,
          boxShadow: (theme) => theme.shadows[5],
          p: 4,
        }}
        className={styles.BusinessThankBoxFlex}
        // style={{
        //   justifyContent: "center",
        //   display: "flex",
        //   alignItems: "center",
        //   textAlign: "center",
        //   flexDirection: "column",
        // }}
      >
        <h1
        // style={{
        //   fontSize: 35,
        //   color: "white",
        // }}
        >
          Thank You For Your Contribution
        </h1>
        <p
        // style={{
        //   fontSize: 20,
        //   color: "white",
        // }}
        >
          Your submission has been received.<br></br>
          Our team will get back in touch with you soon.
        </p>
        <button
          className={styles.BusinessThankBoxButton}
          // style={{
          //   width: 280,
          //   height: 50,
          //   borderRadius: 30,
          //   alignItems: "center",
          //   backgroundColor: "#CEA234",
          //   color: "#000",
          //   fontSize: 20,
          //   marginTop: 40,
          // }}
        >
          Talk to an expert
        </button>
      </Box>
    </Box>
  );
}
export default BusinessThankYouBox;
