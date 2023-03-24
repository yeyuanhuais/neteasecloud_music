import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { ArtistToplist, NewMusicProgram, RewardToplist, TopListDetail } from "@/models/newMusic";

export const useNewMusicStore = defineStore("newMusic", () => {
  const newMusicProgram = ref<NewMusicProgram[]>([]);
  /* ======== 推荐新音乐 ======== */
  const getNewMusicProgram = async (limit: number = 6, offset: number = 0) => {
    if (newMusicProgram.value.length > 0) return;
    const { result }: { result: NewMusicProgram[] } = await _axios.get("/personalized/newsong", { params: { limit } });
    newMusicProgram.value = result;
  };
  /* ======== 所有榜单内容摘要 ======== */
  const getTopListDetailData = async () => {
    const res: { code: number; list: TopListDetail[]; artistToplist: ArtistToplist; rewardToplist: RewardToplist } | any = await _axios.get("/toplist/detail");
    if (res.code === 200) {
      return res;
    }
  };
  return { getNewMusicProgram, newMusicProgram, getTopListDetailData };
});
