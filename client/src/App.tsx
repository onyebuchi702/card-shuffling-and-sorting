import React, { useEffect } from "react";
import { CardGrid } from "./components/CardGrid";
import { Controls } from "./components/Controls";
import { StatusBar } from "./components/StatusBar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useNotification, useDeck } from "./hooks";
import { Notification } from "./components/Notification";
import "./styles/main.scss";

const App = () => {
  const { notification, showNotification, hideNotification } =
    useNotification();
  const {
    deck,
    isLoading,
    lastAction,
    sortMethod,
    fetchDeck,
    shuffleDeck,
    sortDeck,
    resetDeck,
  } = useDeck(showNotification);

  useEffect(() => {
    fetchDeck();
  }, [fetchDeck]);

  return (
    <ErrorBoundary>
      <div className="app">
        <header className="header">
          <h1>Card Shuffling & Sorting</h1>
          <p>Interactive deck management with multiple sorting algorithms</p>
        </header>

        <main className="main-content">
          <Controls
            onShuffle={shuffleDeck}
            onSort={sortDeck}
            onReset={resetDeck}
            isLoading={isLoading}
          />

          <StatusBar
            cardCount={deck.length}
            lastAction={lastAction?.toString()}
            sortMethod={sortMethod || undefined}
            onRefresh={fetchDeck}
          />

          <CardGrid cards={deck} isLoading={isLoading} />
        </main>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={hideNotification}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
