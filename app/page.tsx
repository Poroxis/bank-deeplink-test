import { BankActions } from "./bank-actions";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="test-card">
        <h1>Сбер iOS · тест суммы</h1>
        <BankActions />
      </div>
    </main>
  );
}
