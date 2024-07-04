/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Card from "@mui/material/Card";
import Image from "next/image";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/material/Box";
import styles from "../../styles/Home.module.css";
import Rating from "@mui/material/Rating";
import { Placeholder } from "semantic-ui-react";
import EastIcon from "@mui/icons-material/East";
import Link from "next/link";
import StarIcon from "@mui/icons-material/Star";

export default function NewTalentsCard({ imgUrl, data, symbol }) {
  // const value = 5;
  const avgRating =
    data?.avg_ratting?.length > 0
      ? data?.avg_ratting[0]?.avg_rating.toFixed(1)
      : "3.5";

  return (
    <div className={styles.card}>
      <Image width={1000} height={1000} alt="" src={imgUrl || Placeholder} />
      <div className={styles.card_content}>
        {/* <h2>{data?.name}</h2> */}
        <h2>{data?.nick_name}</h2>

        <p>{data?.category?.name}</p>

        {/* <Rating
          className={styles.New_talents_card_rating}
          name="text-feedback"
          value={2.5}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        /> */}

        {/* <p className={styles.button}>View Profile</p> */}
      </div>
      <div className={styles.flex}>
        <span>
          <StarIcon className={styles.rating_icon} />
          {/* 3.5 */}
          {avgRating}
        </span>
        <span className={styles.price}>
          {symbol ? symbol : ""}
          {/* {data?.service_charges[0]?.price} */}

          {data?.service_charges[0]?.price
            ? parseInt(data?.service_charges[0]?.price) >= 1000
              ? parseInt(data?.service_charges[0]?.price).toLocaleString()
              : data?.service_charges[0]?.price
            : "0"}
        </span>
      </div>
    </div>
  );
}
{
  /* <Card sx={{ backgroundColor: "#000" }}>
      <AspectRatio minHeight="100%">
        <img
          src={imgUrl || Placeholder}
          alt=""
          width={240}
          height={850}
          style={{ borderRadius: "20px" }}
        />
      </AspectRatio>
      <Box sx={{ backgroundColor: "transparent", display: "flex", padding: 2 }}>
        <div>
          <Typography level="body3" className={styles.Artist_Star_Name}>
            {data?.name}
          </Typography>
          <div
            style={{
              backgroundColor: "transparent",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // width: "200px",
            }}
          >
            <Typography
              style={{ backgroundColor: "transparent" }}
              fontSize="lg"
              fontWeight="lg"
              className={styles.Artist_TV_Star}
            >
              {data?.category?.name}
            </Typography>
            <Rating
              style={{ alignSelf: "flex-end", marginLeft: "auto" }}
              name="text-feedback"
              value={2.5}
              readOnly
              precision={0.5}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
          </div>
        </div>
      </Box>
    </Card> */
}
