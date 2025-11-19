// 성별
export const genderMap = {
  MAN: "남",
  WOMAN: "여",
};

// 종교
export const religionMap = {
  NONE: "무교",
  BUDDHIST: "불교",
  CHRISTIAN: "기독교",
  CATHOLIC: "천주교",
};

// 활동 상태
export const statusMap = {
  ACTIVATED: "활동중",
  SUSPENDED: "일시정지",
  BANNED: "영구정지",
  DEACTIVATED: "회원탈퇴",
};

// 그룹
export const ageGroupMap = {
  0: "초등학생",
  1: "중학생",
  2: "고등학생",
  3: "20대",
  4: "30대",
  5: "40대 이상",
};

// 게시물 카테고리(홀파담벼락)
export const holpaPostCategory = {
  ACADEMIC: "성적,학업문제",
  APPEARANCE: "외모문제",
  BULLYING: "왕따,학교폭력",
  CATSEYE: "캣츠아이",
  ECONOMY: "가정형편,경제문제",
  ETC: "기타",
  FRIENDS: "친구,이성문제",
  LIGHT_STORY: "가벼운 이야기",
  OVERCOME: "극복수기",
  PARENTS: "부모님과 갈등",
  TEACHERS: "선생님과 갈등",
};

// 심각성
export const severityMap = {
  EXTREMELY_SERIOUS: 5,
  VERY_SERIOUS: 4,
  SERIOUS: 3,
  LITTLE_SERIOUS: 2,
  OK: 1,
};

// 마음상태
export const stateMap = {
  EXTREMELY_ANXIOUS: 5,
  VERY_ANXIOUS: 4,
  ANXIOUS: 3,
  LITTLE_OK: 2,
  OK: 1,
};

// 역할구분
export const serviceRoleMap = {
  DREAMIN: "드림인",
  GROUP_HAPPYIN: "그룹해피인",
  BASIC_HAPPYIN: "해피인",
  STAR_HAPPYIN: "오피니언해피인",
  TEEN_HAPPYIN: "또래해피인",
  NONE: "역할없음",
};

// 학교타입
export const schoolTypeMap = {
  ELEMENTARY: "초등학교",
  MIDDLE: "중학교",
  HIGH: "고등학교",
};

// 해피인 분류 매핑
export const happyinRoleMap = {
  GROUP_HAPPYIN: "그룹해피인",
  BASIC_HAPPYIN: "해피인",
  STAR_HAPPYIN: "오피니언해피인",
  TEEN_HAPPYIN: "또래해피인",
};

// 해피인 그룹 카테고리
export const groupCategoryMap = {
  ARCHITECTURE_DESIGN: "건축/디자인",
  COOKING_FOOD: "요리/식품",
  CULTURE_ART: "문화/예술",
  ECONOMY_MANAGEMENT: "경제/경영",
  EDUCATION_ACADEMIC: "교육/학술",
  ETC: "그 외",
  LECTURE_CONSULTING: "강연/컨설팅",
  MARKETING_AD: "마케팅/광고",
  MEDIA_CONTENT: "미디어/콘텐츠",
  OFFICE_WORKER: "직장인",
  RELIGION: "종교",
  SCIENCE_TECH_MEDICAL: "과학/기술/의학",
  SELF_EMPLOYED: "자영업",
  SOCIETY_POLITICS: "사회/정치",
  SPORTS: "체육",
  STUDENT: "학생",
  TRAVEL_TOURISM: "여행/관광",
};

// 정렬키 매핑
export const sortKeyMap = {
  NAME_ASC: "가나다 순",
  NAME_DESC: "가나다 역순",
  CREATED_DESC: "최신순",
  CREATED_ASC: "오래된 순",
  CATEGORY_NAME_ASC: "카테고리 별",
};

export const postTypeMap = {
  POST: "게시글",
  COMMENT: "댓글",
};

// 게시글 활동 topic 매핑
export const postTopicMap = {
  ACADEMIC: "성적,학업문제",
  APPEARANCE: "외모문제",
  BULLYING: "왕따,학교폭력",
  CATSEYE: "캣츠아이",
  ECONOMY: "가정형편,경제문제",
  ETC: "기타",
  FRIENDS: "친구,이성문제",
  LIGHT_STORY: "가벼운 이야기",
  OVERCOME: "극복수기",
  PARENTS: "부모님과 갈등",
  TEACHERS: "선생님과 갈등",
};

export const happyApplicationStatusMap = {
  DIP: "대기",
  ACTIVATED: "승인",
  SUSPENDED: "보류",
  DEACTIVATED: "거절",
};

export const catsEyeShareTypeMap = {
  SCHOOL: "학교",
  POLICE: "경찰",
  LOCAL_SOCIETY: "지역사회",
};

export const overcomeGroupMap = {
  HOLDING_WITH_STORY: "홀파 > 사연O",
  HOLDING_NO_STORY: "홀파 > 사연X",
  GENERAL: "일반 극복수기",
};

export const reportedPostStatusMap = {
  OPEN: "처리대기",
  DISMISSED: "무혐의",
  RESOLVED: "처리완료",
};

export const dominantReportTypeMap = {
  LANGUAGE_VIOLENCE: "언어폭력",
  SPAMMING: "도배",
  INAPPROPRIATE_LANGUAGE_USE: "부적절한 언어",
  SEXUAL_HARASSMENT: "음담패설/성희롱",
};

export const reportedPostTypeMap = {
  HOLPAWALL: "홀파담벼락",
  CATSEYE: "캣츠아이",
  OVERCOME: "극복수기",
};

export const postCategoryTypeMap = {
  HOLPAWALL: "홀파담벼락",
  CATSEYE: "캣츠아이",
  OVERCOME: "극복수기",
};
