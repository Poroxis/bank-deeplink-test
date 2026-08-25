type LinkGroup = {
  title: string;
  kind: "confirmed" | "test";
  links: string[];
};

const baseLink =
  "onlineappmobile://sbolonline/payments/p2p-by-phone-number?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=79990000000";

const groups: LinkGroup[] = [
  {
    title: "Сработал · телефон без суммы",
    kind: "confirmed",
    links: [baseLink],
  },
  {
    title: "Поле amount · 201 ₽",
    kind: "test",
    links: [
      `${baseLink}&amount=201`,
      `${baseLink}&amount=201.00`,
      `${baseLink}&amount=20100`,
      `${baseLink}&amount=201&currency=RUB`,
      `${baseLink}&amount=20100&currency=643`,
      `${baseLink}&amount=201&currencyCode=643`,
    ],
  },
  {
    title: "Другие возможные поля суммы · 201 ₽",
    kind: "test",
    links: [
      `${baseLink}&sum=201`,
      `${baseLink}&transferAmount=201`,
      `${baseLink}&paymentAmount=201`,
      `${baseLink}&buyAmount=201`,
    ],
  },
  {
    title: "Сумма + ВТБ · 201 ₽",
    kind: "test",
    links: [
      `${baseLink}&amount=201&bankCode=100000000005`,
      `${baseLink}&amount=201.00&bankCode=100000000005`,
      `${baseLink}&amount=20100&bankCode=100000000005`,
      `${baseLink}&sum=201&bankCode=100000000005`,
    ],
  },
];

export function BankActions() {
  return (
    <div className="link-groups">
      {groups.map((group, index) => {
        const headingId = `sber-group-${index}`;

        return (
          <section
            className={`link-group ${group.kind}`}
            key={group.title}
            aria-labelledby={headingId}
          >
            <h2 id={headingId}>{group.title}</h2>
            <div className="bank-actions">
              {group.links.map((link) => (
                <a className="deeplink-button" href={link} key={link}>
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
