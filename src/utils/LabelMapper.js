
import * as maps from "../constant/codeMaps";

/**
 * 코드 값을 사람이 읽을 수 있는 라벨로 매핑
 * @param {string} mapName - genderMap, statusMap 등
 * @param {string|number} key
 * @returns {string}
 */
export function labelMapper(mapName, key) {
  const map = maps[mapName];
  return map?.[key] ?? key; // 못 찾으면 원래 값을 fallback
}
