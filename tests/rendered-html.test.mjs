import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports the current bank deeplink test page as static HTML", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Тест банковских диплинков<\/title>/i);
  assert.match(html, /Проверка диплинков/);
  assert.match(html, /Сбер · прямой редирект OnlyOne · 203 ₽/);
  assert.match(html, /Сбер · новый заказ · 203 ₽ · точный cs/);
  assert.match(html, /Сбер · старый P2P · только телефон/);
  assert.match(html, /Сбер · телефон \+ сумма · варианты/);
  assert.match(html, /Сбер · номер карты \+ сумма · найденный формат/);
  assert.match(html, /ВТБ · телефон \+ сумма · 205 ₽/);
  assert.doesNotMatch(html, /www\.sberbank\.com/);
});

test("renders the server-generated Sber scenarios and the VTB link", async () => {
  const actions = await readFile(
    new URL("../app/bank-actions.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(actions, /window\.location|setTimeout|detectPlatform/);
  assert.match(actions, /href=\{link\}/);
  assert.match(
    actions,
    /https:\/\/payment\.onlyonepays\.com\/api\/payform\/deeplink\/sberbank\?uuid=01a03a44-07a7-7c47-a71a-e2679738141c/,
  );
  assert.match(actions, /onlineappmobile:\/\/sbolonline\/payments\/start\?cs=\$\{sberPaymentCode\}/);
  assert.match(actions, /onlineios-app:\/\/sbolonline\/payments\/start\?cs=\$\{sberPaymentCode\}/);
  assert.match(actions, /budgetonline-ios:\/\/sbolonline\/payments\/start\?cs=\$\{sberPaymentCode\}/);
  assert.match(actions, /const sberPaymentCode = "1963930218594"/);
  assert.match(actions, /onlineappmobile:\/\/sbolonline\/payments\/p2p-by-phone-number/);
  assert.match(actions, /confirmedSberLink\}&amount=\$\{amount\}/);
  assert.match(actions, /confirmedSberLink\}&sum=\$\{amount\}/);
  assert.match(actions, /type=phoneNumber/);
  assert.match(actions, /type=phone_number/);
  assert.match(actions, /const cardNumber = "2202201000011111"/);
  assert.match(actions, /to=\$\{cardNumber\}&type=cardNumber/);
  assert.match(actions, /isNeedToOpenNextScreen=true&skipContactsScreen=true/);
  assert.match(actions, /loona:\/\/online\.vtb\.ru\/transfers\/transferByPhone/);
  assert.match(actions, /predefinedPhoneNumber%5D=\$\{phoneNumber\}/);
  assert.match(actions, /predefinedAmount%5D=\$\{amount\}/);
  assert.doesNotMatch(actions, /paymentUuid/);
});

test("keeps the finished page free from preview scaffolding", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(page, /codex-preview|_sites-preview|SkeletonPreview/);
  assert.doesNotMatch(layout, /Starter Project|codex-preview|_sites-preview/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});
