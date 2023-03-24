import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { Products } from "@/models/digital";

export const useDigitalStore = defineStore("digital", () => {
  /* ======== 数字专辑-新碟上架 ======== */
  const getNewAlbum = async (limit: number = 10, offset: number = 0) => {
    const res: { code: number; products: Products[] } | any = await _axios.get("/album/list", {
      params: { limit: limit, offset: offset },
    });

    if (res.code === 200) return res;
  };
  /* ======== 数字专辑-语种风格馆 ======== */
  const getAlbumStyle = async (limit: number = 10, offset: number = 0, area: string) => {
    const res: { code: number; albumProducts: Products[] } | any = await _axios.get("/album/list/style", {
      params: { limit: limit, offset: offset, area },
    });

    if (res.code === 200) return res;
  };
  return { getNewAlbum, getAlbumStyle };
});
