import { useBooks } from "./useBooks";


// This is the unstyled starting point. It only shows that the data flows.
// Build your UI here and in new components, see SPEC.md.
export default function App() {
  const { books } = useBooks();

  return (
    <main>
      <h1 className="title">Reading List</h1>
      <p className="book-count">{books.length} books</p>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            {book.title} by {book.author} ({book.status})
          </li>
        ))}
      </ul>
    </main>
  );
}
