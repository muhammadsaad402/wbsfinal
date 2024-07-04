/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
// import styles from "../styles/AllCategories.module.css";
import styles from "../styles/ArtistCategories.module.css";
import React, { useEffect } from "react";
import Image from "next/image";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import { useState } from "react";
import Router, { withRouter } from "next/router";
import axios from "axios";
import FeatureArtistCard1 from "../src/higherComponents/FeatureArtistCard1";
import CardSlider1 from "../src/components/slider/CardSlider1";
import { Api } from "../src/config/Config";
import SideBar from "../src/components/sideBar/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "@/redux/actions/currencyActions";

import Loders from "../src/components/Loader/Loder";
function artist_categories() {
  const [allArtist, setAllArtist] = useState();
  const [allArtistLoader, setAllArtistLoader] = useState(false);
  const [latestArtist, setLatestArtist] = useState();
  const [latestArtistLoader, setLatestArtistLaoder] = useState(false);

  const [categoryList, setCategoryList] = useState();
  const [categoryListLoader, setCategoryListLoader] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("All"); // Initialize with "All"
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    getAllArtist();
    getLatestArtist();
    getCatrgory();
  }, []);
  const getCatrgory = async () => {
    await axios
      .get(
        // Api?.get_CATEGORY,
        process.env.NEXT_PUBLIC_BASE_URL + "/api/talent-categories",

        {}
      )
      .then(function (response) {
        setCategoryList(response?.data?.data);
        setCategoryListLoader(true);
        setLoader(false);
      })
      .catch(function (error) {});
  };
  const talentByCategory = async (id) => {
    await axios
      .get(
        // `${Api?.GET_TALENT_BY_CATEGORY}${id}`
        `${baseURL}/api/artists-by-category?category_id=${id}`,

        {}
      )
      .then(function (response) {
        // console.log("Cat", response);
        setAllArtist(response?.data?.data);
        setLatestArtist(response?.data?.data);
        setAllArtistLoader(true);
        setLatestArtistLaoder(true);
        setLoader(false);
      })
      .catch(function (error) {});
  };
  const getAllArtist = async () => {
    axios
      .get(
        // "https://dev7.sidat.digital/wbs/api/all-artists"
        process.env.NEXT_PUBLIC_BASE_URL + "/api/all-artists",
        {}
      )
      .then(function (response) {
        setAllArtist(response?.data?.data);
        setAllArtistLoader(true);
        setLoader(false);
      })
      .catch(function (error) {});
  };
  function handleClick(item) {
    Router.push({
      pathname: "/artist_profile",
      query: { item: item?.id },
    });
  }

  const getLatestArtist = async () => {
    await axios
      .get(
        // "https://dev7.sidat.digital/wbs/api/latest-content"
        process.env.NEXT_PUBLIC_BASE_URL + "/api/latest-content",
        {}
      )
      .then(function (response) {
        setLatestArtist(response?.data?.data);
        setLatestArtistLaoder(true);
        setLoader(false);
      })
      .catch(function (error) {});
  };
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  // Currency
  const dispatch = useDispatch();
  const currencyData = useSelector(
    (state) => state.currencyReducer.currencyData
  );
  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  const filteredData = currencyData?.data.filter((item) => item.status === 1);
  const symbol = [];
  filteredData?.forEach((item, index) => {
    symbol.push(item.symbol);
  });
  return (
    <div className={styles.container}>
      {!loader || <Loders />}

      <Topbar />
      <h1>ALL CATEGORIES</h1>

      <div className={styles.sub_container_flex}>
        {/* <div className={styles.sub_container_15}>
        </div> */}
        {/* <SideBar /> */}

        <div className={styles.sub_container_85}>
          <div className={styles.main_container_90}>
            <div className={styles.container_width_15}>
              {/* <h1>Latest Actions {selectedCategoryName}</h1> */}
              {selectedCategoryName !== "All" ? (
                <h1>Latest {selectedCategoryName}</h1>
              ) : (
                <h1>Latest </h1>
              )}
            </div>
            {categoryListLoader ? (
              <div className={styles.container_width_70_flex}>
                <button
                  // style={{ color: "white", cursor: "pointer" }}
                  onClick={() => {
                    setActiveCategory(null);
                    // setSelectedCategoryId(null); // Reset to "All" when "All" is clicked
                    setSelectedCategoryName("All"); // Reset to "All" when "All" is clicked
                    getLatestArtist();
                    getAllArtist();
                  }}
                  className={
                    activeCategory === null
                      ? styles.activeButton
                      : styles.buttons
                  }
                >
                  All
                </button>
                {categoryList?.map((item) => (
                  <button
                    onClick={() => {
                      // setSelectedCategoryId(item.id);
                      setActiveCategory(item?.id);
                      setSelectedCategoryName(item?.name);
                      talentByCategory(item?.id);
                    }}
                    className={
                      activeCategory === item.id
                        ? styles.activeButton
                        : styles.buttons
                    }
                  >
                    {item?.name}
                  </button>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className={styles.container_width_100}>
            {/* Latest Content Card Start */}
            {/* <CardSlider /> */}
            {latestArtistLoader ? (
              <CardSlider1 data={latestArtist} symbol={symbol}></CardSlider1>
            ) : (
              ""
            )}
            {/* Latest Content Card End  */}
          </div>

          <div className={styles.container_heigt_width_100}>
            <div className={styles.new_actions_width_15}>
              {/* <h1>New Actions {selectedCategoryName}</h1> */}
              {/* {selectedCategoryName !== "All" && (
                <h1>{selectedCategoryName}</h1>
              )} */}

              <h1>{selectedCategoryName}</h1>
            </div>
            {/* </div> */}
            <div className={styles.display_flex_wrap}>
              {allArtistLoader ? (
                <>
                  {allArtist
                    .slice() // Create a shallow copy of the array
                    ?.sort((a, b) => a.nick_name.localeCompare(b.nick_name)) // Sort alphabetically by nick_name
                    ?.map((item) => (
                      <div className={styles.feature_artist_card_margin}>
                        <FeatureArtistCard1
                          onChildClick={() => {
                            handleClick(item);
                          }}
                          name={item?.nick_name}
                          category={item?.category?.name}
                          rating={item?.avg_ratting}
                          price={item?.service_charges[0]?.price}
                          symbol={symbol}
                          // artistImg={`https://dev7.sidat.digital/wbs/${item?.profile_image}`}
                          artistImg={`${baseURL}/${item?.profile_image}`}
                          // artistImg={`${baseURL}/${item?.user?.profile_image}`}

                          // imgUrl={require("../src/Asset/Images/home_profile/artist5.png")}
                        />
                      </div>
                    ))}
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* <div style={{ height: 100 }}></div> */}
      </div>
      <Footer />
    </div>
  );
}
export default artist_categories;
