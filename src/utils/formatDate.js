// 타임존 없는 문자열("2026-02-27T14:22:08")은 서버 UTC 로 간주. "Z"/"+09:00" 등이 붙어 있으면 그대로 해석.
// (이전엔 무조건 +9 시간을 더해 타임존 포함 값이 9시간 밀려 보였다)
function parseServerDate(dateStr) {
  const s = String(dateStr);
  const hasZone = /([zZ]|[+-]\d{2}:?\d{2})$/.test(s);
  return new Date(hasZone || !s.includes("T") ? s : s + "Z");
}

// KST "YYYY-MM-DD HH:mm:ss" (sv-SE 로케일이 ISO 형태로 출력)
const KST_FMT = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Asia/Seoul",
  year: "numeric", month: "2-digit", day: "2-digit",
  hour: "2-digit", minute: "2-digit", second: "2-digit",
  hour12: false,
});

/**
 * 서버에서 내려온 날짜를 한국 시간(KST)으로 표시
 *
 * "2026-02-27T14:22:08.739825" → "2026-02-27 23:22:08"
 */
export function formatDateTime(dateStr) {
  if (!dateStr || dateStr === "-") return "-";
  try {
    const date = parseServerDate(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return KST_FMT.format(date);
  } catch {
    return dateStr;
  }
}

/**
 * 날짜만 표시 (시간 제외)
 */
export function formatDate(dateStr) {
  const full = formatDateTime(dateStr);
  return full === "-" || full === dateStr ? full : full.slice(0, 10);
}
