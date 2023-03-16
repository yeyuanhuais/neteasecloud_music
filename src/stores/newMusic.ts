import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { NewMusicProgram } from "@/models/newMusic";

export const useNewMusicStore = defineStore("newMusic", () => {
  const newMusicProgram = ref<NewMusicProgram[]>([]);
  const getNewMusicProgram = async (limit: number = 10, offset: number = 0) => {
    if (newMusicProgram.value.length > 0) return;
    const { result } = await _axios.get<{ result: NewMusicProgram[] }>("/personalized/newsong", { params: { limit: 5 } });
    newMusicProgram.value = result;
  };
  return { getNewMusicProgram, newMusicProgram };
});
