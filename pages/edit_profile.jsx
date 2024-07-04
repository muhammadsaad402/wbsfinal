/* eslint-disable react-hooks/rules-of-hooks */
import styles from "../styles/EditProfile.module.css";
import React, { useEffect, useState } from "react";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import EditProfileCard from "../src/components/editProfileCard/EditProfileCard";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/router";

import localStorage from "local-storage";
import { Suspense } from "react";

function edit_profile() {
  const router = useRouter();

  // let data = "";
  const [data, setData] = useState(null);

  useEffect(() => {
    const data = reactLocalStorage.getObject("loginAuth");

    if (Object.keys(data).length === 0) {
      router.push("/login");
    }
  }, []);
  useEffect(() => {
    const token = localStorage?.get("loginAuth");
    // Perform the token check here (e.g., validate token with the server).
    // For demonstration purposes, let's assume the token is valid and contains user data.
    // Replace the following line with your actual token validation logic.
    const isValidToken = true;

    if (isValidToken) {
      setData(token);
    } else {
      // Handle the case when the token is invalid (e.g., redirect to login).
      // For now, we'll just remove the invalid token from local storage and set data to null.
      localStorage.remove("loginAuth");
      setData(null);
    }
  }, []);
  if (data === null) {
    return <div> Loading ...</div>;
  }
  return (
    <div>
      <div className={styles.container}>
        <Suspense>
          <Topbar />

          {/* <div className={styles.edit_profile_main_container}></div> */}

          <h1 className={styles.edit_profile_heading}>EDIT PROFILE</h1>
          {data && data?.user?.user_type === "artist" ? (
            <EditProfileCard isArtist={true} />
          ) : (
            <EditProfileCard isArtist={false} />
          )}
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
export default edit_profile;
