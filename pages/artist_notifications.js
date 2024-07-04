import Head from "next/head";

import styles from "../styles/ArtistNotifications.module.css";
import React from "react";

import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";

import Artist_Notification from "../src/components/artist/Artist_Notification";

function artist_package() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          <div
            className={styles.Artist_Notification_Margin_top_40}
            // style={{ marginTop: 40 }}
          >
            <Artist_Notification />
          </div>
          <div className={styles.First_Name_Container}></div>

          <div
            className={styles.Artist_Notification_margin10_width_height}
            // style={{ margin: 10, width: "auto", height: "auto" }}
          >
            {/* <SelectOccasion /> */}
          </div>
          <div
            className={styles.Artist_Notification_margin10_width_margintop20}
            // style={{ margin: 10, width: "auto", marginTop: 20 }}
          >
            {/* <ArtistMessage /> */}
          </div>

          <div
            className={
              styles.Artist_Notification_MarginLeft20_width_MarginTop_20
            }
            // style={{ marginLeft: 20, width: "auto%", marginTop: 20 }}
          >
            <div
              className={styles.Artist_Notification_Height_20}
              // style={{ height: 20 }}
            ></div>
            {/* <DetailInformation /> */}
            <div
              className={styles.Artist_Notification_Height_20}

              // style={{ height: 20 }}
            ></div>
          </div>
        </div>
      </div>
      <div
      // style={{ marginTop: 0 }}
      >
        <Footer></Footer>
      </div>
    </>
  );
}
export default artist_package;
