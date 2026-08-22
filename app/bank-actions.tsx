"use client";

import { useState, useSyncExternalStore } from "react";

type Platform = "ios" | "android" | "desktop" | "unknown";
type Bank = "sber" | "vtb";

const qrPath =
  "qr.nspk.ru/7030303567957146?type=01&bank=100000000005";

const links: Record<Bank, Record<Exclude<Platform, "unknown">, string>> = {
  sber: {
    ios: `sbolonline://${qrPath}`,
    android: `bank100000000111://${qrPath}`,
    desktop: "",
  },
  vtb: {
    ios: `https://online.vneshtbank.ru/i/paymentSbp/7030303567957146?type=01&bank=100000000005`,
    android: `bank110000000005://${qrPath}`,
    desktop: "",
  },
};

function detectPlatform(): Exclude<Platform, "unknown"> {
  const userAgent = navigator.userAgent;
  const isIPadOS = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;

  if (/iPhone|iPad|iPod/i.test(userAgent) || isIPadOS) {
    return "ios";
  }

  if (/Android/i.test(userAgent)) {
    return "android";
  }

  return "desktop";
}

const platformLabels: Record<Platform, string> = {
  ios: "iPhone / iPad",
  android: "Android",
  desktop: "компьютер",
  unknown: "определяем устройство…",
};

export function BankActions() {
  const platform = useSyncExternalStore<Platform>(
    () => () => undefined,
    detectPlatform,
    () => "unknown",
  );
  const [message, setMessage] = useState("");
  const [showSberFallback, setShowSberFallback] = useState(false);

  function openBank(bank: Bank) {
    const currentPlatform = platform === "unknown" ? detectPlatform() : platform;

    if (currentPlatform === "desktop") {
      setMessage("Откройте эту страницу на телефоне — мобильное приложение нельзя запустить с компьютера.");
      return;
    }

    setMessage(`Пробуем открыть ${bank === "sber" ? "Сбер" : "ВТБ"}…`);
    setShowSberFallback(false);
    window.location.assign(links[bank][currentPlatform]);

    if (bank === "sber" && currentPlatform === "ios") {
      window.setTimeout(() => {
        if (document.visibilityState === "visible") {
          setShowSberFallback(true);
          setMessage("Сбер не открылся? У разных iOS-версий приложения отличаются схемы запуска.");
        }
      }, 1400);
    }
  }

  function openAlternativeSber() {
    setMessage("Пробуем вторую iOS-схему Сбера…");
    window.location.assign(`sberbankonline://${qrPath}`);
  }

  return (
    <>
      <p className="device-status" aria-live="polite">
        Устройство: <strong>{platformLabels[platform]}</strong>
      </p>

      <div className="bank-actions" aria-label="Выберите банк">
        <button className="bank-button sber" type="button" onClick={() => openBank("sber")}>
          <span className="bank-symbol" aria-hidden="true">С</span>
          <span>
            <strong>Открыть Сбер</strong>
            <small>СберБанк Онлайн</small>
          </span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>

        <button className="bank-button vtb" type="button" onClick={() => openBank("vtb")}>
          <span className="bank-symbol" aria-hidden="true">В</span>
          <span>
            <strong>Открыть ВТБ</strong>
            <small>ВТБ Онлайн</small>
          </span>
          <span className="arrow" aria-hidden="true">→</span>
        </button>
      </div>

      {message && <p className="open-status" role="status">{message}</p>}

      {showSberFallback && (
        <button className="fallback-button" type="button" onClick={openAlternativeSber}>
          Попробовать другую версию Сбера
        </button>
      )}
    </>
  );
}
