type LinkGroup = {
  title: string;
  kind: "confirmed" | "extracted";
  links: string[];
};

const phoneNumber = "79990000000";
const amount = "205";
const sberPaymentCode = "1963930218594";

const confirmedSberLink =
  `onlineappmobile://sbolonline/payments/p2p-by-phone-number?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=${phoneNumber}`;

const groups: LinkGroup[] = [
  {
    title: "Сбер · новый заказ · 203 ₽ · точный cs",
    kind: "extracted",
    links: [
      `onlineappmobile://sbolonline/payments/start?cs=${sberPaymentCode}`,
      `onlineios-app://sbolonline/payments/start?cs=${sberPaymentCode}`,
      `budgetonline-ios://sbolonline/payments/start?cs=${sberPaymentCode}`,
      `sbolonline://sbolonline/payments/start?cs=${sberPaymentCode}`,
    ],
  },
  {
    title: "Сбер · старый P2P · только телефон",
    kind: "confirmed",
    links: [confirmedSberLink],
  },
  {
    title: "ВТБ · телефон + сумма · 205 ₽",
    kind: "extracted",
    links: [
      `loona://online.vtb.ru/transfers/transferByPhone?isStandaloneScenario=true&actionType=generalTargetSearch&tab=SWITCH_TO_OP_4808&isForeingNumber=false&predefinedValues%5BpredefinedPhoneNumber%5D=${phoneNumber}&predefinedValues%5BpredefinedBank%5D=100000000008&predefinedValues%5BpredefinedAmount%5D=${amount}&stage=INPUT`,
    ],
  },
];

export function BankActions() {
  return (
    <div className="link-groups">
      {groups.map((group, index) => {
        const headingId = `deeplink-group-${index}`;

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
