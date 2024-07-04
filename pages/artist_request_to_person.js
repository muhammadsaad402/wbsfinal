/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import styles from "../styles/ArtistRequest.module.css";
import React, { useEffect, useState } from "react";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SelectOccasion from "../src/components/artist/SelectOccasion";
import ArtistMessage from "../src/components/artist/ArtistMessage";
import DetailInformation from "../src/components/artist/DetailInformation";
import ArtistAvatar from "../src/components/artist/ArtistAvatar";
import { useRouter } from "next/router";
import { reactLocalStorage } from "reactjs-localstorage";
import localStorage from "local-storage";
import Private from "../src/components/artist/Private";

function artist_request() {
  const router = useRouter();
  const {
    talent_id,
    service_id,
    service_charges,
    talent_name,
    platform_commission,
    commission,
  } = router.query;

  const userid = localStorage.get("loginAuth")?.user?.id;

  const [selectedPronoun, setSelectedPronoun] = useState(""); // Initialize with an empty string

  const [orderData, setOrderData] = useState({
    artist_id: talent_id,
    artist_service_charge_id: service_id,
    occasion_id: "",
    send_type: "myself",
    to: "",
    from: "myself",
    message: "",
    user_id: userid,
    delivery_date: "",
    pronoun_to: "",
    promo_code: "",
    is_private: "",
  });

  const [message, setMessage] = useState();
  const [promo_code, setPromo_Code] = useState();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  useEffect(() => {
    setOrderData({ ...orderData, message: message, promo_code: promo_code });
  }, [message, promo_code]);

  // function getCurrentDate() {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   let month = today.getMonth() + 1; // Months are zero-based
  //   let day = today.getDate();

  //   // Add leading zeros to month and day if needed
  //   if (month < 10) {
  //     month = `0${month}`;
  //   }
  //   if (day < 10) {
  //     day = `0${day}`;
  //   }

  //   return `${year}-${month}-${day}`;
  // }
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 2); // Add 2 days to the current date
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 5); // Set a maximum date 5 years from now

  const formatDate = (date) => {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className={styles.container}>
        <Topbar />
        <h1 className={styles.Heading_Request_Artist_Name}>
          New Request For <br /> {talent_name}
        </h1>
        <div className={styles.Main_Container_Setting}>
          {/* <div style={{ marginTop: 40 }}> */}
          <ArtistAvatar
            talent_id={talent_id}
            service_id={service_id}
            service_charges={service_charges}
            commission={commission}
            platform_commission={platform_commission}
          />
          {/* </div> */}
          <div className={styles.First_Name_Container}>
            <h2 className={styles.To_First_Name_Heading}>To ( First Name )</h2>
            <input
              type="text"
              name="to"
              placeholder={"Any Name"}
              onChange={(e) => inputHandler(e)}
              FormHelperTextProps={{ style: { color: "white" } }}
              className={styles.To_First_Name_InputField}
            />

            <Stack
              spacing={2}
              direction="row"
              className={styles.artist_request_stack}
              // style={{
              //   marginTop: "15px",
              // }}
            >
              {/* <Button className={styles.btn_tags_option} variant="outlined">
                He/Him
              </Button>
              <Button className={styles.btn_tags_option} variant="outlined">
                She/Her
              </Button>
              <Button className={styles.btn_tags_option} variant="outlined">
                They/Them
              </Button> */}
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_to === "He/Him" ? "contained" : "outlined"
                }
                onClick={() => {
                  const newPronoun = "He/Him"; // Set the desired pronoun

                  setOrderData({ ...orderData, pronoun_to: newPronoun });
                }}
              >
                He/Him
              </Button>
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_to === "She/Her" ? "contained" : "outlined"
                }
                onClick={() => {
                  const newPronoun = "She/Her";
                  setOrderData({ ...orderData, pronoun_to: newPronoun });
                }}
              >
                She/Her
              </Button>
              <Button
                className={styles.btn_tags_option}
                variant={
                  orderData.pronoun_to === "They/Them"
                    ? "contained"
                    : "outlined"
                }
                onClick={() => {
                  const newPronoun = "They/Them";
                  setOrderData({ ...orderData, pronoun_to: newPronoun });
                }}
              >
                They/Them
              </Button>
            </Stack>
          </div>

          <div className={styles.Date_Container}>
            <div>
              <h2 className={styles.From_First_Name}>Delivery Date</h2>
              <input
                type="date"
                name="delivery_date"
                min={formatDate(minDate)} // Set the minimum allowed date
                max={formatDate(maxDate)} // Set the maximum allowed date
                // value={getCurrentDate()} // Set the value to the current date
                onChange={(e) => inputHandler(e)}
                FormHelperTextProps={{ style: { color: "white" } }}
                className={styles.To_First_Name_InputField1}
              />
            </div>
          </div>

          <div className={styles.artist_occasion}>
            <SelectOccasion setOrderData={setOrderData} orderData={orderData} />
          </div>

          {/* >>>>>>>>>>>>>> important commint >>>>>>>>>>>>>> */}

          {/* <div className={styles.artist_occasion}>
            <Private setOrderData={setOrderData} orderData={orderData} />
          </div> */}
          <div className={styles.artist_message_main}>
            <ArtistMessage setOrderData={setOrderData} orderData={orderData} />
          </div>
          {/* <div className={styles.Date_Container}>
            <h3 className={styles.From_First_Name}> Private Request:</h3>
            <div>
              <input
                type="checkbox"
                name="is_private"
                checked={orderData.is_private === 1}
                onChange={(e) => {
                  const newValue = e.target.checked ? 1 : 0;
                  setOrderData({ ...orderData, is_private: newValue });
                }}
              />
            </div> 
          </div> */}
          <div className={styles.artist_detail_information}>
            <DetailInformation
              setMessage={setMessage}
              setPromo_Code={setPromo_Code}
              orderData={orderData}
              service_charges={service_charges}
              commission={commission}
              platform_commission={platform_commission}
            />
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
export default artist_request;
