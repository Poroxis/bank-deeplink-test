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
  assert.match(html, /iPhone \/ iOS/);
  assert.match(html, /Android/);
  assert.match(html, /Сбер · телефон \+ сумма · 205 ₽/);
  assert.match(html, /Сбер · номер карты \+ сумма · 205 ₽/);
  assert.match(html, /ВТБ · телефон \+ сумма · 205 ₽/);
  assert.match(html, /ВТБ · форма перевода по карте/);
  assert.doesNotMatch(html, /OnlyOne|payments\/start|\bcs=/i);
});

test("renders only the working iOS links from device tests", async () => {
  const actions = await readFile(
    new URL("../app/bank-actions.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(actions, /window\.location|setTimeout|detectPlatform/);
  assert.match(actions, /href=\{link\}/);
  assert.match(actions, /onlineappmobile:\/\/sbolonline\/payments\/p2p-by-phone-number/);
  assert.match(actions, /sberIosPhoneLink\}&amount=\$\{amount\}/);
  assert.match(actions, /type=phoneNumber/);
  assert.match(actions, /type=phone_number/);
  assert.match(actions, /const cardNumber = "2202201000011111"/);
  assert.match(actions, /to=\$\{cardNumber\}&type=cardNumber/);
  assert.match(actions, /isNeedToOpenNextScreen=true&skipContactsScreen=true/);
  assert.match(actions, /loona:\/\/online\.vtb\.ru\/transfers\/transferByPhone/);
  assert.match(actions, /predefinedPhoneNumber%5D=\$\{phoneNumber\}/);
  assert.match(actions, /predefinedAmount%5D=\$\{amount\}/);
  assert.doesNotMatch(actions, /onlyonepays|payments\/start|sberPaymentCode|&sum=/i);
  assert.doesNotMatch(actions, /onlineios-app|budgetonline-ios|sbolonline:\/\/sbolonline/);
});

test("renders Android package-targeted Sber and VTB links", async () => {
  const actions = await readFile(
    new URL("../app/bank-actions.tsx", import.meta.url),
    "utf8",
  );

  assert.match(actions, /android-app:\/\/\$\{sberAndroidPhonePath\}/);
  assert.match(actions, /package=ru\.sberbankmobile/);
  assert.match(actions, /requisiteNumber=\$\{phoneNumber\}/);
  assert.match(actions, /type=card_number&requisiteNumber=\$\{cardNumber\}/);
  assert.match(actions, /https:\/\/\$\{vtbAndroidPhonePath\}/);
  assert.match(actions, /package=ru\.vtb24\.mobilebanking\.android/);
  assert.match(actions, /vtb:\/\/\$\{vtbAndroidPhonePath\}/);
  assert.match(actions, /https:\/\/online\.vtb\.ru\/i\/c2c/);
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
