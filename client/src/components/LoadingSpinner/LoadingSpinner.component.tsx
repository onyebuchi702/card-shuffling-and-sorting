import React, { memo } from "react";
import styles from "./LoadingSpinner.module.scss";

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large";
}

export const LoadingSpinner = memo(
  ({ size = "medium" }: LoadingSpinnerProps) => {
    const sizeClass =
      size === "small"
        ? styles.loadingSpinnerSmall
        : size === "large"
        ? styles.loadingSpinnerLarge
        : styles.loadingSpinnerMedium;

    return (
      <div className={`${styles.loadingSpinner} ${sizeClass}`}>
        <div className={styles.spinnerRing}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
);
