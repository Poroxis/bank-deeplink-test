import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("exports the bank deeplink test page as static HTML", async () => {
  const html = await readFile(
    new URL("../dist/client/index.html", import.meta.url),
    "utf8",
  );

  assert.match(html, /<title>Тест диплинков Сбера и ВТБ<\/title>/i);
  assert.match(html, /Откройте приложение банка/);
  assert.match(html, /Открыть Сбер/);
  assert.match(html, /Открыть ВТБ/);
  assert.match(html, /Устройство:/);
});

test("uses platform-specific current bank links", async () => {
  const actions = await readFile(
    new URL("../app/bank-actions.tsx", import.meta.url),
    "utf8",
  );

  assert.match(actions, /iPhone\|iPad\|iPod/);
  assert.match(actions, /Android/);
  assert.match(actions, /sbolonline:\/\//);
  assert.match(actions, /sberbankonline:\/\//);
  assert.match(actions, /bank100000000111:\/\//);
  assert.match(actions, /bank110000000005:\/\//);
  assert.match(actions, /https:\/\/online\.vneshtbank\.ru\/i\/paymentSbp\//);
  assert.doesNotMatch(actions, /https:\/\/online\.vtb\.ru\/i\/paymentSbp\//);
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
