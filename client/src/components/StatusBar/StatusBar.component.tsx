import React, { memo } from "react";
import "./StatusBar.module.scss";
import { getActionIcon, formatSortMethod } from "./StatusBar.utils";

interface StatusBarProps {
  cardCount: number;
  lastAction?: string;
  sortMethod?: string;
}

export const StatusBar = memo(
  ({ cardCount, lastAction, sortMethod }: StatusBarProps) => {
    return (
      <div className="status-bar">
        <div className="status-item">
          <span className="status-label">Cards:</span>
          <span className="status-value">{cardCount}</span>
        </div>

        {lastAction && (
          <div className="status-item">
            <span className="status-icon">{getActionIcon(lastAction)}</span>
            <span className="status-label">Last Action:</span>
            <span className="status-value">{lastAction}</span>
          </div>
        )}

        {sortMethod && (
          <div className="status-item">
            <span className="status-label">Sort Method:</span>
            <span className="status-value">{formatSortMethod(sortMethod)}</span>
          </div>
        )}
      </div>
    );
  }
);
