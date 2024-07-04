import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "../../styles/FullWidthTextField.module.css";

const FullWidthTextfield = ({ placeholder, value, setValue, type }) => {
  const handleChange = (event) => {
    setValue ? setValue(event?.target?.value) : "";
  };
  return (
    <TextField
      sx={{
        "& .MuiInputBase-root": {
          color: "#fff",
        },
      }}
      fullWidth
      placeholder={placeholder}
      id="fullWidth"
      className={styles.Full_width_text_field}
      // style={{
      //   borderStyle: "solid",
      //   borderWidth: "1px",
      //   borderColor: "white",
      //   borderRadius: 5,
      //   color: "#FFF",
      //   marginTop: 30,
      //   marginBottom: 30,
      //   backgroundColor: "#000",
      // }}
      value={value}
      //   onChange={(e) => {
      // setValue?.setValue(e?.target?.value)
      // }}
      onChange={handleChange}
      type={type}
    />
  );
};
export default FullWidthTextfield;
