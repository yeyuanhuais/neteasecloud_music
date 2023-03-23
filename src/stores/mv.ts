import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { MvProgram, MvUrl, SimiMv } from "@/models/mv";

export const useMvStore = defineStore("mv", () => {
  const mvProgram = ref<MvProgram[]>([]);
  /* ======== mv 推荐 ======== */
  const getMvProgram = async (limit: number = 10, offset: number = 0) => {
    if (mvProgram.value.length > 0) return;
    const { result, code } = await _axios.get<{ result: MvProgram[] }>("/personalized/mv");
    if (code === 200) mvProgram.value = result;
  };
  /* ======== mv 地址 ======== */
  const getMvUrl = async (id: number) => {
    const { data, code } = await _axios.get<{ data: MvUrl }>("/mv/url", { params: { id } });
    if (code === 200) return data;
  };
  /* ======== 相似 mv ======== */
  const getSimiMv = async (id: number) => {
    const { mvs, code } = await _axios.get<{ mvs: SimiMv }>("/simi/mv", { params: { mvid: id } });
    if (code === 200) return mvs;
  };
  return { getMvProgram, mvProgram, getMvUrl, getSimiMv };
});
