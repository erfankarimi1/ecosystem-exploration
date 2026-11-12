type HeaderProps = {
  onAdd: () => void;
};

export default function Header({ onAdd }: HeaderProps) {
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4">
      <h1 className="h2 mb-0">Reading List</h1>
      <button type="button" className="btn btn-primary" onClick={onAdd}>
        + Add book
      </button>
    </header>
  );
}
