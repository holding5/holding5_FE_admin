// src/hooks/useDreaminProfile.js
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { labelMapper } from "../utils/LabelMapper";

/**
 * 드림인 단건 프로필 조회 훅
 * @param {string|number} id - 드림인 ID
 */
export default function useDreaminProfile(id) {
  const [form, setForm] = useState(null);          // ✅ 프로필 정보
  const [histories, setHistories] = useState([]);  // ✅ 활동 이력
  const [loading, setLoading] = useState(true);    // ✅ 로딩 상태
  const [error, setError] = useState(null);        // ✅ 에러 상태

  useEffect(() => {
    if (!id) return;

    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosInstance.get(`/admin/member/dreamins/${id}`);
        const data = res.data;

        setForm({
          email: data.email ?? "",
          nickname: data.nickname ?? "",
          gender: labelMapper("genderMap", data.gender),         // "남"/"여"
          name: data.name ?? "",
          birthdate: data.birthdate ?? "",
          phoneNumber: data.phoneNumber ?? "",
          job: data.job ?? "",
          school: data.school ?? "",
          religion: labelMapper("religionMap", data.religion),   // "불교" 등
          status: labelMapper("statusMap", data.status),         // "활동중"
          ageGroup: labelMapper("ageGroupMap", data.ageGroup),   // "중학생" 등
        });

        setHistories(Array.isArray(data.histories) ? data.histories : []);
      } catch (err) {
        console.error("드림인 프로필 조회 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  return {
    form,         // 입력 폼 상태
    setForm,      // 외부에서 수정 가능
    histories,    // 활동 이력
    loading,
    error,
  };
}
