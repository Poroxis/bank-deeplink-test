import { BankActions } from "./bank-actions";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="test-card">
        <h1>Актуальные диплинки</h1>
        <BankActions />
      </div>
    </main>
  );
}
