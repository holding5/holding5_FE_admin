export const fetchOpinionPeople = (filters) => {
  // TODO: 서버로 filters 전달해서 가져오기
  return [
    { id: 1, name: "조보아", photoUrl: "/img/jo.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },
    { id: 2, name: "아이유", photoUrl: "/img/iu.jpg" },

  ];
};

export const getAppDevMembers = () => ([
  { role: "총괄",    members: [{ id: 1, name: "홍길동", photoUrl: "/img/hong.jpg" }] },
  { role: "앱개발",  members: [{ id: 2, name: "개발자1", photoUrl: "/img/a.jpg", stack:["RN","TS"] },
                              { id: 5, name: "개발자2", photoUrl: "/img/a.jpg", stack:["RN","TS"] },
                            { id: 2, name: "개발자A", photoUrl: "/img/a.jpg", stack:["RN","TS"] },] },
  { role: "웹개발",  members: [{ id: 3, name: "개발자B", photoUrl: "/img/b.jpg"}] },
]);

export const getSponsors = () => ({
  orgs:       [{ id: 1, name: "삼성생명" }, { id: 4, name: "한화생명"}],
  companies:  [{ id: 2, name: "대동그룹" }],
  individuals:[{ id: 3, name: "홍길동" }],
});
