/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import styles from "../styles/ArtistSelectService.module.css";
import Footer from "../src/components/footer/Footer";
import Topbar from "../src/components/topbar/Topbar";
import SelectFullWidth from "../src/higherComponents/SelectFullWidth";
import Table from "@mui/material/Table";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FullWidthTextfield from "../src/higherComponents/FullWidthTextField";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useRouter } from "next/router";

function artist_add_document() {
  const [document, setDocument] = useState([]);
  const [documentLoader, setDocumentLoader] = useState(false);

  const [click, setOnclick] = useState(false);
  // const [artists, setArtists] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentList, setDocumentList] = useState([]);
  const [documentListLoader, setDocumentListLoader] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const data = reactLocalStorage.getObject("loginAuth");
    if (Object.keys(data).length === 0) {
      router.push("/login");
    }
    getArtistData();
  }, []);
  const [testId, setTestId] = useState(1);
  const [title, setTitle] = useState("");

  // const changeHandler = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };
  const changeHandler = (event) => {
    // setSelectedFile(event.target.files[0]);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (allowedTypes.includes(selectedFile.type)) {
        setSelectedFile(selectedFile);
      } else {
        // Display an error message for unsupported file types
        toast.error(
          "Unsupported file type. Please select a PNG, JPG, or PDF file."
        );
      }
    }
  };

  const handleSubmission = async (event) => {
    setOnclick(true);
    const data = reactLocalStorage.getObject("loginAuth");
    const token = data?.authorisation?.token;
    const user_id = data?.user?.id;

    const artistdata = reactLocalStorage.getObject("isArtist");
    const artistId = artistdata?.data?.id;

    // Check if there are any null files in if (documentList.some documentList
    if (
      documentList.some((item) => item.file === null || item.title === null)
    ) {
      toast.error("Please upload a file for all documents before submitting.");
      setOnclick(false); // Reset the button state
      return; // Prevent further execution
    }

    // event.preventDefault();
    const formData = new FormData();
    documentList.map((item) => {
      formData.append("artist_id", artistId);
      formData.append("user_id", user_id);
      formData.append("title[]", item?.title);
      formData.append("file[]", item?.file);
    });

    try {
      const response = await axios({
        method: "post",
        url:
          process.env.NEXT_PUBLIC_BASE_URL +
          "/api/artist/registration_certificates",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer  ${token}`,
        },
      });
      if (response?.data?.status === true) {
        toast.success(
          response?.data?.message
            ? // ? `${response?.data?.message}, Please login again to see your changes`
              response?.data?.message
            : response?.data?.error
        );
        router.push("/");
      }
      if (response?.data?.status === false) {
        toast.warn(
          response?.data?.message
            ? response?.data?.message
            : response?.data?.error
        );

        // router.push("/artist_service_charges");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.errors?.title
          ? error?.response?.data?.errors?.title
          : // : `${error?.response?.data?.message} please login again`
            error?.response?.data?.message
      );
    }

    setOnclick(false);

    getArtistData();
  };

  const deleteArtistData = async (id) => {
    const data = reactLocalStorage.getObject("loginAuth");
    const token = data?.authorisation?.token;
    await axios
      .get(
        // `https://dev7.sidat.digital/wbs/api/artist/document-delete/${id}`
        process.env.NEXT_PUBLIC_BASE_URL + "/api/artist/document-delete/" + id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        toast.success(response?.data?.message);
        getArtistData();
      })
      .catch(function (error) {});
  };
  const getArtistData = async () => {
    const data = reactLocalStorage.getObject("loginAuth");
    const artistdata = reactLocalStorage.getObject("isArtist");
    const artistId = artistdata?.data?.id;
    const token = data?.authorisation?.token;
    const userId = data?.user?.id;

    await axios
      .get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/artist/profile-details?user_id=${userId}&artist_id=${artistId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        setDocument(response?.data?.data?.documents);
        setDocumentLoader(true);
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

  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const addItemAndSubmit = async () => {
    const emptyFields = [];

    if (!title) {
      emptyFields.push("Title");
    }

    if (!selectedFile) {
      emptyFields.push("Selected File");
    }

    if (emptyFields.length > 0) {
      // Display an error message with the names of empty fields
      toast.error(
        `Please fill in the following required fields: ${emptyFields.join(
          ", "
        )}`
      );
      return; // Exit the function without submitting
    }
    // First, add the item to the documentList
    setTestId(testId + 1);
    documentList.push({
      id: testId,
      title: title,
      file: selectedFile,
    });
    setSelectedFile("");
    setTitle("");

    // Then, call handleSubmission to submit the data
    await handleSubmission();
    // Reset the form and documentList after successful submission
    setSelectedFile(null); // Reset the selected file
    setTitle(""); // Reset the title input
    setDocumentList([]); // Clear the documentList
  };
  return (
    <>
      <div className={styles.container}>
        <ToastContainer className="tost" />

        <Topbar />

        <div className={styles.line}></div>

        <h1 className={styles.main_heading}>Update your documents</h1>

        <div className={styles.content_box}>
          <div className={styles.sub_content_box}>
            <h2 className={styles.h}>Instructions of documents</h2>

            <p className={styles.p}>
              Explore a curated collection of my awards, certifications, and
              achievements showcasing expertise and dedication. Each credential
              represents a milestone in my journey. Browse to gain insights into
              my qualifications and commitment to excellence.
            </p>
            <h2 className={styles.h}>
              Awards / Certificates / Acknowledgements Pictures if any
            </h2>
            <FullWidthTextfield
              value={title}
              setValue={setTitle}
              placeholder={"Document Title"}
            />

            <label name="file" className={styles.btn}>
              Upload <UploadFileIcon />
              <input
                style={{ display: "none" }}
                type="file"
                name="file"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={changeHandler}
                className={styles.artist_select_service_inputfield}
                // style={{
                //   borderStyle: "solid",
                //   borderWidth: "1px",
                //   borderColor: "white",
                //   borderRadius: 5,
                //   color: "#FFF",
                //   marginTop: 30,
                //   backgroundColor: "#000",
                // }}
              />
            </label>
          </div>

          {/* <button
            disabled={title === "" ? true : false}
            onClick={() => {
              setTestId(testId + 1);
              documentList.push({
                id: testId,
                title: title,
                file: selectedFile,
              });
              setSelectedFile("");
              setTitle("");
            }}
            className={styles.btn}
          >
            {" "}
            Add
          </button> */}
          <button
            disabled={title === "" ? true : false}
            // onClick={addItemAndSubmit}
            onClick={(event) => {
              event.preventDefault(); // Prevent form submission (if applicable)
              addItemAndSubmit();
            }}
            className={styles.btn}
          >
            {" "}
            Add
          </button>
          {/* <h2 className={styles.h}>New Document</h2> */}
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              {documentListLoader ? (
                <TableHead>
                  {documentList?.map((item) => (
                    <TableRow>
                      <TableCell className={styles.h}>Recorded Video</TableCell>
                      <TableCell className={styles.h}>{item?.title}</TableCell>
                      <TableCell className={styles.h}>
                        {item?.file?.type}
                      </TableCell>
                      <TableCell className={styles.h} align="right">
                        <DeleteIcon
                          onClick={() => {
                            setDocumentList(
                              documentList?.filter((a) => a?.id !== item?.id)
                            );
                            setDocumentListLoader(true);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableHead>
              ) : (
                ""
              )}
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: click ? "flex" : "none",
              marginBottom: 10,
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>

          {/* <button
            onClick={handleSubmission}
            style={{
              display: click ? "none" : "",
            }}
            className={styles.btn}
          >
            Confirm
          </button> */}

          <div className={styles.sub_content_box}>
            {/* <h2 className={styles.h}>Uploaded Document</h2> */}
            {document?.some((item) => item) && (
              <h2 className={styles.h}>Uploaded Document</h2>
            )}
            <TableContainer>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {documentLoader ? (
                  <TableHead>
                    {document &&
                      document?.map((item) => (
                        <TableRow>
                          <TableCell className={styles.h}>
                            {item?.title}
                          </TableCell>
                          <TableCell className={styles.h}>
                            <a
                              // href={`https://dev7.sidat.digital/wbs/${item?.file_url}`}
                              href={`${baseURL}/${item?.file_url}`}
                            >
                              <u style={{ color: "blue" }}>Link</u>
                            </a>
                          </TableCell>
                          <TableCell className={styles.h}>
                            {item?.file_url.substr(item?.file_url.indexOf("."))}
                          </TableCell>
                          <TableCell className={styles.h} align="right">
                            <DeleteIcon
                              onClick={() => {
                                deleteArtistData(item?.id);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableHead>
                ) : (
                  ""
                )}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default artist_add_document;
