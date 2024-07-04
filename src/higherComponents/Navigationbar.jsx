import Link from "next/link";
import styles from "../../styles/Navigationbar.module.css";

import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { useRouter } from "next/router";
export default function Navigationbar() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.navbar_main}>
      <Link href="/">
        {/* <h3 className={styles.sub_heading}>Home</h3> */}
        <button className={router.pathname === "/" ? styles.activeLink : ""}>
          Home
        </button>
      </Link>
      <Link href="/artist_categories">
        <button
          className={
            router.pathname === "/artist_categories" ? styles.activeLink : ""
          }
        >
          Categories
        </button>
      </Link>
      <Link href="/how_its_work">
        <button
          className={
            router.pathname === "/how_its_work" ? styles.activeLink : ""
          }
        >
          How It Works
        </button>
      </Link>
      <Link href="/promote_your_business">
        <button
          className={
            router.pathname === "/promote_your_business"
              ? styles.activeLink
              : ""
          }
        >
          For Business
        </button>
      </Link>
      {/* <Link href="/track_my_order">
        <h3 className={styles.sub_heading}>My Order</h3>
      </Link> */}

      {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> termprary >>>>>>>>>>>>>>>>>>>>>>>>>..  */}

      {/* <div className={styles.nav_links}>
        <List
          sx={{ width: "100%", maxWidth: 200, bgcolor: "transparent" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton
            sx={{ fontSize: 2, fontWeight: 600 }}
            onClick={handleClick}
          >
            <ListItemText primary="More Pages" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse
            // sx={{ position: "absolute", zIndex: 1 }}
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <List
              // sx={{ position: "absolute", zIndex: 1 }}
              component="div"
              disablePadding
            >
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/edit_profile">Edit Profile</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_request ">Artist Request</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_request_to_person">
                  Artist Reques For dedicated person
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/payment_info">Payment Info</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/payment_completed">payment Done</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/promote_your_business">Promote your Business</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/business_done">Business Done</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/track_my_order">Tracking Order</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/user_terms_and_conditions">
                  Terms & Conditions
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/user_privacy_policy">Privacy & Policies</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_dashboard">Artist Dashboard</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_signup">Artist Signup</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_signup_thankyou">Artist Signup Thanks</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_profile_details">
                  Artist Profile Detail
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_profile_details_thankyou">
                  Artist Profile Detail Thanks
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_recording">Artist Recording</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_service_charges">
                  Artist Service Charges
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_service_charges_thankyou">
                  Artist Service Charges Thanks
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_dashboard"> Artist Dashboard</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_order">Artist Order</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_earning">Artist Earning</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_payment_card">Artist Payment Card</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_payment_transfer">
                  Artist Payment transfer
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_payment_successful">
                  Artist Payment Successful
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_select_service">
                  Artist Select Services
                </Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="/artist_add_document">Artist Select Services</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href="artist_order_details">Artist All Orders</Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href=""></Link>
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <Link href=""></Link>
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div> */}

      {/* Navigationbar */}
      {/* <div></div> */}
    </div>
  );
}
