import React from "react";

export default function Book({ book, isSelected, onSelect }) {
  return (
    <li
      className={isSelected ? "on" : ""}
      onClick={() => onSelect(book)}
      role="button"
      aria-pressed={isSelected}
    >
      {book}
    </li>
  );
}
