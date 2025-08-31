const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const BOOKS = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Moby Dick",
  "War and Peace",
  "Pride and Prejudice",
  "The Catcher in the Rye",
  "Brave New World",
  "Jane Eyre",
  "The Lord of the Rings",
];

app.get("/books", (req, res) => {
  const { search } = req.query;
  console.log("XXX: S", search);
  if (search) {
    const filteredBooks = BOOKS.filter((book) =>
      book.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filteredBooks);
  } else {
    res.json(BOOKS);
  }
});

app.post("/submit", (req, res) => {
  console.log("Submitted books:", req.body.selectedBooks);
  res.status(200).send("Books received");
});

app.listen(4001, () => console.log("Server running at http://localhost:4001"));
