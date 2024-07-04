import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import styles from "../styles/TalentDashboard.module.css";
import styles from "../../../styles/TalentDashboard.module.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "super-app-theme--header",
    width: 55,
  },
  {
    field: "orderno",
    headerName: "Order No",
    headerClassName: "super-app-theme--header",
    width: 180,
  },
  {
    field: "clientname",
    headerName: "Talent Name",
    headerClassName: "super-app-theme--header",
    width: 180,
  },
  {
    field: "orderdate",
    headerName: "Order Date",
    headerClassName: "super-app-theme--header",
    width: 180,
  },
  {
    field: "prices",
    headerName: "Price",
    headerClassName: "super-app-theme--header",
    width: 180,
  },
  {
    field: "status",
    headerName: "Status",
    headerClassName: "super-app-theme--header",
    width: 180,
  },
];

const rows = [
  {
    id: 1,
    orderno: "Lorum 01",
    headerClassName: "super-app-theme--header",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 5,000.0",
    status: "Received",
  },
  {
    id: 2,
    orderno: "Lorum 02",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 10,000.0",
    status: "In Process",
  },
  {
    id: 3,
    orderno: "Lorum 03",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 5,000.0",
    status: "In Process",
  },
  {
    id: 4,
    orderno: "Lorum 01",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 10,000.0",
    status: "Pending",
  },
  {
    id: 5,
    orderno: "Lorum 01",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 10,000.0",
    status: "Received",
  },
  {
    id: 6,
    orderno: "Lorum 01",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 5,000.0",
    status: "In Process",
  },
  {
    id: 7,
    orderno: "Lorum 01",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 10,000.0",
    status: "In Process",
  },
  {
    id: 8,
    orderno: "Lorum 01",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 10,000.0",
    status: "Pending",
  },
  {
    id: 9,
    orderno: "Lorum 01",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 5,000.0",
    status: "Received",
  },
  {
    id: 10,
    orderno: "Lorum 01",
    clientname: "Lorum",
    orderdate: "10-10-22 ",
    prices: "PKR 10,000.0",
    status: "In Process",
  },
];

// export default function DataTable() {
//   return (
//     <div style={{ height: 400, width: "100%" }}>
//       <DataGrid
//         // className={styles.table_heads}
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />
//     </div>
//   );
// }

export default function DataTable() {
  return (
    // <div className={styles.container}>

    <div
      className={styles.table_display_flex_center}
      // style={{ display: "flex", justifyContent: "center" }}
    >
      {/* <Box sx={{ flexGrow: 1 }}> */}

      {/* <Grid container spacing={2}> */}
      {/* <Grid item xs={10} className={styles.Table_Alignment_setting}> */}
      <Box
        className={styles.Table_Alignment_BOX}
        sx={{
          // height: 650,
          // width: "53.55%",
          // height: 650,
          // width: "93.79%",
          // margin: 5,
          "& .super-app-theme--header": {
            backgroundColor: "#CEA234",
            // borderRadius: "30px",
            // marginBottom: "50px",
            // color: "#1B1B1B",
          },
        }}
      >
        <DataGrid
          className={styles.data_grid}
          rows={rows}
          columns={columns}

          //   pageSize={5}
          //   rowsPerPageOptions={[5]}
          //   checkboxSelection
        />
      </Box>
      {/* </Grid> */}
      {/* </Grid> */}
      {/* </Box> */}
    </div>
  );
}
