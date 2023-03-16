import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { MvProgram } from "@/models/mv";

export const useMvStore = defineStore("mv", () => {
  const mvProgram = ref<MvProgram[]>([]);
  const getMvProgram = async (limit: number = 10, offset: number = 0) => {
    if (mvProgram.value.length > 0) return;
    const { result } = await _axios.get<{ result: MvProgram[] }>("/personalized/mv");
    mvProgram.value = result;
  };
  return { getMvProgram, mvProgram, };
});
