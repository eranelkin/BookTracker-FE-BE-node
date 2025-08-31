import React from "react";
import Book from "./Book";

export default function BookList({ books, selectedBooks, onSelect }) {
  return (
    <ol>
      {books.map((book) => (
        <Book
          key={book}
          book={book}
          isSelected={selectedBooks.includes(book)}
          onSelect={onSelect}
        />
      ))}
    </ol>
  );
}
