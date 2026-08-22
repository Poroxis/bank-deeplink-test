const sberDeeplink =
  "bank100000000111://qr.nspk.ru/7030303567957146?type=01&bank=100000000005";
const vtbDeeplink =
  "https://online.vtb.ru/i/paymentSbp/7030303567957146?type=01&bank=100000000005";

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

        <div className="bank-actions" aria-label="Выберите банк">
          <a className="bank-button sber" href={sberDeeplink}>
            <span className="bank-symbol" aria-hidden="true">С</span>
            <span>
              <strong>Открыть Сбер</strong>
              <small>СберБанк Онлайн</small>
            </span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>

          <a className="bank-button vtb" href={vtbDeeplink}>
            <span className="bank-symbol" aria-hidden="true">В</span>
            <span>
              <strong>Открыть ВТБ</strong>
              <small>ВТБ Онлайн</small>
            </span>
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>

        <ol className="result-guide">
          <li>
            <span>1</span>
            Нажмите кнопку — не копируйте диплинк в адресную строку.
          </li>
          <li>
            <span>2</span>
            Если приложение открылось, диплинк работает.
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
