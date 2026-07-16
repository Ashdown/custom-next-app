import styles from "./hiddenText.module.css";
import React from "react";

type Props = {
  children: React.ReactNode;
}

const HiddenText = ({ children}: Props)  =>
  <span className={styles.hiddenText}>{children}</span>

export default HiddenText;
