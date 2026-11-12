import Button from "./Button";

type HeaderProps = {
  onAdd: () => void;
};

export default function Header({ onAdd }: HeaderProps) {
  return (
    <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-bold">Reading List</h1>
      <Button onClick={onAdd}>+ Add book</Button>
    </header>
  );
}
