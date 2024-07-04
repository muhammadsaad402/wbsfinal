import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useState, useRef } from "react";
import styles from "../../../styles/CardSlider.module.css";
import ArtistCard from "../../higherComponents/ArtistCard";
import Router, { withRouter } from "next/router";
import CategoriesToExploreCard from "../../higherComponents/CategoriesToExploreCard";
import localStorage from "local-storage";
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const CategoriesToExplore = ({ data, symbol }) => {
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

  function updateVisitedArtists(artist) {
    const visitedArtists = localStorage?.get("visitedArtist") || [];

    const existingIndex = visitedArtists?.findIndex(
      (visitedArtist) => visitedArtist?.id === artist?.id
    );

    if (existingIndex !== -1) {
      // Artist already exists, update their visited flag
      visitedArtists[existingIndex].visited = true;
    } else {
      // Artist doesn't exist, add them with the visited flag set to true
      visitedArtists.push({ ...artist, visited: true });
    }

    localStorage?.set("visitedArtist", visitedArtists);
  }

  return (
    <div className={styles.main}>
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
          {data !== undefined ? (
            data?.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  key={item.id}
                  onClick={() => {
                    updateVisitedArtists(item);
                    Router.push({
                      pathname: "/artist_profile",
                      query: { item: item?.id },
                    });
                  }}
                >
                  <CategoriesToExploreCard
                    imgUrl={
                      // `https://dev7.sidat.digital/wbs/${item?.profile_image}`
                      `${baseURL}/${item?.profile_image}`
                      // item.user
                      //   ? `${baseURL}/${item?.user?.profile_image}`
                      //   : `${baseURL}/${item?.profile_image}`
                    }
                    data={item}
                    symbol={symbol}
                  />
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <ArtistCard
                imgUrl={require("../../Asset/Images/home_profile/artist3.png")}
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

export default CategoriesToExplore;
