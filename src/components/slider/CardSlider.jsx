/* eslint-disable react/jsx-key */
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../../../styles/CardSlider.module.css";
import ArtistCard from "../../higherComponents/ArtistCard";
import axios from "axios";
import { Api } from "../../config/Config";
import React, { useEffect, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const CardSlider = () => {
  const [latestContent, setLatestContent] = useState();
  const [latestContentLoader, setLatestContentLoader] = useState(false);
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const swiperRef = useRef(null);

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && latestContentLoader) {
      swiperRef.current.swiper.update();
    }
  }, [latestContentLoader]);

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

  const getLatestContent = (content) => {
    axios
      .get(
        // Api?.GET_LATEST_CONTENT
        `${baseURL}/api/latest-content`
      )
      .then((response) => {
        setLatestContent(response.data.data);
        setLatestContentLoader(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getLatestContent();
  }, []);

  return (
    <div className={styles.swiper_parent}>
      <div className={styles.btn_parent}>
        <div className="swiper-button-prev" onClick={slidePrev}></div>
        <div className="swiper-button-next" onClick={slideNext}></div>
      </div>
      {latestContentLoader ? (
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
              slidesPerView: 5,
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
          {latestContent?.map((content, i) => {
            // setTimeout(() => {
            return (
              <SwiperSlide key={i}>
                <div className={styles.card}>
                  <Image
                    // src={`${Api?.BASE_URL}/${content.profile_image}`}
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}/${content.profile_image}`}
                    width={200}
                    height={200}
                    alt=""
                  />
                  <div className={styles.card_content}>
                    <h2>{content.name}</h2>

                    {/* <p>{data.price}</p> */}
                    <p>{content?.category?.name}</p>

                    <p className={styles.button}>
                      {content.service_charges[0]?.price}
                    </p>
                  </div>
                </div>
              </SwiperSlide>

              //             // <div >
              //               {/* <img src={`${Api?.BASE_URL}/${content.profile_image}`} alt={content.name}/>
              //  {content.name}
              //  {content.category.name}
              //  {content.service_charges[0].price} */}
              //               {/* <ArtistCard
              //                 className={styles.video_card}
              //                 data={content}
              //                 id={content?.id}
              //                 imgUrl={`${Api?.BASE_URL}/${content.profile_image}`}
              //                 name={content.name}
              //                 category={content?.category?.name}
              //                 price={content.service_charges[0]?.price}
              //               /> */}
            );
            // }, i * 10000);
          })}
          {/* <div></div> */}

          {/* {latestContent?.map((content, i) => {
   setTimeout(() => {
     return (
       <div key={i}>
         <ArtistCard
           data={content}
           id={content?.id}
           imgUrl={`${Api?.BASE_URL}/${content.profile_image}`}
           name={content.name}
           category={content.category.name}
           price={content.service_charges[0]?.price}
         />
       </div>
     );
   }, i * 3000);
 })} */}
        </Swiper>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardSlider;
