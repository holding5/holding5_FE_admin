/**
 * 서버에서 내려온 날짜(UTC)를 한국 시간(KST, +9시간)으로 변환하여 표시
 *
 * "2026-02-27T14:22:08.739825" → "2026-02-27 23:22:08"
 */
export function formatDateTime(dateStr) {
  if (!dateStr || dateStr === "-") return "-";

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    // UTC → KST (+9시간)
    date.setHours(date.getHours() + 9);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    const h = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");

    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  } catch {
    return dateStr;
  }
}

/**
 * 날짜만 표시 (시간 제외)
 */
export function formatDate(dateStr) {
  if (!dateStr || dateStr === "-") return "-";

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    date.setHours(date.getHours() + 9);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  } catch {
    return dateStr;
  }
}
