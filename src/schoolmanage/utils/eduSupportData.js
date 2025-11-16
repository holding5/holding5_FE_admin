// eduSupportData.js

/** 시·도 교육청 (상위 Select) */
export const EDU_OFFICES = [
  { value: "seoul", label: "서울특별시교육청" },
  { value: "busan", label: "부산광역시교육청" },
  { value: "daegu", label: "대구광역시교육청" },
  { value: "incheon", label: "인천광역시교육청" },
  { value: "gwangju", label: "광주광역시교육청" },
  { value: "daejeon", label: "대전광역시교육청" },
  { value: "ulsan", label: "울산광역시교육청" },
  { value: "sejong", label: "세종특별자치시교육청" },
  { value: "gyeonggi", label: "경기도교육청" },
  { value: "gangwon", label: "강원특별자치도교육청" },
  { value: "chungbuk", label: "충청북도교육청" },
  { value: "chungnam", label: "충청남도교육청" },
  { value: "jeonbuk", label: "전라북도교육청" },
  { value: "jeonnam", label: "전라남도교육청" },
  { value: "gyeongbuk", label: "경상북도교육청" },
  { value: "gyeongnam", label: "경상남도교육청" },
  { value: "jeju", label: "제주특별자치도교육청" },
];

/** 교육지원청 (하위 Select) */
export const SUPPORT_BY_OFFICE = {
  /** 서울특별시교육청 (11) */
  seoul: [
    { value: "jungbu", label: "중부교육지원청" },
    { value: "dongbu", label: "서울동부교육지원청" },
    { value: "seobu", label: "서울서부교육지원청" },
    { value: "bukbu", label: "서울북부교육지원청" },
    { value: "nambu", label: "서울남부교육지원청" },
    { value: "seongdong-gwangjin", label: "성동광진교육지원청" },
    { value: "seongbuk-gangbuk", label: "성북강북교육지원청" },
    { value: "gangseo-yangcheon", label: "강서양천교육지원청" },
    { value: "dongjak-gwanak", label: "동작관악교육지원청" },
    { value: "gangnam-seocho", label: "강남서초교육지원청" },
    { value: "gangdong-songpa", label: "강동송파교육지원청" },
  ],

  /** 부산광역시교육청 (5) */
  busan: [
    { value: "dongnae", label: "동래교육지원청" },
    { value: "seobu", label: "부산서부교육지원청" },
    { value: "nambu", label: "부산남부교육지원청" },
    { value: "bukbu", label: "부산북부교육지원청" },
    { value: "dongbu", label: "부산동부교육지원청" },
  ],

  /** 대구광역시교육청 (2) */
  daegu: [
    { value: "dongbu", label: "대구동부교육지원청" },
    { value: "seobu", label: "대구서부교육지원청" },
  ],

  /** 인천광역시교육청 */
  incheon: [
    { value: "dongbu", label: "인천동부교육지원청" },
    { value: "seobu", label: "인천서부교육지원청" },
    { value: "namdong", label: "인천남동교육지원청" },
    { value: "jungbu", label: "인천중부교육지원청" },
    { value: "ganghwa", label: "인천강화교육지원청" },
  ],

  /** 광주광역시교육청 (2) */
  gwangju: [
    { value: "dongbu", label: "광주동부교육지원청" },
    { value: "seobu", label: "광주서부교육지원청" },
  ],

  /** 대전광역시교육청 (2) */
  daejeon: [
    { value: "dongbu", label: "대전동부교육지원청" },
    { value: "seobu", label: "대전서부교육지원청" },
  ],

  /** 울산광역시교육청 (4) */
  ulsan: [
    { value: "nambu", label: "울산남부교육지원청" },
    { value: "jungbu", label: "울산중부교육지원청" },
    { value: "bukbu", label: "울산북부교육지원청" },
    { value: "dongbu", label: "울산동부교육지원청" },
  ],

  /** 세종특별자치시교육청 — 별도 교육지원청 없음 */
  sejong: [{ value: "sejong", label: "별도 교육지원청 없음" }],

  /** 경기도교육청 (25) */
  gyeonggi: [
    { value: "suwon", label: "수원교육지원청" },
    { value: "seongnam", label: "성남교육지원청" },
    { value: "uijeongbu", label: "의정부교육지원청" },
    { value: "anyang-gwacheon", label: "안양과천교육지원청" },
    { value: "bucheon", label: "부천교육지원청" },
    { value: "gwangmyeong", label: "광명교육지원청" },
    { value: "pyeongtaek", label: "평택교육지원청" },
    { value: "dongducheon-yangju", label: "동두천양주교육지원청" },
    { value: "ansan", label: "안산교육지원청" },
    { value: "goyang", label: "고양교육지원청" },
    { value: "hwaseong-osan", label: "화성오산교육지원청" },
    { value: "siheung", label: "시흥교육지원청" },
    { value: "gunpo-uiwang", label: "군포의왕교육지원청" },
    { value: "gimpo", label: "김포교육지원청" },
    { value: "gwangju-hanam", label: "광주하남교육지원청" },
    { value: "guri-namyangju", label: "구리남양주교육지원청" },
    { value: "paju", label: "파주교육지원청" },
    { value: "icheon", label: "이천교육지원청" },
    { value: "anseong", label: "안성교육지원청" },
    { value: "yeoju", label: "여주교육지원청" },
    { value: "yangpyeong", label: "양평교육지원청" },
    { value: "gapyeong", label: "가평교육지원청" },
    { value: "pocheon", label: "포천교육지원청" },
    { value: "yeoncheon", label: "연천교육지원청" },
    { value: "yongin", label: "용인교육지원청" },
  ],

  /** 강원특별자치도교육청 */
  gangwon: [
    { value: "chuncheon", label: "춘천교육지원청" },
    { value: "wonju", label: "원주교육지원청" },
    { value: "gangneung", label: "강릉교육지원청" },
    { value: "sokcho-yangyang", label: "속초양양교육지원청" },
    { value: "goseong", label: "고성교육지원청" },
    { value: "donghae-samcheok", label: "동해삼척교육지원청" },
    { value: "taebaek", label: "태백교육지원청" },
    { value: "hongcheon-hoengseong", label: "홍천횡성교육지원청" },
    {
      value: "yeongwol-pyeongchang-jeongseon",
      label: "영월평창정선교육지원청",
    },
    { value: "cheorwon", label: "철원교육지원청" },
    { value: "hwacheon-yanggu-inje", label: "화천양구인제교육지원청" },
  ],

  /** 충청북도교육청 */
  chungbuk: [
    { value: "cheongju", label: "청주교육지원청" },
    { value: "chungju", label: "충주교육지원청" },
    { value: "jecheon", label: "제천교육지원청" },
    { value: "boeun-okcheon-yeongdong", label: "보은옥천영동교육지원청" },
    { value: "jincheon-eumseong", label: "진천음성교육지원청" },
    { value: "gyeonggi-goesan-jeungpyeong", label: "괴산증평교육지원청" },
    { value: "danyang", label: "단양교육지원청" },
  ],

  /** 충청남도교육청 */
  chungnam: [
    { value: "cheonan", label: "천안교육지원청" },
    { value: "asan", label: "아산교육지원청" },
    { value: "gongju", label: "공주교육지원청" },
    { value: "boryeong", label: "보령교육지원청" },
    { value: "seosan", label: "서산교육지원청" },
    { value: "nonsan-gyeryong", label: "논산계룡교육지원청" },
    { value: "geumsan", label: "금산교육지원청" },
    { value: "buyeo", label: "부여교육지원청" },
    { value: "seocheon", label: "서천교육지원청" },
    { value: "cheongyang", label: "청양교육지원청" },
    { value: "hongseong", label: "홍성교육지원청" },
    { value: "yesan", label: "예산교육지원청" },
    { value: "taean", label: "태안교육지원청" },
    { value: "dangjin", label: "당진교육지원청" },
  ],

  /** 전라북도교육청 */
  jeonbuk: [
    { value: "jeonju", label: "전주교육지원청" },
    { value: "gunsan", label: "군산교육지원청" },
    { value: "iksan", label: "익산교육지원청" },
    { value: "jeongeup", label: "정읍교육지원청" },
    { value: "namwon", label: "남원교육지원청" },
    { value: "gimje", label: "김제교육지원청" },
    { value: "wanju", label: "완주교육지원청" },
    { value: "jinan", label: "진안교육지원청" },
    { value: "muju", label: "무주교육지원청" },
    { value: "janggsu", label: "장수교육지원청" },
    { value: "imsil", label: "임실교육지원청" },
    { value: "sunchang", label: "순창교육지원청" },
    { value: "gochang", label: "고창교육지원청" },
    { value: "buan", label: "부안교육지원청" },
  ],

  /** 전라남도교육청 */
  jeonnam: [
    { value: "mokpo", label: "목포교육지원청" },
    { value: "yeosu", label: "여수교육지원청" },
    { value: "suncheon", label: "순천교육지원청" },
    { value: "naju", label: "나주교육지원청" },
    { value: "gwangyang", label: "광양교육지원청" },
    { value: "damyang", label: "담양교육지원청" },
    { value: "gokseong", label: "곡성교육지원청" },
    { value: "gurye", label: "구례교육지원청" },
    { value: "goheung", label: "고흥교육지원청" },
    { value: "boseong", label: "보성교육지원청" },
    { value: "hwaseong", label: "화순교육지원청" },
    { value: "jangheung", label: "장흥교육지원청" },
    { value: "gangjin", label: "강진교육지원청" },
    { value: "haenam", label: "해남교육지원청" },
    { value: "yeongam", label: "영암교육지원청" },
    { value: "mu-an", label: "무안교육지원청" },
    { value: "hampyeong", label: "함평교육지원청" },
    { value: "yeonggwang", label: "영광교육지원청" },
    { value: "jangseong", label: "장성교육지원청" },
    { value: "wando", label: "완도교육지원청" },
    { value: "jindo", label: "진도교육지원청" },
    { value: "sinan", label: "신안교육지원청" },
  ],

  /** 경상북도교육청 */
  gyeongbuk: [
    { value: "pohang", label: "포항교육지원청" },
    { value: "gyeongju", label: "경주교육지원청" },
    { value: "gimcheon", label: "김천교육지원청" },
    { value: "andong", label: "안동교육지원청" },
    { value: "gumi", label: "구미교육지원청" },
    { value: "yeongju", label: "영주교육지원청" },
    { value: "yeongcheon", label: "영천교육지원청" },
    { value: "sangju", label: "상주교육지원청" },
    { value: "mungyeong", label: "문경교육지원청" },
    { value: "gyeongsan", label: "경산교육지원청" },
    { value: "gunwi", label: "군위교육지원청" }, // 행정구역 변동 참고
    { value: "uiseong", label: "의성교육지원청" },
    { value: "cheongsong", label: "청송교육지원청" },
    { value: "yeongyang", label: "영양교육지원청" },
    { value: "yeongdeok", label: "영덕교육지원청" },
    { value: "cheongdo", label: "청도교육지원청" },
    { value: "goryeong", label: "고령교육지원청" },
    { value: "seongju", label: "성주교육지원청" },
    { value: "chilgok", label: "칠곡교육지원청" },
    { value: "yecheon", label: "예천교육지원청" },
    { value: "bonghwa", label: "봉화교육지원청" },
    { value: "uljin", label: "울진교육지원청" },
    { value: "ulleung", label: "울릉교육지원청" },
  ],

  /** 경상남도교육청 */
  gyeongnam: [
    { value: "changwon", label: "창원교육지원청" },
    { value: "jinju", label: "진주교육지원청" },
    { value: "tongyeong", label: "통영교육지원청" },
    { value: "sacheon", label: "사천교육지원청" },
    { value: "gimhae", label: "김해교육지원청" },
    { value: "miryang", label: "밀양교육지원청" },
    { value: "geoje", label: "거제교육지원청" },
    { value: "yangsan", label: "양산교육지원청" },
    { value: "uiryeong", label: "의령교육지원청" },
    { value: "haman", label: "함안교육지원청" },
    { value: "changnyeong", label: "창녕교육지원청" },
    { value: "goseong", label: "고성교육지원청" },
    { value: "namhae", label: "남해교육지원청" },
    { value: "hadong", label: "하동교육지원청" },
    { value: "sancheong", label: "산청교육지원청" },
    { value: "hamyang", label: "함양교육지원청" },
    { value: "geochang", label: "거창교육지원청" },
    { value: "hapcheon", label: "합천교육지원청" },
  ],

  /** 제주특별자치도교육청 (2) */
  jeju: [
    { value: "jeju-si", label: "제주시교육지원청" },
    { value: "seogwipo-si", label: "서귀포시교육지원청" },
  ],
};

/** 유틸리티: 시·도 value로 교육지원청 목록 가져오기 */
export function getSupportOffices(eduOfficeValue) {
  return SUPPORT_BY_OFFICE[eduOfficeValue] ?? [];
}

/** ----- 지역(시·도) 셀렉트용: '교육청' 꼬리표 제거한 라벨 ----- */
export const REGIONS = EDU_OFFICES.map((o) => ({
  value: o.value,
  label: o.label.replace(/교육청$/, ""), // 예: '경상북도교육청' → '경상북도'
}));

/** eduOffice value로 지역 라벨 얻기 (예: 'gyeongbuk' → '경상북도') */
export function getRegionLabel(eduOfficeValue) {
  return (
    REGIONS.find((r) => r.value === eduOfficeValue)?.label ||
    EDU_OFFICES.find((o) => o.value === eduOfficeValue)?.label?.replace(
      /교육청$/,
      ""
    ) ||
    ""
  );
}
