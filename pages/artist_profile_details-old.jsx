/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import Head from "next/head";
import styles from "../styles/EditProfile.module.css";
import React from "react";
import Image from "next/image";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "../src/higherComponents/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import { Api } from "../src/config/Config";
import { reactLocalStorage } from "reactjs-localstorage";
import { useRouter } from "next/router";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { width } from "@mui/system";
import localStorage from "local-storage";
import avatarImg from "../src/Asset/Images/avatar.png";
// import usericon from "../src/Asset/Images/usericon.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Chip from "@mui/material/Chip";
function artist_profile_details() {
  const [date, setDate] = useState();
  const [category, setCategory] = React.useState({});
  const [nickName, setNickname] = useState("");
  const router = useRouter();
  useEffect(() => {
    const data = reactLocalStorage.getObject("loginAuth");
    if (Object.keys(data).length === 0) {
      router.push("/login");
    }
  }, []);
  const [bio, setBio] = useState("");
  const [click, setOnclick] = useState(false);
  const [categoryList, setCategoryList] = React.useState();
  const [FAQS, setFAQS] = useState();
  const [FAQSAnswer, setFAQSAnswer] = useState([]);
  const [value, setValue] = useState("");

  // const [value, setValue] = useState(dayjs("2014-08-18T21:11:54"));
  // const [value, setValue] = useState(dayjs(""));

  const [socialMedia, setSocialMedia] = useState({ fb: "", tw: "", inst: "" });
  const [isValidTwitterLink, setIsValidTwitterLink] = useState(true);
  const [isValidFacebookLink, setIsValidFacebookLink] = useState(true);
  const [isValidInstagramLink, setIsValidInstagramLink] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [chips, setChips] = useState([]);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddChip = () => {
    if (inputValue.trim() !== "") {
      setChips([...chips, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setChips(chips.filter((chip) => chip !== chipToDelete));
  };
  const handleTwitterInputChange = (e) => {
    const inputValue = e.target.value.trim();

    const twitterUrlPattern =
      /^(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/;
    setSocialMedia((prev) => ({ ...prev, tw: inputValue }));

    if (twitterUrlPattern.test(inputValue)) {
      setIsValidTwitterLink(true);
    } else {
      setIsValidTwitterLink(false);
    }
  };

  const handleFacebookInputChange = (e) => {
    const inputValue = e.target.value.trim();
    const facebookUrlPattern =
      /^(https?:\/\/)?(www\.)?facebook\.com\/[A-Za-z0-9_.-]+(\?[^/]+)?$/;

    setSocialMedia((prev) => ({ ...prev, fb: inputValue }));

    if (facebookUrlPattern.test(inputValue)) {
      setIsValidFacebookLink(true);
    } else {
      setIsValidFacebookLink(false);
    }
  };

  const handleInstagramInputChange = (e) => {
    const inputValue = e.target.value.trim();
    // Regular expression to match Instagram profile links
    const instagramProfilePattern =
      /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.-]+\/?$/;
    setSocialMedia((prev) => ({ ...prev, inst: inputValue }));

    if (instagramProfilePattern.test(inputValue)) {
      setIsValidInstagramLink(true);
    } else {
      setIsValidInstagramLink(false);
    }
  };
  const [fields, setFields] = useState([
    // { questionId: "", answer: "" },
    // { questionId: "", answer: "" },
    // { questionId: "", answer: "" },
  ]);
  // useEffect(() => {
  //   console.log("Initial value:", value);
  // }, []);
  const [newImage, setNewImage] = useState(null);

  let localData = "";
  if (typeof window !== "undefined") {
    // Perform localStorage action
    localData = localStorage.get("loginAuth");
  } else {
    localData = "";
  }
  // console.log(localData?.user?.profile_image);
  const handleChange1 = (index, event, item) => {
    const newFields = [...fields];
    newFields[index].questionId = item?.id;
    newFields[index].answer = event.target.value;
    setFields(newFields);
  };
  const getArtistData = async () => {
    const data = reactLocalStorage.getObject("loginAuth");
    const artistdata = reactLocalStorage.getObject("isArtist");
    const artistId = artistdata?.data?.id;
    const token = data?.authorisation?.token;
    const userId = data?.user?.id;
    await axios
      .get(
        // `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?artist_id=${artistId}`,
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?user_id=${userId}&artist_id=${artistId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        setNickname(response?.data?.data?.nick_name);
        setSocialMedia((prev) => ({
          ...prev,
          tw: response?.data?.data?.twitter,
        }));
        setSocialMedia((prev) => ({
          ...prev,
          fb: response?.data?.data?.facebook,
        }));
        setSocialMedia((prev) => ({
          ...prev,
          inst: response?.data?.data?.instagram,
        }));
        setCategory({
          id: response?.data?.data?.category?.id,
          name: response?.data?.data?.category?.name,
        });
        // setValue(response?.data?.data?.dob);
        const initialDOB = response?.data?.data?.dob;
        setValue(initialDOB ? dayjs(initialDOB) : "");
        setDate(initialDOB);
        setBio(response?.data?.data?.bio);
        setFAQSAnswer(response?.data?.data?.artist_answer);
        setChips(response?.data?.data?.tags);
      })
      // .catch(function (error) {});
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          // alert("token expire");
          toast.error("Unauthorized");
          reactLocalStorage?.remove("loginAuth");
          router.push("/login");
        } else {
          console.error("Error: ", error);
        }
      });
  };
  FAQSAnswer?.forEach((answer) => {
    FAQSAnswer[answer?.faq_id] = answer?.answer;
  });
  const count = useSelector((state) => state?.counter);
  const handleChange = (event) => {
    setFields([]);
    setCategory(event.target.value);
  };
  // const dateHandler = (newValue) => {
  //   setValue(newValue);
  //   setDate(`${newValue?.$D}-${newValue?.$M + 1}-${newValue?.$y}`);
  // };
  function isValidDate(dateString) {
    const dateObject = new Date(dateString);
    return !isNaN(dateObject);
  }

  const dateHandler = (event) => {
    const selectedDate = event.target.value;
    // console.log("Selected date:", selectedDate);

    // Update the value state with the selected date
    // setValue(dayjs(selectedDate));
    // setDate(selectedDate);
    if (isValidDate(selectedDate)) {
      // Update the value state with the selected date
      setValue(dayjs(selectedDate));
      setDate(selectedDate);
    } else {
      // Handle invalid date, e.g., show an error message or perform some action
      // console.log("Invalid date:", selectedDate);
    }
  };
  useEffect(() => {
    getCatrgory();
    getArtistData();
  }, []);
  const getCatrgory = () => {
    axios
      .get(
        // Api?.get_CATEGORY,
        process.env.NEXT_PUBLIC_BASE_URL + "/api/talent-categories",
        {}
      )
      .then(function (response) {
        setCategoryList(response?.data?.data);
      })
      .catch(function (error) {});
  };

  useEffect(() => {
    getAllFAQS();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
  const getAllFAQS = () => {
    axios
      .get(
        // `${Api?.get_ALL_FAQS}${category?.id}`
        `${baseURL}/api/faq-by-talent?category_id=${category?.id}`,

        {}
      )
      .then(function (response) {
        setFAQS(response?.data?.data);
        response?.data?.data.map((item) => {
          fields.push({ questionId: "", answer: "" });
        });
      })
      .catch(function (error) {});
  };

  const addRegistration = async () => {
    setOnclick(true);
    const data = reactLocalStorage.getObject("loginAuth");
    const token = data?.authorisation?.token;
    const user_id = data?.user?.id;
    if (data !== "" && data?.user?.user_type === "user") {
      await axios
        .post(
          // Api?.ADD_REGISTRATION,
          `${baseURL}/api/artist/registration`,
          {
            user_id: user_id,
            nick_name: nickName,
            category: category?.name,
            categoryId: category?.id,
            brief_your_talent: bio,
            DOB: date,
            tags: chips,
            twitter: socialMedia?.tw,
            facebook: socialMedia?.fb,
            instagram: socialMedia?.inst,
            profile_image: localData?.updated_data
              ? localData?.updated_data?.profile_image
              : localData?.user?.profile_image,
            Zodiac_sign: "none",
            AnswerOfCategoryQuestion: fields,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          if (response?.data?.status === true) {
            toast.success(response?.data?.message);
            // toast.warn("Please login Again");
            // reactLocalStorage?.remove("loginAuth");
            // router.push({
            //   pathname: "/login",
            // });

            router.push("/artist_recording");
          }

          setOnclick(false);
          if (response?.data?.status === false) {
            // toast.warn(response?.data?.message)
            toast.warn(response?.data?.message);
            // router.push("/");

            toast.warn("please login again");
            reactLocalStorage?.remove("loginAuth");
            router.push({
              pathname: "/login",
            });
          }
        })
        .catch(function (error) {
          setOnclick(false);
          toast.error(
            error?.response?.data?.errors?.DOB
              ? error?.response?.data?.errors?.DOB[0]
              : error?.response?.data?.errors?.tags
              ? error?.response?.data?.errors?.tags[0]
              : error?.response?.data?.errors?.brief_your_talent
              ? error?.response?.data?.errors?.brief_your_talent[0]
              : error?.response?.data?.errors?.categoryId
              ? error?.response?.data?.errors?.categoryId[0]
              : error?.response?.data?.errors?.brief_your_talent
              ? error?.response?.data?.errors?.brief_your_talent[0]
              : error?.response?.data?.errors?.nick_name
              ? error?.response?.data?.errors?.nick_name[0]
              : error?.response?.data?.errors?.profile_image
              ? `${error?.response?.data?.errors?.profile_image[0]} Please goto edit user profile and add profile Image`
              : `${error?.response?.data?.message} please login again`
          );
        });
    }

    if (data !== "" && data?.user?.user_type === "artist") {
      await axios
        .post(
          // Api?.EDIT_REGISTRATION,
          `${baseURL}/api/artist/update`,

          {
            user_id: user_id,
            nick_name: nickName,
            category: category?.name,
            categoryId: category?.id,
            brief_your_talent: bio,
            DOB: date,
            tags: chips,
            twitter: socialMedia?.tw,
            facebook: socialMedia?.fb,
            instagram: socialMedia?.inst,
            Zodiac_sign: "none",
            AnswerOfCategoryQuestion: fields,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(function (response) {
          if (response?.data?.status === true) {
            toast.error(
              // `${response?.data?.message},Please login again to see your changes`
              response?.data?.message
            );
            toast.warn("Please login again to see your changes");
          }
          setOnclick(false);
        })
        .catch(function (error) {
          setOnclick(false);
          toast.error(
            error?.response?.data?.errors?.DOB
              ? error?.response?.data?.errors?.DOB[0]
              : error?.response?.data?.errors?.tags
              ? error?.response?.data?.errors?.tags[0]
              : error?.response?.data?.errors?.brief_your_talent
              ? error?.response?.data?.errors?.brief_your_talent[0]
              : error?.response?.data?.errors?.categoryId
              ? error?.response?.data?.errors?.categoryId[0]
              : error?.response?.data?.errors?.brief_your_talent
              ? error?.response?.data?.errors?.brief_your_talent[0]
              : error?.response?.data?.errors?.nick_name
              ? error?.response?.data?.errors?.nick_name[0]
              : error?.response?.data?.errors?.profile_image
              ? error?.response?.data?.errors?.profile_image[0]
              : `${error?.response?.data?.message} please login again`
          );
        });
    }
    // setDate("");
  };
  const [preview, setPreview] = useState("");
  const [localImage, setLocalImage] = useState("");
  const UploadImage = (e) => {
    setNewImage(e.target.files[0]);
    if (e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setPreview(imageUrl);
    }
  };
  useEffect(() => {
    getLocalImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getLocalImage = async () => {
    if (localData !== null) {
      setLocalImage(
        localData?.updated_data
          ? localData?.updated_data?.profile_image
          : localData?.user?.profile_image
      );
    } else {
      // setRouteName('Onboarding');
    }
  };
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <>
      <div className={styles.container}>
        <Topbar />
        <ToastContainer className="tost" />

        <div
          className={styles.edit_profile_card_width_90}
          // style={{
          //   width: "90%",
          //   height: 1,
          //   backgroundColor: "#fff",
          //   margin: "auto",
          // }}
        ></div>

        <h1
          className={styles.edit_profile_card_heading}
          // style={{
          //   color: "#CEA234",
          //   textAlign: "center",
          //   fontWeight: "bold",
          //   fontSize: 40,
          // }}
        >
          ADD TALENT PROFILE DETAILS
        </h1>

        <div
          className={styles.edit_profile_card_width_50}
          // style={{
          //   width: "50%",
          //   backgroundColor: "#1B1B1B",
          //   alignItems: "center",
          //   display: "flex",
          //   flexDirection: "column",
          //   marginBottom: "30px",
          // }}
        >
          <div
            className={styles.edit_profile_card_margintop_40}
            // style={{ marginTop: 40 }}
          >
            {/* <label
              name="image"
              style={{ height: "100%", width: "100%", cursor: "pointer" }}
            > */}
            {/* picture */}
            {/* {console.log(`${Api?.BASE_URL}/${localData?.user?.profile_image}`)} */}
            {/* {
                newImage ? (<img
                  style={{ borderRadius: "50%" }}
                  height={"100px"}
                  width={"100px"}
                  src={preview}
                  alt=""
                />
                )
                  : ( */}
            <img
              className={styles.artist_profile_details_img}
              // style={{ borderRadius: "50%" }}
              // height={"100px"}
              // width={"100px"}
              //   src={
              //     localImage
              //       ? `https://dev7.sidat.digital/wbs/${localImage}`
              //       : "https://tse4.mm.bing.net/th?id=OIP.D9deVyI7Im7FxHbVTGss-QHaIH&pid=Api&P=0"
              //   }
              //   alt=""
              // />
              src={
                localImage
                  ? `${baseURL}/${localImage}`
                  : "https://tse4.mm.bing.net/th?id=OIP.D9deVyI7Im7FxHbVTGss-QHaIH&pid=Api&P=0"
              }
              alt=""
            />

            {/* )
              } */}
            {/* </label> */}
            {/* {newImage ? <p>Change Image</p> : <p>upload Image</p>} */}

            {/* <Avatar
                alt="Remy Sharp"
                src={`https://dev7.sidat.digital/wbs/${
                  localData?.updated_data
                    ? localData?.updated_data?.profile_image
                    : localData?.user?.profile_image
                }`}
                sx={{ width: 80, height: 80 }}
              /> */}
            {/* </div> */}
          </div>
          <div
            className={styles.artist_profile_details_width_90}
            // style={{ width: "90%" }}
          >
            <h2

            // style={{ color: "white", fontWeight: "bold" }}
            >
              Do you have any nick name as well? if yes,please type
            </h2>
            <input
              type="text"
              name="name"
              placeholder={"Any Name"}
              FormHelperTextProps={{ style: { color: "white" } }}
              className={styles.artist_profile_details_input_field}
              // style={{
              //   width: "100%",
              //   height: 45,
              //   borderRadius: 8,
              //   backgroundColor: "transparent",
              //   borderColor: "white",
              //   borderStyle: "solid",
              //   paddingLeft: 20,
              //   color: "white",
              //   fontSize: 16,
              //   backgroundColor: "#000",
              // }}
              value={nickName}
              onChange={(e) => {
                setNickname(e.target.value);
              }}
            />
          </div>

          <div
            // style={{ width: "90%" }}
            className={styles.artist_profile_details_width_90}
          >
            <h2
            // style={{ color: "white", fontWeight: "bold" }}
            >
              Which category do you want us to add your talent?
            </h2>
            {/* <input
              type="text"
              name="email"
              placeholder={"Any Name"}
              FormHelperTextProps={{ style: { color: "white" } }}
              style={{
                width: "100%",
                height: 45,
                borderRadius: 8,
                backgroundColor: "transparent",
                borderColor: "white",
                borderStyle: "solid",
                paddingLeft: 20,
                color: "white",
                fontSize: 16,
              }}
            /> */}
            <FormControl
              fullWidth
              // style={{
              //   color: "white",
              //   borderStyle: "solid",
              //   borderColor: "#FFF",
              //   borderWidth: "1px",
              //   borderRadius: 8,
              // }}
              className={styles.drop_down}
            >
              <Select
                className={styles.artist_profile_details_select}
                // style={{
                //   color: "#fff",
                //   borderRadius: 8,
                //   backgroundColor: "#000",
                //   color: "#fff",
                // }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
                style={{ color: "#fff" }}
              >
                {/* {console.log(category)} */}
                <MenuItem value={category ? category : "Select"}>
                  {category && category.name
                    ? category.name + " Selected"
                    : "Select"}
                </MenuItem>

                {categoryList?.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item?.name}
                  </MenuItem>
                ))}

                {/* <MenuItem value={item?.id}>{item?.name}</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </div>

          <div
            className={styles.artist_profile_details_width_90}

            // style={{ width: "90%" }}
          >
            <h2
            // style={{ color: "white", fontWeight: "bold" }}
            >
              Small Brief about your talent
            </h2>

            <textarea
              placeholder={"Description about yout talent"}
              className={styles.artist_profile_details_input_textarea}
              // style={{
              //   width: "100%",
              //   height: 200,
              //   borderRadius: 8,
              //   backgroundColor: "transparent",
              //   borderColor: "white",
              //   borderStyle: "solid",
              //   padding: 20,
              //   color: "white",
              //   fontSize: 16,
              //   backgroundColor: "#000",
              //   // marginBottom: "10px",
              // }}
              value={bio}
              onChange={(e) => {
                // setBio(e.target.value);
                const text = e.target.value;
                if (text.length <= 500) {
                  setBio(text);
                }
              }}
            />
            <p style={{ color: "white" }}>
              Character Count: {bio?.length} / 500
              <br />
              {/* Remaining Characters: {500 - bio?.length ? bio?.length : 0} */}
            </p>
          </div>
          <div className={styles.artist_profile_details_width_90}>
            <h2
            // style={{ color: "white", fontWeight: "bold" }}
            >
              Tags
            </h2>
            <div className={styles.artist_profile_details_parent_input_field}>
              <TextField
                style={{ color: "#fff" }}
                // className={styles.artist_profile_details_input_field}
                // label="Chips"
                // variant="outlined"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddChip();
                  }
                }}
              />
              <button onClick={handleAddChip}>Add</button>
            </div>
            <Stack
              direction="row"
              spacing={1}
              marginTop={2}
              className={styles.tag_parent}
            >
              {chips?.map((chip, index) => (
                <Chip
                  style={{ color: "#fff", background: "#b38206", margin: "0" }}
                  key={index}
                  label={chip}
                  onDelete={() => handleDeleteChip(chip)}
                />
              ))}
            </Stack>
          </div>
          <div
            className={styles.artist_profile_details_width_90}

            //  style={{ width: "90%" }}
          >
            <h2
            // style={{ color: "white", fontWeight: "bold" }}
            >
              Few Question we like to know more about your
            </h2>
            <h2
            // style={{ color: "white", fontWeight: "bold" }}
            >
              When was you born?
            </h2>
            {/* <DatePicker date={date} setDate={setDate} /> */}
            {/* <Stack component="form" noValidate spacing={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className={styles.artist_profile_details_input_field}
                  // label="Date Of Birth"
                  placeholder="DD/MM/YYYY"
                  inputFormat="DD/MM/YYYY"
                  value={value}
                  onChange={dateHandler}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "white",
                            // backgroundColor: "#000",
                            color: "#fff",
                          },
                          "&:hover fieldset": {
                            borderColor: "grey",
                          },
                        },
                        svg: { color: "#fff" },
                        input: { color: "#fff" },
                        label: { color: "#fff" },
                      }}
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </Stack> */}

            <input
              type="date"
              name="date"
              placeholder={"DD/MM/YYYY"}
              FormHelperTextProps={{ style: { color: "white" } }}
              className={styles.artist_profile_details_input_field}
              // value={value} // mandatory
              value={value?.format ? value.format("YYYY-MM-DD") : value || ""} // Format date for input value
              onChange={dateHandler}
            />
          </div>

          <div
            className={styles.artist_profile_details_width_90}

            // style={{ width: "90%", marginTop: 20 }}
          >
            <h2
            // style={{ color: "white", fontWeight: "bold" }}
            >
              Social Media Profile
            </h2>
            <input
              type="text"
              name="twitter"
              placeholder={"https://twitter.com/profile_name"}
              FormHelperTextProps={{ style: { color: "white" } }}
              className={styles.artist_profile_details_input_field}
              value={socialMedia?.tw} // mandatory
              // onChange={(e) => {
              //   // mandatory
              //   setSocialMedia((prev) => ({ ...prev, tw: e.target.value }));

              // }}
              onChange={handleTwitterInputChange}
            />
            {!isValidTwitterLink && (
              <p style={{ color: "red" }}>
                Invalid Twitter link. Please enter a valid Twitter URL.
              </p>
            )}
            <div
              className={styles.artist_profile_details_height_20}
              // style={{ height: 20 }}
            ></div>
            <input
              type="text"
              name="facebook"
              placeholder={"https://www.facebook.com/profile.name"}
              FormHelperTextProps={{ style: { color: "white" } }}
              className={styles.artist_profile_details_input_field}
              // style={{
              //   width: "100%",
              //   height: 45,
              //   borderRadius: 8,
              //   backgroundColor: "transparent",
              //   borderColor: "white",
              //   borderStyle: "solid",
              //   paddingLeft: 20,
              //   color: "white",
              //   fontSize: 16,
              //   backgroundColor: "#000",
              // }}
              value={socialMedia?.fb} // mandatory
              // onChange={(e) => {
              //   // mandatory
              //   setSocialMedia((prev) => ({ ...prev, fb: e.target.value }));
              // }}
              onChange={handleFacebookInputChange}
            />
            {!isValidFacebookLink && (
              <span style={{ color: "red" }}>Invalid Facebook link</span>
            )}
            <div
              className={styles.artist_profile_details_height_20}

              // style={{ height: 20 }}
            ></div>
            <input
              type="text"
              name="instagram"
              placeholder={"https://www.instagram.com/profilename"}
              FormHelperTextProps={{ style: { color: "white" } }}
              className={styles.artist_profile_details_input_field}
              // style={{
              //   width: "100%",
              //   height: 45,
              //   borderRadius: 8,
              //   backgroundColor: "transparent",
              //   borderColor: "white",
              //   borderStyle: "solid",
              //   paddingLeft: 20,
              //   color: "white",
              //   fontSize: 16,
              //   backgroundColor: "#000",
              // }}
              value={socialMedia?.inst} // mandatory
              // onChange={(e) => {
              //   // mandatory
              //   setSocialMedia((prev) => ({ ...prev, inst: e.target.value }));
              // }}
              onChange={handleInstagramInputChange}
            />
            {!isValidInstagramLink && (
              <span style={{ color: "red" }}>
                Invalid Instagram profile link
              </span>
            )}
          </div>

          {/* <div style={{  width: "90%", marginTop: 20 }}>
            <h2 style={{ color: "white", fontWeight: "bold" }}>
              Your Zodiac sign?
            </h2>
            <input
              type="text"
              name="Any Name"
              placeholder={"Any Name"}
              FormHelperTextProps={{ style: { color: "white" } }}
              style={{
                width: "100%",
                height: 45,
                borderRadius: 8,
                backgroundColor: "transparent",
                borderColor: "white",
                borderStyle: "solid",
                paddingLeft: 20,
                color: "white",
                fontSize: 16,
              }}
              value={zodiacSign}
              onChange={(e) => {
                setZodiacSign(e.target.value);
              }}
            />
          </div> */}

          <div
            className={styles.artist_profile_details_width_90}

            // style={{ width: "90%", marginTop: 20 }}
          >
            {FAQS &&
              FAQS?.map((item, index) => (
                <>
                  <h2
                  // style={{ color: "white", fontWeight: "bold" }}
                  >
                    {item?.question_artist}
                  </h2>
                  <input
                    key={item?.id}
                    type="text"
                    name="Answer"
                    placeholder={"Answer"}
                    FormHelperTextProps={{ style: { color: "white" } }}
                    className={styles.artist_profile_details_input_field}
                    // style={{
                    //   width: "100%",
                    //   height: 45,
                    //   borderRadius: 8,
                    //   backgroundColor: "transparent",
                    //   borderColor: "white",
                    //   borderStyle: "solid",
                    //   paddingLeft: 20,
                    //   color: "white",
                    //   fontSize: 16,
                    //   marginBottom: 40,
                    //   backgroundColor: "#000",
                    // }}
                    value={FAQSAnswer ? FAQSAnswer[item.id] : item.answer}
                    onChange={(event) => handleChange1(index, event, item)}
                  />
                  {/* Display the corresponding answer from the mapping */}
                  {/* <p>{FAQSAnswer[item.id]}</p> */}
                  {/* {console.log(item, "testing")} */}
                </>
              ))}
          </div>
          <Box sx={{ display: click ? "flex" : "none", marginBottom: 10 }}>
            <CircularProgress />
          </Box>
          <button
            className={styles.artist_profile_details_button}
            style={{
              // width: 280,
              // height: 50,
              // borderRadius: 30,
              // alignItems: "center",
              // backgroundColor: "#CEA234",
              // color: "#000",
              // fontSize: 20,
              // marginTop: 20,
              // marginBottom: 20,
              display: click ? "none" : "",
            }}
            onClick={addRegistration}
          >
            Save Changes
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}
export default artist_profile_details;
