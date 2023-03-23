import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { DjBanner, DjCatelist, DjRadios, DjProgramRecommend, DjToplist, DjToplistAnchor, DjDetail } from "@/models/dj";

export const useDjStore = defineStore("dj", () => {
  const djRadio = ref<DjRadios[]>([]);
  const djBanner = ref<DjBanner[]>([]);
  const djCatelist = ref<DjCatelist[]>([]);
  const programRecommend = ref<DjProgramRecommend[]>([]);
  const toplist = ref<DjToplist[]>([]);
  const toplistAnchor = ref<DjToplistAnchor[]>([]);
  const djDetail = ref<DjDetail>({} as DjDetail);
  /* ======== 推荐电台 ======== */
  const getDjRadio = async (limit: number = 10, offset: number = 0) => {
    const { djRadios, code } = await _axios.get<{ djRadios: DjRadios[] }>("/dj/recommend");
    if (code === 200) {
      djRadio.value = djRadios;
    }
  };
  /* ======== 电台banner ======== */
  const getDjBanner = async (limit: number = 10, offset: number = 0) => {
    const { data, code }: { code: number; data: DjBanner[] } = await _axios.get("/dj/banner");
    if (code === 200) {
      djBanner.value = data;
    }
  };
  /* ======== 电台分类 ======== */
  const getDjCatelist = async (limit: number = 10, offset: number = 0) => {
    const { categories, code } = await _axios.get<{ code: number; categories: DjCatelist[] }>("/dj/catelist");
    if (code === 200) {
      djCatelist.value = categories;
    }
  };
  /* ======== 电台 推荐节目 ======== */
  const getProgramRecommend = async (limit: number = 10, offset: number = 0) => {
    const { programs, code } = await _axios.get<{ code: number; more: boolean; name: string; programs: DjProgramRecommend[] }>("/program/recommend");
    if (code === 200) {
      programRecommend.value = programs;
    }
  };
  /* ======== 电台 - 新晋电台榜/热门电台榜 ======== */
  const getToplist = async (type: "hot" | "new" = "hot", limit: number = 10, offset: number = 0) => {
    const { toplist: data, code } = await _axios.get<{ code: number; updateTime: number; toplist: DjToplist[] }>("/dj/toplist", { params: { type, limit } });
    if (code === 200) {
      toplist.value = data;
    }
  };
  /* ======== 电台 - 新晋电台榜/热门电台榜 ======== */
  const getToplistAnchor = async (limit: number = 10, offset: number = 0) => {
    const { data, code }: { code: number; msg?: string; data: { list: DjToplistAnchor[]; total: number; undateTime: number } } = await _axios.get("/dj/toplist/popular", { params: { limit } });
    if (code === 200) {
      toplistAnchor.value = data.list;
    }
  };
  /* ======== 电台 - 详情 ======== */
  const getDjDetail = async (id: number) => {
    const { data, code }: { code: number; msg?: string; data: DjDetail } = await _axios.get("/dj/detail", { params: { rid: id } });
    if (code === 200) {
      djDetail.value = data;
      return data;
    }
  };
  /* ======== 电台 - 详情 ======== */
  const getDjProgram = async ({ id, limit = 10, page = 1 }: { id: number; limit: number; page: number }) => {
    const res: { code: number; count: number; more: boolean; programs: DjProgramRecommend[] } | any = await _axios.get("/dj/program", {
      params: { rid: id, limit, offset: (page - 1) * limit },
    });
    if (res.code === 200) {
      return res;
    }
  };
  return {
    getDjRadio,
    djRadio,
    getDjBanner,
    djBanner,
    getDjCatelist,
    djCatelist,
    getProgramRecommend,
    programRecommend,
    getToplist,
    toplist,
    getToplistAnchor,
    toplistAnchor,
    getDjDetail,
    djDetail,
    getDjProgram,
  };
});
