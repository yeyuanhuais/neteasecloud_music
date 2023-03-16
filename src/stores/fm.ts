import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { FmBanner, FmCatelist, FmProgram, FmProgramRecommend, FmToplist, FmToplistAnchor } from "@/models/fm";

export const useFmStore = defineStore("fm", () => {
  const fmProgram = ref<FmProgram[]>([]);
  const fmBanner = ref<FmBanner[]>([]);
  const fmCatelist = ref<FmCatelist[]>([]);
  const programRecommend = ref<FmProgramRecommend[]>([]);
  const toplist = ref<FmToplist[]>([]);
  const toplistAnchor = ref<FmToplistAnchor[]>([]);
  /* ======== 推荐电台 ======== */
  const getFmProgram = async (limit: number = 10, offset: number = 0) => {
    if (fmProgram.value.length > 0) return;
    const { result } = await _axios.get<{ result: FmProgram[] }>("/personalized/djprogram");
    fmProgram.value = result;
  };
  /* ======== 电台banner ======== */
  const getFmBanner = async (limit: number = 10, offset: number = 0) => {
    const { data, code } = await _axios.get<{ code: number; data: FmBanner[] }, any>("/dj/banner");
    if (code === 200) {
      fmBanner.value = data;
    }
  };
  /* ======== 电台分类 ======== */
  const getFmCatelist = async (limit: number = 10, offset: number = 0) => {
    const { categories, code } = await _axios.get<{ code: number; categories: FmCatelist[] }, any>("/dj/catelist");
    if (code === 200) {
      fmCatelist.value = categories;
    }
  };
  /* ======== 电台 推荐节目 ======== */
  const getProgramRecommend = async (limit: number = 10, offset: number = 0) => {
    const { programs, code } = await _axios.get<{ code: number; more: boolean; name: string; programs: FmProgramRecommend[] }, any>("/program/recommend");
    if (code === 200) {
      programRecommend.value = programs;
    }
  };
  /* ======== 电台 - 新晋电台榜/热门电台榜 ======== */
  const getToplist = async (type: "hot" | "new" = "hot", limit: number = 10, offset: number = 0) => {
    const { toplist: data, code } = await _axios.get<{ code: number; updateTime: number; toplist: FmToplist[] }, any>("/dj/toplist", { params: { type, limit } });
    if (code === 200) {
      toplist.value = data;
    }
  };
  /* ======== 电台 - 新晋电台榜/热门电台榜 ======== */
  const getToplistAnchor = async (limit: number = 10, offset: number = 0) => {
    const { data, code } = await _axios.get<{ code: number; msg?: string; data: { list: FmToplistAnchor[]; total: number; undateTime: number } }, any>("/dj/toplist/popular", { params: { limit } });
    if (code === 200) {
      toplistAnchor.value = data.list;
    }
  };
  return { getFmProgram, fmProgram, getFmBanner, fmBanner, getFmCatelist, fmCatelist, getProgramRecommend, programRecommend, getToplist, toplist, getToplistAnchor, toplistAnchor };
});
