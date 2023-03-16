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
  return { getPersonalizedPrivateContent, personalizedPrivateContent };
});
