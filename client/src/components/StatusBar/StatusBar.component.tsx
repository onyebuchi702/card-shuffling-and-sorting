import React, { memo } from "react";
import styles from "./StatusBar.module.scss";
import { getActionIcon, formatSortMethod } from "./StatusBar.utils";

interface StatusBarProps {
  cardCount: number;
  lastAction?: string;
  sortMethod?: string;
  onRefresh?: () => void;
}

export const StatusBar = memo(
  ({ cardCount, lastAction, sortMethod, onRefresh }: StatusBarProps) => {
    return (
      <div className={styles.statusBar}>
        <div className={styles.statusItem}>
          <span className={styles.statusLabel}>Cards:</span>
          <span className={styles.statusValue}>{cardCount}</span>
          {cardCount === 0 && onRefresh && (
            <button
              className={styles.refreshButton}
              onClick={onRefresh}
              title="Refresh deck"
            >
              🔄
            </button>
          )}
        </div>

        {lastAction && (
          <div className={styles.statusItem}>
            <span className={styles.statusIcon}>
              {getActionIcon(lastAction)}
            </span>
            <span className={styles.statusLabel}>Last Action:</span>
            <span className={styles.statusValue}>{lastAction}</span>
          </div>
        )}

        {sortMethod && (
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Sort Method:</span>
            <span className={styles.statusValue}>
              {formatSortMethod(sortMethod)}
            </span>
          </div>
        )}
      </div>
    );
  }
);
