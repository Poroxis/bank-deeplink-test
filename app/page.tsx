import { BankActions } from "./bank-actions";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="test-card" aria-labelledby="page-title">
        <div className="eyebrow">Тест банковских диплинков</div>

        <div className="intro">
          <h1 id="page-title">Откройте приложение банка</h1>
          <p>
            Откройте эту страницу на телефоне и нажмите кнопку банка, приложение которого
            установлено.
          </p>
        </div>

        <div className="notice" role="note">
          <span className="notice-mark" aria-hidden="true">!</span>
          <p>
            QR тестовый и может быть просрочен. Цель проверки — увидеть, откроется ли
            приложение. Не подтверждайте платёж.
          </p>
        </div>

        <BankActions />

        <ol className="result-guide">
          <li>
            <span>1</span>
            Нажмите кнопку — не копируйте диплинк в адресную строку.
          </li>
          <li>
            <span>2</span>
            Страница сама выберет ссылку для iPhone или Android.
          </li>
          <li>
            <span>3</span>
            Ошибка про недействительный QR уже внутри банка допустима.
          </li>
        </ol>

        <p className="privacy">Страница не собирает данные и не выполняет платежи.</p>
      </section>
    </main>
  );
}
