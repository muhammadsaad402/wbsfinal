import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useState, useRef } from "react";

import styles from "../../../styles/CardSlider.module.css";
import ArtistCard from "../../higherComponents/ArtistCard";
import Router, { withRouter } from "next/router";
import FeatureVideoCard from "../../higherComponents/FeatureVideoCard";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import axios from "axios";

const FeatureVideo = ({ data, symbol }) => {
  const [featureVideos, setFeatureVideos] = useState([]);
  useEffect(() => {
    // Define the API URL
    const apiUrl = "/api/feature-videos"; // Replace with your actual API URL

    // Fetch data using Axios
    axios
      .get(`${baseURL}${apiUrl}`)
      .then(function (response) {
        if (response?.data?.status === true) {
          const featurevideos = response?.data?.data;
          if (featurevideos.length > 0) {
            setFeatureVideos(featurevideos);
          } else {
            // Handle the case where featurevideos is empty
            console.warn("Feature videos array is empty.");
          }
        } else {
          // Handle the case where the API response has status false
          console.error("API response status is false.");
        }

        // Set the fetched data to the state
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const swiperRef = useRef(null);

  const slideNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const slidePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div
      className={styles.main}
      // style={{ height: "100%", width: "97%", marginTop: 50 }}
    >
      <div className={styles.swiper_parent}>
        <div className={styles.btn_parent}>
          <div className="swiper-button-prev" onClick={slidePrev}></div>
          <div className="swiper-button-next" onClick={slideNext}></div>
        </div>

        <Swiper
          ref={swiperRef} // Assign the swiperRef to the Swiper component
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={5}
          spaceBetween={24}
          breakpoints={{
            1920: {
              slidesPerView: 7,
            },
            1440: {
              slidesPerView: 6,
            },
            1024: {
              slidesPerView: 5,
            },
            464: {
              slidesPerView: 4,
            },
            0: {
              slidesPerView: 2,
            },
          }}
          // loop={true}
        >
          {featureVideos !== undefined ? (
            featureVideos?.map((item, i) => (
              <SwiperSlide key={item.id}>
                <div key={item.id}>
                  <FeatureVideoCard
                    imgUrl={
                      // `https://dev7.sidat.digital/wbs/upload/videos/2023/1680248631_e8lSnGCvI90IWFT_saad.mp4`

                      // `${baseURL}/upload/videos/2023/1680248631_e8lSnGCvI90IWFT_saad.mp4`
                      `${baseURL}/${item?.video}`
                    }
                    data={item}
                    symbol={symbol}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <FeatureVideoCard
                imgUrl={
                  // `https://dev7.sidat.digital/wbs/upload/videos/2023/1680248631_e8lSnGCvI90IWFT_saad.mp4`
                  `${baseURL}/upload/videos/2023/1680248631_e8lSnGCvI90IWFT_saad.mp4`
                }
              />
            </SwiperSlide>
          )}

          {/* <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist5.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist6.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist7.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist5.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist6.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist7.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist5.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist6.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist7.png")}
          />
        </div>
        <div>
          <FeatureArtistCard
            imgUrl={require("../../Asset/Images/home_profile/artist5.png")}
          />
        </div> */}
        </Swiper>
      </div>
    </div>
  );
};

export default FeatureVideo;
