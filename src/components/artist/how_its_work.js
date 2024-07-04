import * as React from "react";
import styles from "../../../styles/HowItsWork.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import { auto } from "@popperjs/core";
export default function How_Its_Work() {
  return (
    <div className={styles.sub_parent}>
      <h1 className={styles.How_Its_Works_Heading}>How It works</h1>
      <div className={`${styles.sub_section} ${styles.sub_section1}`}>
        <div className={styles.section1_child1}>
          <h1>Search For A Star</h1>
          <p style={{ color: "#fff" }}>
            Find the right celebrity for any occasion
          </p>
        </div>
        <div className={styles.section1_child2}>
          <div className={styles.flex_col}>
            <Image
              alt="complex"
              className={styles.how_its_work_image_size}
              // width={300}
              // height={300}
              src={require("../../Asset/Images/Actor_3.png")}
            />
            {/* <div>
              <p style={{ color: "#cea234" }}> Search An Star</p>
              <p
                className={styles.Find_occasion_Paragraph}
                style={{ color: "#fff" }}
              >
                Find the celeb for any occasion.
              </p>
            </div> */}
          </div>
          <Image
            // style={{ marginTop: "48px", marginRight: "20px" }}
            alt="complex"
            // width={300}
            // height={250}
            className={
              styles.how_its_work_image_width_height_margintop_marginright
            }
            src={require("../../Asset/Images/Actor_4.png")}
          />
        </div>
      </div>

      <div className={`${styles.sub_section} ${styles.sub_section2}`}>
        <div className={styles.section1_child1}>
          <h1>Request For Video</h1>
          <p style={{ color: "#fff" }}>
            Choose our 24hr delivery option if you need it sooner.
          </p>
        </div>
        <div className={styles.section1_child2}>
          <div className={styles.flex_col}>
            <Image
              alt="complex"
              className={styles.how_its_work_image_size}
              // width={300}
              // height={300}
              src={require("../../Asset/Images/Actor_6.png")}
            />
            {/* <div>
              <p style={{ color: "#cea234" }}> Request Them</p>
              <p
                className={styles.Find_occasion_Paragraph}
                style={{ color: "#fff" }}
              >
                Get your personalized video message.
              </p>
            </div> */}
          </div>
          <Image
            // style={{ marginTop: "48px", marginRight: "20px" }}
            alt="complex"
            // width={300}
            // height={250}
            className={
              styles.how_its_work_image_width_height_margintop_marginright
            }
            src={require("../../Asset/Images/Actor_5.png")}
          />
        </div>
      </div>

      <div className={`${styles.sub_section} ${styles.sub_section3}`}>
        <div className={styles.section1_child1}>
          <h1>Enjoy The Wow Magic</h1>
          <p style={{ color: "#fff" }}>
            Magical moments deserve to be shared. Capture the WOW
          </p>
        </div>
        <div className={styles.section1_child2}>
          <div className={styles.flex_col}>
            <Image
              alt="complex"
              className={styles.how_its_work_image_size}
              // width={300}
              // height={300}
              src={require("../../Asset/Images/Actor_7.png")}
            />
          </div>
          <Image
            // style={{ marginTop: "48px", marginRight: "20px" }}
            alt="complex"
            // width={300}
            // height={250}
            className={
              styles.how_its_work_image_width_height_margintop_marginright
            }
            src={require("../../Asset/Images/Actor_8.png")}
          />
        </div>
      </div>
    </div>
  );
}
