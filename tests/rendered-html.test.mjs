import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports the current bank deeplink test page as static HTML", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Тест банковских диплинков<\/title>/i);
  assert.match(html, /Актуальные диплинки/);
  assert.match(html, /Сбер · извлечено из JS · 205 ₽/);
  assert.match(html, /ВТБ · извлечено из JS · 205 ₽/);
  assert.doesNotMatch(html, /Поле amount|Другие возможные поля суммы/);
});

test("renders extracted Sber and VTB links as direct anchors", async () => {
  const actions = await readFile(
    new URL("../app/bank-actions.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(actions, /window\.location|setTimeout|detectPlatform/);
  assert.match(actions, /href=\{link\}/);
  assert.match(actions, /requisiteNumber=\$\{phoneNumber\}&sum=\$\{amount\}/);
  assert.match(actions, /onlineappmobile:\/\/sbolonline\/payments\/p2p-by-phone-number/);
  assert.match(actions, /phoneNumber=\$\{phoneNumber\}&sum=\$\{amount\}/);
  assert.match(actions, /loona:\/\/online\.vtb\.ru\/transfers\/transferByPhone/);
  assert.match(actions, /predefinedPhoneNumber%5D=\$\{phoneNumber\}/);
  assert.match(actions, /predefinedAmount%5D=\$\{amount\}/);
  assert.match(actions, /payform\/deeplink\/sberbank\?uuid=\$\{paymentUuid\}/);
  assert.match(actions, /payform\/deeplink\/vtb\?uuid=\$\{paymentUuid\}/);
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
