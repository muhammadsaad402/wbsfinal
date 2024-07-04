import styles from "../../../styles/Testimonials.module.css";
import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Testimonials() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoader, setTestimonialsLoader] = useState(false);
  const GetTestimonials = async () => {
    try {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/testimonials"
      );

      if (response?.data?.status === true) {
        // console.log("response Testimonials", response?.data?.data);
        setTestimonials(response?.data?.data);
        setTestimonialsLoader(true);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    GetTestimonials();
  }, []);

  const swiperRef = useRef(null);

  useEffect(() => {
    // Update the swiperRef whenever the Swiper component updates
    if (swiperRef.current && testimonialsLoader) {
      swiperRef.current.swiper.update();
    }
  }, [testimonialsLoader]);

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
    <>
      <ToastContainer className="tost" />

      {testimonialsLoader ? (
        <div className={styles.testimonials_section}>
          <div className={styles.testimonials_section_content}>
            <h1>testimonials</h1>
            <p>Kind Words From Our Incredible Customers</p>
          </div>

          <div className={styles.testimonials_section_sub}>
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
                    slidesPerView: 5,
                  },
                  1440: {
                    slidesPerView: 4,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  464: {
                    slidesPerView: 2,
                  },
                  0: {
                    slidesPerView: 1,
                  },
                }}
                // loop={true}
              >
                {testimonials &&
                  testimonials.map((item, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.item} key={index}>
                        <div className={styles.item_icon}>
                          <Image
                            src={require("../../../src/Asset/Images/icon.png")}
                            alt="Picture of the icon"
                          />
                        </div>
                        {/* {console.log(item, "checking item data in competed")} */}
                        <p className={styles.message_paragraph}>
                          {item?.comment.charAt(0).toUpperCase() +
                            item?.comment.slice(1)}

                          {/* {console.log(item, "testing for testi")} */}
                        </p>

                        <div className={styles.item_devider}> </div>

                        <div
                          container
                          className={styles.item_profile_container}
                        >
                          <div>
                            <Image
                              alt="complex"
                              src={`${baseUrl}/${item?.user?.profile_image}`}
                              width={100}
                              height={100}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                              }}
                            />
                          </div>

                          <div className={styles.item_rating}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={2.5}
                              precision={item?.rating}
                              readOnly
                            />
                            {/* <p>Jack Walter</p> */}
                            {/* <p>{item?.user?.name}</p> */}
                            <p>
                              {item?.user?.name.charAt(0).toUpperCase() +
                                item?.user?.name.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                {/* <div className={styles.item}>
            <div className={styles.item_icon}>
              <Image
                src={require("../../../src/Asset/Images/icon.png")}
                alt="Picture of the icon"
              />
              1
            </div>

            <p className={styles.message_paragraph}>
              “Quisque massa ipsum luctus at tempus eleifend congue lectus an
              bibendum porttito praesent eliter sapien venenatis nec urna vitae
              pulvinar an fringilla bibe cras axx scelerisque le sem quis
              consectetur dolor vitae lacinia.”
            </p>
            <div className={styles.item_devider}> </div>

            <div container className={styles.item_profile_container}>
              <div>
                <Image
                  alt="complex"
                  sx={{ width: 100, height: 100 }}
                  src={require("../../../src/Asset/Images/Jack_Walter.png")}
                />
              </div>

              <div className={styles.item_rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={5}
                  readOnly
                />
                <p>Jack Walter</p>
              </div>
            </div>
          </div> */}
                {/* <div className={styles.item}>
            <div className={styles.item_icon}>
              <Image
                src={require("../../../src/Asset/Images/icon.png")}
                alt="Picture of the icon"
              />
              2
            </div>

            <p className={styles.message_paragraph}>
              Second div Item Quisque massa ipsum luctus at tempus eleifend
              congue lectus an bibendum porttito praesent eliter sapien
              venenatis nec urna vitae pulvinar an fringilla bibe du non justo
              sodales.
            </p>
            <div className={styles.item_devider}> </div>

            <div container className={styles.item_profile_container}>
              <div>
                <Image
                  alt="complex"
                  sx={{ width: 100, height: 100 }}
                  src={require("../../../src/Asset/Images/Jack_Walter.png")}
                />
              </div>

              <div className={styles.item_rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={5}
                  readOnly
                />
                <p>Jack Walter</p>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_icon}>
              <Image
                src={require("../../../src/Asset/Images/icon.png")}
                alt="Picture of the icon"
              />
              3
            </div>

            <p className={styles.message_paragraph}>
              “Quisque massa ipsum luctus at tempus eleifend congue lectus an
              bibendum porttito praesent eliter sapien venenatis nec urna vitae
              pulvinar an fringilla bibe cras axx scelerisque le sem quis
              consectetur dolor vitae lacinia.”
            </p>
            <div className={styles.item_devider}> </div>

            <div container className={styles.item_profile_container}>
              <div>
                <Image
                  alt="complex"
                  sx={{ width: 100, height: 100 }}
                  src={require("../../../src/Asset/Images/Jack_Walter.png")}
                />
              </div>

              <div className={styles.item_rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={5}
                  readOnly
                />
                <p>Jack Walter</p>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_icon}>
              <Image
                src={require("../../../src/Asset/Images/icon.png")}
                alt="Picture of the icon"
              />
              4
            </div>

            <p className={styles.message_paragraph}>
              Second div Item Quisque massa ipsum luctus at tempus eleifend
              congue lectus an bibendum porttito praesent eliter sapien
              venenatis nec urna vitae pulvinar an fringilla bibe du non justo
              sodales.
            </p>
            <div className={styles.item_devider}> </div>

            <div container className={styles.item_profile_container}>
              <div>
                <Image
                  alt="complex"
                  sx={{ width: 100, height: 100 }}
                  src={require("../../../src/Asset/Images/Jack_Walter.png")}
                />
              </div>

              <div className={styles.item_rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={5}
                  readOnly
                />
                <p>Jack Walter</p>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <div className={styles.item_icon}>
              <Image
                src={require("../../../src/Asset/Images/icon.png")}
                alt="Picture of the icon"
              />
              5
            </div>

            <p className={styles.message_paragraph}>
              Second div Item Quisque massa ipsum luctus at tempus eleifend
              congue lectus an bibendum porttito praesent eliter sapien
              venenatis nec urna vitae pulvinar an fringilla bibe du non justo
              sodales.
            </p>
            <div className={styles.item_devider}> </div>

            <div container className={styles.item_profile_container}>
              <div>
                <Image
                  alt="complex"
                  sx={{ width: 100, height: 100 }}
                  src={require("../../../src/Asset/Images/Jack_Walter.png")}
                />
              </div>

              <div className={styles.item_rating}>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={5}
                  readOnly
                />
                <p>Jack Walter</p>
              </div>
            </div>
          </div> */}
              </Swiper>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
