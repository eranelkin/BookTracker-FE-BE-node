import React, { useState, useCallback, useMemo } from "react";
import BookList from "./components/BookList";
import { useBooks, useCountdown } from "./hooks/hooks";
import "./style.css";

// ---------- Main App ----------
export default function App() {
  const [filter, setFilter] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { books, loading, error } = useBooks(filter);

  const handleSelect = useCallback((book) => {
    setSelectedBooks((prev) =>
      prev.includes(book) ? prev.filter((b) => b !== book) : [...prev, book]
    );
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      await fetch("http://localhost:4001/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedBooks }),
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submit failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedBooks]);

  const countdown = useCountdown(isSubmitting, 10, handleSubmit);

  const handleSubmitClick = useCallback(() => {
    if (isSubmitting) {
      setIsSubmitting(false); // Cancel
    } else {
      setIsSubmitting(true); // Start countdown
    }
  }, [isSubmitting]);

  const buttonLabel = useMemo(() => {
    if (isSubmitted) return "Done";
    if (isSubmitting) return `Cancel (${countdown}s)`;
    return "Submit";
  }, [isSubmitted, isSubmitting, countdown]);

  return (
    <div className="App">
      <h1>Book List</h1>

      <input
        placeholder="Filter books"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && (
        <BookList
          books={books}
          selectedBooks={selectedBooks}
          onSelect={handleSelect}
        />
      )}

      <button onClick={handleSubmitClick} disabled={isSubmitted}>
        {buttonLabel}
      </button>
    </div>
  );
}
