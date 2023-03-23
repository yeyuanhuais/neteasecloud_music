import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Banner } from "@/models/banner";
import _axios from "@/plugins/axios";

export const useCommonStore = defineStore("common", () => {
  const banners = ref<Banner[]>([]);
  const getBanners = async () => {
    if (banners.value.length) return;
    const { banners: data, code } = await _axios.get<{ banners: Banner[] }>("/banner", { params: { type: 0 } });
    if (code === 200) banners.value = data;
  };

  return { banners, getBanners };
});
