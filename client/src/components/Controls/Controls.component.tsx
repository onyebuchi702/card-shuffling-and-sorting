import React, { memo } from "react";
import "./Controls.module.scss";
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
      <div className="controls">
        <div className="controls-group">
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
