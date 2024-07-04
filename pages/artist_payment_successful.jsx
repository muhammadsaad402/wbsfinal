import Head from "next/head";
import styles from "../styles/ArtistPaymentSuccessful.module.css";
import React from "react";

import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { width } from "@mui/system";
import ThankYouBox from "../src/components/thankyouBox/ThankYouBox";
import PaymentSuccessfulBox from "../src/components/thankyouBox/PaymentSuccessfulBox";

function artist_payment_successful() {
  return (
    <div className={styles.container}>
      <Topbar />

      <h1 className={styles.artist_payment_successful_heading_h1}>
        {"YOUR'RE REQUEST FOR TRANSACTION IS SUBMITED"}
      </h1>

      <PaymentSuccessfulBox></PaymentSuccessfulBox>
      <Footer />
    </div>
  );
}
export default artist_payment_successful;
