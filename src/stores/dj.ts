import { ref } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { DjBanner, DjCateList, DjRadios, DjProgramRecommend, DjToplist, DjToplistAnchor, DjDetail, Radio } from "@/models/dj";

export const useDjStore = defineStore("dj", () => {
  const djRadio = ref<DjRadios[]>([]);
  const djBanner = ref<DjBanner[]>([]);
  const djCateList = ref<DjCateList[]>([]);
  const programRecommend = ref<DjProgramRecommend[]>([]);
  const toplist = ref<DjToplist[]>([]);
  const toplistAnchor = ref<DjToplistAnchor[]>([]);
  const djDetail = ref<DjDetail>({} as DjDetail);
  /* ======== 推荐电台 ======== */
  const getDjRadio = async (limit: number = 10, offset: number = 0) => {
    const { djRadios, code }: { code: number; djRadios: DjRadios[] } = await _axios.get("/dj/recommend");
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
    const { categories, code }: { code: number; categories: DjCateList[] } = await _axios.get("/dj/catelist");
    if (code === 200) {
      djCateList.value = categories;
    }
  };
  /* ======== 电台 推荐节目 ======== */
  const getProgramRecommend = async (limit: number = 10, offset: number = 0) => {
    const { programs, code }: { code: number; more: boolean; name: string; programs: DjProgramRecommend[] } = await _axios.get("/program/recommend");
    if (code === 200) {
      programRecommend.value = programs;
    }
  };
  /* ======== 电台 - 新晋电台榜/热门电台榜 ======== */
  const getToplist = async (type: "hot" | "new" = "hot", limit: number = 10, offset: number = 0) => {
    const { toplist: data, code }: { code: number; updateTime: number; toplist: DjToplist[] } = await _axios.get("/dj/toplist", { params: { type, limit } });
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
    const { data, code }: { code: number; msg?: string; data: DjDetail } | any = await _axios.get("/dj/detail", { params: { rid: id } });
    if (code === 200) {
      djDetail.value = data;
      return data;
    }
    return null;
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
  /* ======== 电台 - 分类推荐 ======== */
  const getDjTypeList = async ({ type, limit = 30, page = 1, before }: { type: number; limit: number; page: number; before: string }) => {
    const res: { code: number; hasMore: boolean; djRadios: Radio[] } | any = await _axios.get("/dj/recommend/type", {
      params: { type, limit, offset: (page - 1) * limit, before },
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
    djCateList,
    getProgramRecommend,
    programRecommend,
    getToplist,
    toplist,
    getToplistAnchor,
    toplistAnchor,
    getDjDetail,
    djDetail,
    getDjProgram,
    getDjTypeList,
  };
});
