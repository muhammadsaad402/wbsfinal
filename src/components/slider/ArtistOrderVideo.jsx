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

const ArtistOrderVideo = ({ artistVideo }) => {
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
          {artistVideo && artistVideo.length > 0 ? (
            artistVideo?.map((item, i) => (
              <SwiperSlide key={item.id}>
                <div key={item.id}>
                  <FeatureVideoCard
                    imgUrl={
                      // `https://dev7.sidat.digital/wbs/upload/videos/2023/1680248631_e8lSnGCvI90IWFT_saad.mp4`

                      // `${baseURL}/upload/videos/2023/1680248631_e8lSnGCvI90IWFT_saad.mp4`
                      // `${baseURL}+/{item.video}`
                      `${baseURL}/${item.video}`
                    }
                    data={item}
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

export default ArtistOrderVideo;
