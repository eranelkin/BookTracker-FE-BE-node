import { useState, useEffect } from "react";

export function useBooks(filter) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:4001/books?search=${filter}`);
        if (!res.ok) throw new Error("Failed to fetch books");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [filter]);

  return { books, loading, error };
}

export function useCountdown(isActive, duration = 10, onComplete) {
  const [countdown, setCountdown] = useState(duration);

  useEffect(() => {
    if (!isActive) {
      setCountdown(duration);
      return;
    }

    if (countdown === 0) {
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [isActive, countdown, duration, onComplete]);

  return countdown;
}
