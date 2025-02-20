import styles from "./loader.module.css";

export default function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.three_body}>
        <div className={styles.three_body__dot}></div>
        <div className={styles.three_body__dot}></div>
        <div className={styles.three_body__dot}></div>
      </div>
    </div>
  );
}
