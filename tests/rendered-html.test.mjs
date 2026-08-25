import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports the Sber amount test page as static HTML", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Тест суммы в диплинке Сбера<\/title>/i);
  assert.match(html, /Сбер iOS · тест суммы/);
  assert.match(html, /Сработал · телефон без суммы/);
  assert.match(html, /Поле amount · 201 ₽/);
  assert.doesNotMatch(html, /Сбер · Android|ВТБ · Android|QR тестовый/);
});

test("renders the confirmed link and amount variants as direct anchors", async () => {
  const actions = await readFile(
    new URL("../app/bank-actions.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(actions, /window\.location|setTimeout|detectPlatform/);
  assert.match(actions, /href=\{link\}/);
  assert.match(
    actions,
    /onlineappmobile:\/\/sbolonline\/payments\/p2p-by-phone-number\?source=QR_FROM_SELF_EMPLOYED_EXTERNAL&phoneNumber=79990000000/,
  );
  assert.match(actions, /amount=201/);
  assert.match(actions, /amount=201\.00/);
  assert.match(actions, /amount=20100/);
  assert.match(actions, /sum=201/);
  assert.match(actions, /transferAmount=201/);
  assert.match(actions, /paymentAmount=201/);
  assert.match(actions, /buyAmount=201/);
  assert.match(actions, /bankCode=100000000005/);
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
