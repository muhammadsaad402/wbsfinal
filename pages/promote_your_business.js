import Head from "next/head";
import styles from "../styles/PromoteBussiness.module.css";
import React from "react";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import Promote_Your_Bussiness from "../src/components/artist/promote_Bussiness";
import KnowMoreAboutBussiness from "@/components/Artist Dashboard/KnowMoreAboutBussiness";

// import ArtistDashboard from "../src/components/Artist Dashboard/artist_dashboard";

function Promote_Bussiness() {
  return (
    <>
      <div className={styles.container}>
        <Topbar />

        <div className={styles.Main_Container_Setting}>
          {/* <ArtistDashboard /> */}
          <Promote_Your_Bussiness />
        </div>
        <KnowMoreAboutBussiness />

        <Footer></Footer>
      </div>
    </>
  );
}
export default Promote_Bussiness;
