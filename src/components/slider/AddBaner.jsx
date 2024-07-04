import styles from "../../../styles/AddBaner.module.css";
import Image from "next/image";
import Link from "next/link";
export default function AddBaner({ imageSrc }) {
  return (
    <div className={styles.add_baner}>
      <Link href="" className={styles.add_baner}>
        {/* <Image alt="" src={imageSrc} className={styles.add_baner_image} /> */}
        <div className={styles.add_baner_image}></div>
      </Link>
    </div>
  );
}
