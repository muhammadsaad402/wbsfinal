import Head from "next/head";

import styles from "../styles/Home.module.css";
import Wbs from "./wbs";
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>WISH BY STAR</title>

        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
        <script
          src="https://apis.google.com/js/platform.js"
          async
          defer
        ></script>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Wbs />
    </div>
  );
}