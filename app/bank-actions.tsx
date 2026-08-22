type LinkGroup = {
  title: string;
  bank: "sber" | "vtb";
  links: string[];
};

const groups: LinkGroup[] = [
  {
    title: "Сбер · универсальные",
    bank: "sber",
    links: [
      "https://www.sberbank.com/sms/pbpn?requisiteNumber=79990000000",
      "https://www.sberbank.com/sms/pbpn?requisiteNumber=79990000000&bankCode=100000000005",
      "https://www.sberbank.com/sms/pbpn?requisiteNumber=79990000000&bankCode=100000000005&amount=1000.00",
      "perevod://79990000000",
    ],
  },
  {
    title: "Сбер · Android",
    bank: "sber",
    links: [
      "sberbankonline://payments/p2p?type=phone_number&requisiteNumber=79990000000",
      "sberbankonline://payments/p2p?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&type=phone_number&requisiteNumber=79990000000&bankCode=100000000005",
      "sberbankonline://payments/p2p?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&type=phone_number&requisiteNumber=79990000000&bankCode=100000000005&amount=1000.00",
      "android-app://ru.sberbankmobile/payments/p2p?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&type=phone_number&requisiteNumber=79990000000&bankCode=100000000005",
    ],
  },
  {
    title: "Сбер · iOS",
    bank: "sber",
    links: [
      "sbolonline://payments/p2p-by-phone-number?phoneNumber=79990000000",
      "sbolonline://payments/p2p-by-phone-number?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=79990000000",
      "sbolonline://payments/p2p-by-phone-number?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=79990000000&bankCode=100000000005&amount=1000.00",
      "onlineappmobile://sbolonline/payments/p2p-by-phone-number?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=79990000000",
    ],
  },
  {
    title: "ВТБ · Android",
    bank: "vtb",
    links: [
      "intent:+79990000000#Intent;scheme=tel;package=ru.vtb24.mobilebanking.android;end",
      "intent://www.sberbank.com/sms/pbpn?requisiteNumber=79990000000#Intent;scheme=https;package=ru.vtb24.mobilebanking.android;end",
      "intent://www.sberbank.com/sms/pbpn?requisiteNumber=79990000000&bankCode=100000000111&amount=1000.00#Intent;scheme=https;package=ru.vtb24.mobilebanking.android;end",
    ],
  },
  {
    title: "ВТБ · универсальные / iOS",
    bank: "vtb",
    links: [
      "vtb://online.vtb.ru/i/transfers",
      "vtb://online.vtb.ru/i/transfers?phoneNumber=79990000000",
      "vtb://online.vtb.ru/i/transfers?phoneNumber=79990000000&amount=1000.00",
      "vtb://online.vtb.ru/i/transfers?phoneNumber=79990000000&amount=1000.00&bankCode=100000000111",
      "https://online.vtb.ru/i/transfers?phoneNumber=79990000000&amount=1000.00&bankCode=100000000111",
    ],
  },
];

export function BankActions() {
  return (
    <div className="link-groups">
      {groups.map((group, index) => {
        const headingId = `${group.bank}-group-${index}`;

        return (
          <section
            className={`link-group ${group.bank}`}
            key={group.title}
            aria-labelledby={headingId}
          >
            <h2 id={headingId}>{group.title}</h2>
            <div className="bank-actions">
              {group.links.map((link) => (
                <a className={`deeplink-button ${group.bank}`} href={link} key={link}>
                  {link}
                </a>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
