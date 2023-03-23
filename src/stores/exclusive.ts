import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { PersonalizedPrivateContent } from "@/models/exclusive";
import _axios from "@/plugins/axios";

export const useExclusiveStore = defineStore("exclusive", () => {
  const personalizedPrivateContent = ref<PersonalizedPrivateContent[]>([]);
  const getPersonalizedPrivateContent = async (limit: number = 10, offset: number = 0) => {
    if (personalizedPrivateContent.value.length > 0) return;
    const { result } = await _axios.get<{ result: PersonalizedPrivateContent[] }>("/personalized/privatecontent");
    personalizedPrivateContent.value = result;
  };
  /* ======== 独家放送列表 ======== */
  const getPersonalizedPrivateContentList = async ({ id, limit = 10, page = 1 }: { id: number; limit: number; page: number }) => {
    const res = await _axios.get<{ code: number; count: number; more: boolean; result: PersonalizedPrivateContent[] }>("/personalized/privatecontent/list", {
      params: { rid: id, limit, offset: (page - 1) * limit },
    });
    if (res.code === 200) {
      return res;
    }
  };
  return { getPersonalizedPrivateContent, personalizedPrivateContent, getPersonalizedPrivateContentList };
});
