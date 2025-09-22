import usePaginatedList from "./usePaginatedList";

/**
 * 드림인 게시물 활동 리스트 커스텀 훅
 *
 * @param {number} dreaminId
 * @param {object} options
 * @returns {object}
 */
export default function useDreaminPosts(dreaminId, options = {}) {
  return usePaginatedList({
    endpoint: `/admin/member/dreamins/${dreaminId}/contents`,

    initialParams: options.initialParams ?? {},
    initialSort: { key: "createdAt", dir: "desc", ...options.initialSort },
    initialPage: options.initialPage ?? 1,
    initialSize: options.initialSize ?? 10,

    mapItem: (item) => ({
      no: item.no,
      category: item.category,
      topic: item.topic,
      type: item.type,
      content: item.content,
      holpaScore: item.holpaScore ?? 0,
      reportCount: item.reportCount,
      createdAt: item.createdAt,
      authorNickname: item.authorNickname,
    }),

    ...options,
  });
}
