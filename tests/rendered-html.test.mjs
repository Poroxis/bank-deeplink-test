import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports the deeplink test page as static HTML", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Тест диплинков Сбера и ВТБ<\/title>/i);
  assert.match(html, /Тест диплинков/);
  assert.match(html, /Сбер · Android/);
  assert.match(html, /Сбер · iOS/);
  assert.match(html, /ВТБ · Android/);
  assert.doesNotMatch(html, /Откройте эту страницу|QR тестовый|Страница не собирает/);
});

test("renders every variant as a direct link with its deeplink as the label", async () => {
  const actions = await readFile(
    new URL("../app/bank-actions.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(actions, /window\.location|setTimeout|detectPlatform/);
  assert.match(actions, /href=\{link\}/);
  assert.match(actions, /\{link\}/);
  assert.match(actions, /sberbankonline:\/\/payments\/p2p/);
  assert.match(actions, /sbolonline:\/\/payments\/p2p-by-phone-number/);
  assert.match(actions, /intent:\+79990000000#Intent/);
  assert.match(actions, /vtb:\/\/online\.vtb\.ru\/i\/transfers/);
  assert.match(actions, /phoneNumber=79990000000/);
  assert.match(actions, /bankCode=100000000005/);
  assert.match(actions, /amount=1000\.00/);
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
