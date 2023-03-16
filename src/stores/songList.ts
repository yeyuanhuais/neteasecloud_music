import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { SongListProgram } from "@/models/songList";

export const useSongListStore = defineStore("songList", () => {
  const songListProgram = ref<SongListProgram[]>([]);
  const getSongListProgram = async (limit: number = 10, offset: number = 0) => {
    if (songListProgram.value.length > 0) return;
    const { result } = await _axios.get<{ result: SongListProgram[] }>("/personalized", { params: { limit: 5 } });
    songListProgram.value = result;
  };
  return { getSongListProgram, songListProgram };
});
