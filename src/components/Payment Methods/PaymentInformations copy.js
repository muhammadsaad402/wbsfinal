import * as React from "react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import styles from "../../../styles/PaymentMethod.module.css";

import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Image from "next/image";
import Link from "next/link";
import { Api } from "../../config/Config";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import localStorage from "local-storage";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Payment_Info({ service_charges, orderData }) {
  const router = useRouter();
  const cardButtonRef = useRef(null);
  const [error, setError] = React.useState(null); // Define the error state

  const handleUnauthorized = () => {
    router.push("/login"); // Redirect to the login page
  };
  const [paymobAttachment, setPamobAttachments] = React.useState({});

  React.useEffect(() => {
    if (orderData) {
      setPamobAttachments(JSON?.parse(orderData));
    }
  }, [orderData]);

  // Calculate the commission (2.5% of service_charges)
  const commissionPercentage = 2.5;
  const commission = (service_charges * commissionPercentage) / 100;

  // Calculate the total amount including the commission
  const convertedServiceCharges = parseFloat(service_charges);
  const totalAmount = convertedServiceCharges + commission;

  // const paymobAttachment = JSON?.parse(orderData);
  // const currentUser = reactLocalStorage.getObject("loginAuth")?.user
  const currentUser = localStorage.get("loginAuth")?.user;
  const [paymentToken, setPaymentToken] = React.useState(null);
  // console.log(paymobAttachment);

  const paymentOrderrderData = {
    name: paymobAttachment?.to,
    amount_cents: totalAmount * 100,
    description: paymobAttachment?.message,
    quantity: "1",
  };
  const [selectedMethod, setSelectedMethod] = React.useState(false);
  const [card, setCard] = React.useState(false);
  const [jazzCash, setJazzCash] = React.useState(false);
  const [EasyPaisa, setEasyPaisa] = React.useState(false);

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  const handleCardClick = () => {
    if (!document.getElementById("c1").checked) {
      toast.error(
        "Please agree to the terms & policies."
        // {
        //   position: toast.POSITION.TOP_CENTER,
        // }
      );
    } else {
      setSelectedMethod(true);
      setCard(true);
      setEasyPaisa(false);
      setJazzCash(false);
    }
  };

  const handleEasyPaisaClick = () => {
    if (!document.getElementById("c1").checked) {
      toast.error(
        "Please agree to the terms & policies."
        // {
        //   position: toast.POSITION.TOP_CENTER,
        // }
      );
    } else {
      setSelectedMethod(true);
      setEasyPaisa(true);
      setJazzCash(false);
      setCard(false);
    }
  };

  const handleJazzCashClick = () => {
    if (!document.getElementById("c1").checked) {
      toast.error(
        "Please agree to the terms & policies."
        // {
        //   position: toast.POSITION.TOP_CENTER,
        // }
      );
    } else {
      setSelectedMethod(true);
      setJazzCash(true);
      setCard(false);
      setEasyPaisa(false);
    }
  };
  const handlePayment = () => {
    axios
      .post(
        // Api?.ADD_ORDER,
        `${baseURL}/api/order/add`,

        paymobAttachment,
        {
          headers: {
            Authorization:
              "Bearer " +
              reactLocalStorage?.getObject("loginAuth")?.authorisation?.token,
          },
        }
      )

      .then(function (response) {
        // console.log(response, "test response");
        const merchant_order_id = response.data.unique_id;

        // .post(
        //   Api?.PAYMOB1, {
        //   api_key: Api?.PAYMOB_API_KEY,
        // })
        // console
        // .log(process.env.PAYMOB1, "test paymob1 ")
        axios
          .post("https://pakistan.paymob.com/api/auth/tokens", {
            api_key:
              // "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RJeE9URXNJbTVoYldVaU9pSXhOamc0TXpreU1qazJMak00TXpVNEluMC5kcUJYQnJKLU14UUpZaEU2QzNwa2Y5SEdtbXRyNlBUcl9zZzB1eWNzMy1MYU9VRFdJRERVVlVob2ZWS05xa3huNE5iUE1HWGJoRmhhcFRWX25FaHpKUQ==",
              "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T0RJeE9URXNJbTVoYldVaU9pSXhOamc0TXpreU1qazJMak00TXpVNEluMC5kcUJYQnJKLU14UUpZaEU2QzNwa2Y5SEdtbXRyNlBUcl9zZzB1eWNzMy1MYU9VRFdJRERVVlVob2ZWS05xa3huNE5iUE1HWGJoRmhhcFRWX25FaHpKUQ==",
          })
          .then(function (response) {
            // console.log(response, "test paymob response");
            const TOKEN = response.data.token;
            // console.log(TOKEN, "test3 token");

            axios
              .post(
                // Api?.PAYMOB2,
                "https://pakistan.paymob.com/api/ecommerce/orders",
                {
                  auth_token: response.data.token,
                  delivery_needed: true,
                  // amount_cents: service_charges * 100,
                  amount_cents: totalAmount * 100,
                  currency: "PKR",
                  merchant_order_id: merchant_order_id,
                  items: [paymentOrderrderData],
                  shipping_data: {},
                  shipping_details: {},
                }
              )
              .then(function (response) {
                axios
                  .post(
                    // Api?.PAYMOB3,
                    // process.env.PAYMOB3,
                    "https://pakistan.paymob.com/api/acceptance/payment_keys",
                    {
                      auth_token: TOKEN,
                      // amount_cents: service_charges * 100,
                      amount_cents: totalAmount * 100,
                      expiration: 3600,
                      order_id: response.data.id,
                      billing_data: {
                        email: currentUser.email,
                        first_name: currentUser.name,
                        street: "NA",
                        building: "NA",
                        phone_number: "09786756564",
                        shipping_method: "NA",
                        postal_code: "NA",
                        city: "NA",
                        country: "NA",
                        last_name: currentUser.name,
                        state: "NA",
                        floor: "NA",
                        apartment: "NA",
                      },
                      currency: "PKR",
                      integration_id: card
                        ? "86016"
                        : jazzCash
                        ? "86563"
                        : "86562",
                      lock_order_when_paid: false,
                    }
                  )
                  .then(function (response) {
                    setPaymentToken(response.data.token);
                  })
                  .catch(function (error) {
                    // console.error(error);
                    if (error.response && error.response.status === 401) {
                      handleUnauthorized(); // Redirect to login page if unauthorized
                      setError(error);
                    } else {
                      console.error(error);
                    }
                  });
              })
              .catch(function (error) {
                // console.error(error);
                if (error.response && error.response.status === 401) {
                  handleUnauthorized(); // Redirect to login page if unauthorized
                  setError(error);
                } else {
                  console.error(error);
                }
              });
          })
          .catch(function (error) {
            // console.error(error);
            if (error.response && error.response.status === 401) {
              handleUnauthorized(); // Redirect to login page if unauthorized
              setError(error);
            } else {
              console.error(error);
            }
          });
      })
      .catch(function (error) {
        // console.error(error);
        if (error.response && error.response.status === 401) {
          handleUnauthorized(); // Redirect to login page if unauthorized
          setError(error);
        } else {
          console.error(error);
        }
      });
  };
  // Use this inside your component
  useEffect(() => {
    // Check for 401 response and redirect to login page
    if (error && error.response && error.response.status === 401) {
      handleUnauthorized();
    }
  }, [error]);
  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  useEffect(() => {
    if (paymentToken && card) {
      const cardButton = document.getElementById("card-button");
      if (cardButton) {
        cardButton.click();
      }
    }
  }, [paymentToken, card]);
  return (
    <>
      <ToastContainer className="tost" />

      <div className={styles.Main_Container_Setting}>
        <div>
          <h1 className={styles.Payment_Info_TopHeading}>Payment Info</h1>
        </div>

        <div className={styles.price_sec}>
          <div className={styles.Payment_Info_payment_Title}>
            <h3 className={styles.Video_Fee}>Video Fee</h3>
            <h3 className={styles.Amount_PKR}> PKR {service_charges}</h3>
          </div>
          <div className={styles.Payment_Info_payment_Title}>
            <h3 className={styles.Video_Fee}>
              Service Fee
              {/* (2.5% Commission) */}
            </h3>
            {/* <h3 className={styles.Amount_PKR}> PKR 2000</h3> */}
            <h3 className={styles.Amount_PKR}>
              PKR {parseFloat(commissionPercentage).toFixed(2)}%
            </h3>
          </div>
          <div className={styles.Payment_Info_payment_Title}>
            <h3 className={styles.Video_Fee}>Total</h3>
            <h3 className={styles.Amount_PKR}>
              {" "}
              {/* PKR {Number(service_charges) + 2000} */}
              PKR {parseFloat(totalAmount).toFixed(1)}
            </h3>
          </div>
        </div>
        {/* <div className={styles.Payment_Info_payment_price}>
  <h3 className={styles.Amount_PKR}> PKR {service_charges}</h3>
  <h3 className={styles.Amount_PKR}> PKR 2000.0</h3>
  <h3 className={styles.Amount_PKR}> PKR 11300.0</h3>
</div> */}
        <div className={styles.Payment_Info_checkbox}>
          {/* <FormGroup>
    <FormControlLabel
      // disabled
      className={styles.Checkbox_setting}
      control={<Checkbox />}
      label="By Booking, You agree to terms & policies."
    />
  </FormGroup> */}
          <input type="checkbox" id="c1" />
          <label for="c1">
            By Booking, You agree to{" "}
            <Link href="/user_privacy_policy" target="_blank">
              {" "}
              terms & policies.
            </Link>
          </label>
          {/* <p>By Booking, You agree to terms & policies.</p> */}
        </div>

        <div className={styles.btn_flex}>
          {selectedMethod === false && (
            <>
              <button
                className={styles.btn_Book_Now_PAYMENT}
                variant="outlined"
                // onClick={() => {
                //   setSelectedMethod(true);
                //   setCard(true);
                //   setEasyPaisa(false);
                //   setJazzCash(false);
                // }}
                onClick={handleCardClick}
              >
                <Image
                  src={require("../../Asset/cash images/visa-icon.png")}
                  alt="Picture of the author"
                  // width={"100%"}
                  // height={"100%"}
                  className={styles.payment_card_cash_image}
                />
                {/* Pay Via Card */}
              </button>
              <button
                className={styles.btn_Book_Now_PAYMENT}
                variant="outlined"
                onClick={handleEasyPaisaClick}
                // onClick={() => {
                //   setSelectedMethod(true);
                //   setEasyPaisa(true);
                //   setJazzCash(false);
                //   setCard(false);
                // }}
              >
                <Image
                  src={require("../../Asset/cash images/easypaisa-icon.png")}
                  alt="Picture of the author"
                  className={styles.payment_card_cash_image}

                  // width={"100%"}
                  // height={"100%"}
                />
                {/* Pay Via Easy Paisa */}
              </button>
              <button
                className={styles.btn_Book_Now_PAYMENT}
                variant="outlined"
                // onClick={() => {
                //   setSelectedMethod(true);
                //   setJazzCash(true);
                //   setCard(false);
                //   setEasyPaisa(false);
                // }}
                onClick={handleJazzCashClick}
              >
                {/* <img src={occasion.image} alt={occasion.name} /> */}
                <Image
                  src={require("../../Asset/cash images/jazzcash-icon.png")}
                  alt="Picture of the author"
                  className={styles.payment_card_cash_image}
                  // width={"100%"}
                  // height={"100%"}
                  // style={{ marginTop: "10px" }}
                />
                {/* Pay Via Jazz Cash */}
              </button>
            </>
          )}
        </div>
        <div className={styles.btn_flex2}>
          {selectedMethod === true && (
            <>
              <Button
                className={styles.btn_Book_Now}
                variant="outlined"
                onClick={handlePayment}
              >
                Book Now
              </Button>

              <Button
                className={styles.btn_Book_Now}
                variant="outlined"
                onClick={() => {
                  setSelectedMethod(false);
                }}
              >
                Change Payment Method
              </Button>
            </>
          )}

          {paymentToken && jazzCash ? (
            <>
              {/* <Grid item xs={12}> */}
              <a
                href={`https://pakistan.paymob.com/iframe/${paymentToken}`}
                className={styles.btn_Book_Now}
                variant="outlined"
              >
                Pay Via Jazzcash
              </a>
              {/* </Grid> */}
            </>
          ) : null}
          {paymentToken && EasyPaisa ? (
            <>
              {/* <Grid item xs={12}> */}
              <a
                href={`https://pakistan.paymob.com/iframe/${paymentToken}`}
                className={styles.btn_Book_Now}
                variant="outlined"
              >
                Pay Via EasyPaisa
              </a>
              {/* </Grid> */}
            </>
          ) : null}
          {paymentToken && card ? (
            <>
              {/* <Grid item xs={12}> */}
              <a
                id="card-button"
                href={`https://pakistan.paymob.com/api/acceptance/iframes/108012?payment_token=${paymentToken}`}
                className={styles.btn_Book_Now}
                variant="outlined"
                onClick={() => {
                  window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/108012?payment_token=${paymentToken}`;
                }}
              >
                Pay Via Card
              </a>
              {/* </Grid> */}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
