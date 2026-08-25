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
  assert.match(html, /Сбер · только телефон · сумма не поддерживается/);
  assert.match(html, /ВТБ · телефон \+ сумма · 205 ₽/);
  assert.doesNotMatch(html, /payment\.onlyonepays\.com|www\.sberbank\.com/);
});

test("renders the working Sber link and the extracted VTB link", async () => {
  const actions = await readFile(
    new URL("../app/bank-actions.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(actions, /window\.location|setTimeout|detectPlatform/);
  assert.match(actions, /href=\{link\}/);
  assert.match(actions, /onlineappmobile:\/\/sbolonline\/payments\/p2p-by-phone-number/);
  assert.doesNotMatch(actions, /onlineappmobile:[^\n]+(?:amount|sum)=/);
  assert.match(actions, /loona:\/\/online\.vtb\.ru\/transfers\/transferByPhone/);
  assert.match(actions, /predefinedPhoneNumber%5D=\$\{phoneNumber\}/);
  assert.match(actions, /predefinedAmount%5D=\$\{amount\}/);
  assert.doesNotMatch(actions, /paymentUuid|onlyonepays|requisiteNumber/);
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
