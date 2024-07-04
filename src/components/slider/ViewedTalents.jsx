import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FeatureArtistCard from "../../higherComponents/CategoriesToExploreCard";
import styles from "../../../styles/CardSlider.module.css";
import ArtistCard from "../../higherComponents/ArtistCard";
import Router, { withRouter } from "next/router";
import CategoriesToExploreCard from "../../higherComponents/CategoriesToExploreCard";
import TrendingTalentsCard from "../../higherComponents/TrendingTalentsCard";
import ViewedTalentsCard from "../../higherComponents/ViewedTalentsCard";
import localStorage from "local-storage";
import React, { useEffect, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ViewedTalents = ({
  data,
  viewedTalentsLoader,
  setViwedTalentsLoader,
  symbol,
}) => {
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

    localStorage.set("visitedArtist", visitedArtists);
  }

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

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
          {data !== undefined ? (
            data?.map((item) => {
              let imgUrl;

              if (
                item &&
                item.details &&
                item.details.length > 0 &&
                item.details[0].profile_image
              ) {
                imgUrl = `${baseURL}/${item.details[0].profile_image}`;
              } else if (item && item.user && item.user.profile_image) {
                imgUrl = `${baseURL}/${item.user.profile_image}`;
              } else {
                // Handle the case when neither details[0] nor user.profile_image is available
                imgUrl = `${baseURL}/default-image.png`; // You can replace this with a default image URL
              }
              return (
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
                    <ViewedTalentsCard
                      // imgUrl={`https://dev7.sidat.digital/wbs/${item?.profile_image}`}
                      // imgUrl={`${baseURL}/${item?.user?.profile_image}`}
                      // imgUrl={`${baseURL}/${item?.details[0]?.profile_image} || ${baseURL}/${item?.user?.profile_image}`}
                      imgUrl={imgUrl}
                      data={item}
                      symbol={symbol}
                    />
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <SwiperSlide>
              <ArtistCard
                imgUrl={require("../../Asset/Images/home_profile/artist3.png")}
              />
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ViewedTalents;
