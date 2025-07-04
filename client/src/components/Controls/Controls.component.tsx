import React, { memo } from "react";
import styles from "./Controls.module.scss";
import { Button } from "../Button";

interface ControlsProps {
  onShuffle: () => void;
  onSort: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export const Controls = memo(
  ({ onShuffle, onSort, onReset, isLoading }: ControlsProps) => {
    return (
      <div className={styles.controls}>
        <div className={styles.controlsGroup}>
          <Button
            onClick={onShuffle}
            disabled={isLoading}
            variant="primary"
            icon="🔀"
          >
            Shuffle
          </Button>

          <Button
            onClick={onSort}
            disabled={isLoading}
            variant="secondary"
            icon="📊"
          >
            Sort
          </Button>

          <Button
            onClick={onReset}
            disabled={isLoading}
            variant="secondary"
            icon="🔄"
          >
            Reset
          </Button>
        </div>
      </div>
    );
  }
);
