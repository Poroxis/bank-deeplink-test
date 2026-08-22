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
  assert.match(html, /bank100000000111:\/\/qr\.nspk\.ru/);
  assert.match(html, /https:\/\/online\.vtb\.ru\/i\/paymentSbp\//);
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
