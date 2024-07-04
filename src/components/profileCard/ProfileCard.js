import Head from "next/head";
import styles from "../../../styles/ProfileCard.module.css";
import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { height } from "@mui/system";
function ProfileCard(imgUrl) {
  return (
    <div
      className={styles.profile_card_width}
      // style={{
      //   width: 467,
      //   height: 136,
      //   borderRadius: 10,
      //   borderColor: "white",
      //   borderStyle: "solid",
      //   borderColor: "#CEA234",
      //   borderWidth: "2px",
      // }}
    >
      <div
        className={styles.profile_card_display_flex_driection}
        // style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <div
          className={styles.profile_card_width_82_height_112}
          // style={{ width: 82, height: 112 }}
        >
          <Image
            src={require("../../Asset/Images/user_profile/user1.png")}
            alt="Picture of the author"
            // width={"100%"}
            // height={"100%"}
            // style={{ margin: "2%" }}
          />
        </div>
        <div
          className={styles.profile_card_width_91_height_margin_20}
          // style={{ width: 91, height: 47, margin: 20 }}
        >
          <p
            className={styles.profile_card_paragraph_size}
            // style={{ fontSize: 16, color: "white" }}
          >
            For Myself
            <br />
            08-09-22
          </p>
        </div>

        <div
          className={styles.profile_card_width_91_height_margin_20_marginleft}

          // style={{
          //   width: 91,
          //   height: 47,
          //   margin: 20,
          //   marginLeft: "auto",
          //   alignItems: "center",
          // }}
        >
          <p
            className={styles.profile_card_paragraph_size}

            // style={{ fontSize: 16, color: "white" }}
          >
            Track Order
          </p>
        </div>
      </div>
    </div>
  );
}
export default ProfileCard;
