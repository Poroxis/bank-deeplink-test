import { BankActions } from "./bank-actions";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="test-card">
        <h1>Проверка диплинков</h1>
        <BankActions />
      </div>
    </main>
  );
}
