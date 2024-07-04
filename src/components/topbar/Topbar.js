import Head from "next/head";
// import styles from "../../../styles/Footer.module.css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
// import TopBarToggle from "../../higherComponents/TopBarToggle";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import styles from "../../../styles/Topbar.module.css";
import { reactLocalStorage } from "reactjs-localstorage";
import Navigationbar from "../../higherComponents/Navigationbar";
import NavigationbarMobile from "../../higherComponents/NavigationbarMobile";

import { Api } from "../../config/Config";
import { useRouter } from "next/router";
import axios from "axios";
import localStorage from "local-storage";
import NotificationBell from "../NotificationBell/NotificationBell";
// import NotificationCount from "../NotificationBell/NotificationCount";
import NotificationCounts from "../NotificationBell/NotificationCount";
function Topbar() {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [localImage, setLocalImage] = useState();
  const [click, setOnclick] = useState(false);
  const [token, setToken] = useState(null);
  const [count, setCount] = useState(null);
  const [banks, setBanks] = useState([]);

  // const [notification_Count, setNotificationCount] = useState("");
  // const token = localStorage.get("loginAuth")?.authorisation?.token;
  // const token = localStorage.get("loginAuth")?.user?.id;

  let localData = "";
  let artistData = "";

  if (typeof window !== "undefined") {
    // Perform localStorage action
    localData = reactLocalStorage?.getObject("loginAuth");
    artistData = reactLocalStorage?.getObject("isArtist");
  } else {
    localData = "";
    artistData = "";
  }

  useEffect(() => {
    getLocalImage();

    // const token = localStorage.get("loginAuth")?.user?.id;
    // console.log(token, "checking rana");
    setToken(localStorage.get("loginAuth")?.authorisation?.token);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const artistdata = reactLocalStorage.getObject("isArtist");
      const artistId = artistdata?.data?.id;
      try {
        const response = await axios.get(
          `${baseURL}/api/artist/all-banks?artist_id=${artistId}`,
          {
            headers: {
              Authorization:
                "Bearer " + localStorage.get("loginAuth")?.authorisation?.token,
            },
          }
        );

        // Check if the data length is greater than 0
        if (response?.data?.data?.length > 0) {
          setBanks(response.data.data);
          console.log(response?.data?.data, "testing for bank");
        } else {
          // Handle the case when there is no data
          console.log("No data received");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle errors as needed
      }
    };
    fetchData();
  }, []);
  const getLocalImage = async () => {
    if (localData !== null) {
      setLocalImage(
        localData?.updated_data
          ? localData?.updated_data?.user_image
          : localData?.user?.user_image
      );
      // console.log(localData.status);
    } else {
      // console.log("logedout");
      // setRouteName('Onboarding');
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // console.log(reactLocalStorage?.getObject("loginAuth")?.authorisation?.token)

  const handleLogout = async () => {
    await axios
      .post(
        // Api?.LOGOUT
        `${baseURL}/api/auth/logout`,
        null,
        {
          headers: {
            Authorization:
              "Bearer " +
              reactLocalStorage?.getObject("loginAuth")?.authorisation?.token,
          },
        }
      )
      .then((response) => {
        // console.log(response);
        router.push({
          pathname: "/login",
        });
      })
      .catch((error) => {
        // console.error(error.response.data.message);
        if (error?.response?.data?.message === "Token has expired") {
          reactLocalStorage?.remove("loginAuth");
          router.push({
            pathname: "/login",
          });
        }
      });
  };

  const getNotification = () => {
    axios
      .get(`${baseURL}/api/user-notifications`, {
        headers: {
          Authorization:
            "Bearer" +
            reactLocalStorage?.getObject("loginAuth")?.authorisation?.token,
        },
      })
      .then((response) => {
        const notificationCount = response?.data?.notification_count;
        console.log(notificationCount, "tttt");
        if (notificationCount > 0) {
          // Assuming setCount is a valid function to set notification count
          setCount(notificationCount);
        } else {
          console.log("No Notifications to Display");
        }
      })

      .catch((error) => {
        console.error(error);
      });
  };
  const getRead = () => {
    axios
      .get(`${baseURL}/api/read-notification/2`, {
        headers: {
          Authorization:
            "Bearer" +
            reactLocalStorage?.getObject("loginAuth")?.authorisation?.token,
        },
      })
      .then((response) => {
        console.log(response?.data, "testing  for GetRead");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getNotification();
    getRead();
  }, []);
  // const notificationCount = 5; // You can replace this with your actual notification count
  const notificationCounts = 30;
  return (
    <div>
      {token ? (
        <div className={styles.topBarMainDiv}>
          <div className={styles.mobile_nav}>
            <NavigationbarMobile />
          </div>
          <Link href={"/"} className={styles.logo}>
            {/* <h2>WBS</h2>  */}
            <Image
              src={require("../../Asset/logo/logo.png")}
              alt="Picture of the Logo"
              // width={"100%"}
              // height={"100%"}
              // style={{ margin: "2%" }}
            />
          </Link>
          <div className={styles.topbarCenter}>
            <div className={styles.main_nav}>
              <Navigationbar />
            </div>
          </div>

          <div className={styles.topbarRight}>
            {/* <div className={styles.icon_box}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>

            <div className={styles.icon_box}>
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                />
              </svg>
            </div> */}
            <Box className={styles.icon_box2}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    // src={`https://dev7.sidat.digital/wbs/${localImage}`}
                    src={`${baseURL}/${localImage}`}
                    className={styles.avatar}
                  />

                  {count > 0 ? (
                    <NotificationBell notificationCount={count} />
                  ) : null}
                </IconButton>
              </Tooltip>

              <Menu
                className={styles.menu}
                sx={{ mt: "25px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <h3>User Menu</h3>
                <Link href="/dashboard">
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    className={
                      router.pathname === "/dashboard" ? styles.activeLink : ""
                    }
                  >
                    <Typography textAlign="center">User Dashboard</Typography>
                  </MenuItem>
                </Link>
                <Link href="/track_my_order">
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    className={
                      router.pathname === "/track_my_order"
                        ? styles.activeLink
                        : ""
                    }
                  >
                    <Typography textAlign="center">Track My Order</Typography>

                    {count > 0 ? (
                      <NotificationCounts notificationCounts={count} />
                    ) : null}
                  </MenuItem>
                </Link>
                {localData?.status && (
                  <Link href="/edit_profile">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/edit_profile"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">Edit Profile</Typography>
                    </MenuItem>
                  </Link>
                )}

                {localData?.user?.user_type === "agency" && (
                  <>
                    <h3>Representative Menu</h3>

                    {localData?.user && (
                      <Link
                        // href="/artist_profile_details"

                        href={
                          artistData?.status
                            ? "/artist_profile_details_agent"
                            : "/artist_profile_details_agent"
                        }
                      >
                        {console.log(artistData?.status, "tesS")}
                        <MenuItem
                          onClick={handleCloseUserMenu}
                          className={
                            router.pathname ===
                            (artistData?.status
                              ? "/artist_profile_details_agent"
                              : "/artist_profile_details_agent")
                              ? styles.activeLink
                              : ""
                          }
                        >
                          <Typography textAlign="center">
                            {!artistData?.status
                              ? "Register As Artist"
                              : "Register As Artist"}
                          </Typography>
                        </MenuItem>
                      </Link>
                    )}
                    {localData?.user && (
                      <Link href="/representive_dashboard">
                        <MenuItem
                          onClick={handleCloseUserMenu}
                          className={
                            router.pathname === "/artist_recording_agent"
                              ? styles.activeLink
                              : ""
                          }
                        >
                          <Typography textAlign="center">
                            Representative Dashboard
                          </Typography>
                        </MenuItem>
                      </Link>
                    )}
                  </>
                )}

                <h3>Artist Menu</h3>

                {artistData?.status && (
                  <Link href="/artist_dashboard">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_dashboard"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">
                        Artist Dashboard
                      </Typography>
                      {count > 0 ? (
                        <NotificationCounts notificationCounts={count} />
                      ) : null}
                    </MenuItem>
                  </Link>
                )}

                {localData?.user && (
                  <Link
                    // href="/artist_profile_details"
                    href={
                      artistData?.status
                        ? "/artist_profile_details_updated"
                        : "/artist_profile_details"
                    }
                  >
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname ===
                        (artistData?.status
                          ? "/artist_profile_details_updated"
                          : "/artist_profile_details")
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">
                        {!artistData?.status
                          ? "Register As Artist"
                          : "Edit Artist Profile"}
                      </Typography>
                    </MenuItem>
                  </Link>
                )}

                {artistData?.status && (
                  <Link href="/artist_recording_preview">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_recording_preview"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">
                        Edit Artist Recording
                      </Typography>
                    </MenuItem>
                  </Link>
                )}
                {/* {artistData?.status && (
                  <Link href="/artist_recording">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_recording"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">
                        Edit Artist Recording
                      </Typography>
                    </MenuItem>
                  </Link>
                )} */}
                {artistData?.status && (
                  <Link href="/artist_select_service">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_select_service"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">Edit Services</Typography>
                    </MenuItem>
                  </Link>
                )}

                {artistData?.status && (
                  <Link href="/artist_add_document">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_add_document"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">Edit Documents</Typography>
                    </MenuItem>
                  </Link>
                )}
                {artistData?.status && (
                  <Link href="/artist_earning">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_earning"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">Artist Earning</Typography>
                    </MenuItem>
                  </Link>
                )}
                {artistData?.status && (
                  <Link href="/artist_order_details">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_order_details"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">
                        Artist All Orders
                      </Typography>
                    </MenuItem>
                  </Link>
                )}
                {artistData?.status && <h3>Artist Bank Info</h3>}

                {artistData?.status && (
                  <Link href="/artist_payment_card">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_payment_card"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">
                        Add {artistData?.data?.nick_name} Bank Detail
                      </Typography>
                    </MenuItem>
                  </Link>
                )}
                {banks && (
                  <>
                    {artistData?.status && (
                      <Link href="/artist_payment_card_view">
                        <MenuItem
                          onClick={handleCloseUserMenu}
                          className={
                            router.pathname === "/artist_payment_card_view"
                              ? styles.activeLink
                              : ""
                          }
                        >
                          <Typography textAlign="center">
                            Edit Bank Detail
                          </Typography>
                        </MenuItem>
                      </Link>
                    )}
                  </>
                )}

                {artistData?.status && (
                  <Link href="/artist_statment">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_statment"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">
                        Artist Statement
                      </Typography>
                    </MenuItem>
                  </Link>
                )}

                {artistData?.status && artistData?.data?.wallet_amount > 0 && (
                  <Link href="/artist_payment_withdraw">
                    <MenuItem
                      onClick={handleCloseUserMenu}
                      className={
                        router.pathname === "/artist_payment_withdraw"
                          ? styles.activeLink
                          : ""
                      }
                    >
                      <Typography textAlign="center">
                        Widthdraw Amount
                      </Typography>
                    </MenuItem>
                  </Link>
                )}

                {/* 
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Manage</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem> */}

                <h3></h3>

                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </div>
        </div>
      ) : (
        <div className={styles.topBarMainDiv}>
          <div className={styles.mobile_nav}>
            <NavigationbarMobile />
          </div>
          <Link href={"/"} className={styles.logo}>
            {/* <h2>WBS</h2>  */}
            <Image
              src={require("../../Asset/logo/logo.png")}
              alt="Picture of the Logo"
              // width={"100%"}
              // height={"100%"}
              // style={{ margin: "2%" }}
            />
          </Link>
          <div className={styles.topbarCenter}>
            <div className={styles.main_nav}>
              <Navigationbar />
            </div>
          </div>
          <div className={styles.topbarRight}>
            {/* <div
              className={styles.topbarRightSearch}
              // style={{
              //   width: "40px",
              //   height: "40px",
              //   alignSelf: "center",
              //   marginLeft: "5%",
              //   backgroundColor: "#CEA234",
              //   borderRadius: "50px",
              //   padding: "12px",
              // }}
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div> */}

            {/* <span className={styles.register_button}> */}
            <Link className={styles.register_button} href="/login">
              <p>Login</p>
            </Link>
            {/* </span> */}
          </div>
        </div>
      )}
    </div>
  );
}
export default Topbar;
