type LinkGroup = {
  title: string;
  kind: "confirmed" | "extracted" | "test";
  links: string[];
};

const phoneNumber = "992918652056";
const amount = "205";
const paymentUuid = "01a03a13-42fa-7b76-a9a1-40f85e76069c";

const confirmedSberLink =
  "onlineappmobile://sbolonline/payments/p2p-by-phone-number?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=79990000000";

const groups: LinkGroup[] = [
  {
    title: "Сбер · сработал ранее · без суммы",
    kind: "confirmed",
    links: [confirmedSberLink],
  },
  {
    title: "Сбер · извлечено из JS · 205 ₽",
    kind: "extracted",
    links: [
      `https://www.sberbank.com/sms/pbpn?requisiteNumber=${phoneNumber}&sum=${amount}`,
      `https://payment.onlyonepays.com/api/payform/deeplink/sberbank?uuid=${paymentUuid}`,
    ],
  },
  {
    title: "Сбер · onlineappmobile + sum · 205 ₽",
    kind: "test",
    links: [
      `onlineappmobile://sbolonline/payments/p2p-by-phone-number?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=${phoneNumber}&sum=${amount}`,
    ],
  },
  {
    title: "ВТБ · извлечено из JS · 205 ₽",
    kind: "extracted",
    links: [
      `loona://online.vtb.ru/transfers/transferByPhone?isStandaloneScenario=true&actionType=generalTargetSearch&tab=SWITCH_TO_OP_4808&isForeingNumber=false&predefinedValues%5BpredefinedPhoneNumber%5D=${phoneNumber}&predefinedValues%5BpredefinedBank%5D=100000000008&predefinedValues%5BpredefinedAmount%5D=${amount}&stage=INPUT`,
      `https://payment.onlyonepays.com/api/payform/deeplink/vtb?uuid=${paymentUuid}`,
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
