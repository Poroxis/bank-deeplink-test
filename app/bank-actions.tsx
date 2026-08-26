type LinkGroup = {
  title: string;
  kind: "confirmed" | "extracted" | "test";
  links: string[];
};

type PlatformSection = {
  id: string;
  title: string;
  groups: LinkGroup[];
};

const phoneNumber = "79990000000";
const amount = "205";
const cardNumber = "2202201000011111";

const sberIosPhoneLink =
  `onlineappmobile://sbolonline/payments/p2p-by-phone-number?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=${phoneNumber}`;

const sberAndroidPhonePath =
  `ru.sberbankmobile/payments/p2p?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&type=phone_number&requisiteNumber=${phoneNumber}`;
const sberAndroidCardPath =
  `ru.sberbankmobile/payments/p2p?type=card_number&requisiteNumber=${cardNumber}`;

const vtbAndroidPhonePath = `online.vtb.ru/i/ppl/${phoneNumber}`;

const sections: PlatformSection[] = [
  {
    id: "ios",
    title: "iPhone / iOS",
    groups: [
      {
        title: "Сбер · телефон",
        kind: "confirmed",
        links: [sberIosPhoneLink],
      },
      {
        title: "Сбер · телефон + сумма · 205 ₽",
        kind: "confirmed",
        links: [
          `${sberIosPhoneLink}&amount=${amount}`,
          `onlineappmobile://sbolonline/p2ptransfer?amount=${amount}&isNeedToOpenNextScreen=true&skipContactsScreen=true&to=${phoneNumber}&type=phoneNumber`,
          `onlineappmobile://sbolonline/p2ptransfer?amount=${amount}&isNeedToOpenNextScreen=true&skipContactsScreen=true&to=${phoneNumber}&type=phone_number`,
        ],
      },
      {
        title: "Сбер · номер карты + сумма · 205 ₽",
        kind: "confirmed",
        links: [
          `onlineappmobile://sbolonline/p2ptransfer?amount=${amount}&isNeedToOpenNextScreen=true&skipContactsScreen=true&to=${cardNumber}&type=cardNumber`,
        ],
      },
      {
        title: "ВТБ · телефон + сумма · 205 ₽",
        kind: "confirmed",
        links: [
          `loona://online.vtb.ru/transfers/transferByPhone?isStandaloneScenario=true&actionType=generalTargetSearch&tab=SWITCH_TO_OP_4808&isForeingNumber=false&predefinedValues%5BpredefinedPhoneNumber%5D=${phoneNumber}&predefinedValues%5BpredefinedBank%5D=100000000008&predefinedValues%5BpredefinedAmount%5D=${amount}&stage=INPUT`,
        ],
      },
    ],
  },
  {
    id: "android",
    title: "Android",
    groups: [
      {
        title: "Сбер · телефон",
        kind: "extracted",
        links: [
          `intent://${sberAndroidPhonePath}#Intent;scheme=android-app;package=ru.sberbankmobile;end`,
          `android-app://${sberAndroidPhonePath}`,
          `sberbankonline://payments/p2p?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&type=phone_number&requisiteNumber=${phoneNumber}`,
        ],
      },
      {
        title: "Сбер · номер карты",
        kind: "extracted",
        links: [
          `intent://${sberAndroidCardPath}#Intent;scheme=android-app;package=ru.sberbankmobile;end`,
          `android-app://${sberAndroidCardPath}`,
          `sberbankonline://payments/p2p?type=card_number&requisiteNumber=${cardNumber}`,
        ],
      },
      {
        title: "ВТБ · телефон",
        kind: "extracted",
        links: [
          `https://${vtbAndroidPhonePath}`,
          `intent://${vtbAndroidPhonePath}#Intent;scheme=https;package=ru.vtb24.mobilebanking.android;end`,
          `vtb://${vtbAndroidPhonePath}`,
        ],
      },
      {
        title: "ВТБ · форма перевода по карте",
        kind: "test",
        links: [
          "https://online.vtb.ru/i/c2c",
          "vtb://online.vtb.ru/i/c2c",
        ],
      },
    ],
  },
];

function LinkGroups({ groups, platformId }: { groups: LinkGroup[]; platformId: string }) {
  return (
    <div className="link-groups">
      {groups.map((group, index) => {
        const headingId = `${platformId}-deeplink-group-${index}`;

        return (
          <section
            className={`link-group ${group.kind}`}
            key={group.title}
            aria-labelledby={headingId}
          >
            <h3 id={headingId}>{group.title}</h3>
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

export function BankActions() {
  return (
    <div className="platform-sections">
      {sections.map((section) => {
        const headingId = `${section.id}-heading`;

        return (
          <section
            className={`platform-section ${section.id}`}
            key={section.id}
            aria-labelledby={headingId}
          >
            <h2 className="platform-title" id={headingId}>
              {section.title}
            </h2>
            <LinkGroups groups={section.groups} platformId={section.id} />
          </section>
        );
      })}
    </div>
  );
}
