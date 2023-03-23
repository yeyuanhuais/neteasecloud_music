import { ref, computed } from "vue";
import { defineStore } from "pinia";
import _axios from "@/plugins/axios";
import type { PlaylistProgram } from "@/models/playlist";
import type { Song } from "@/models/song";

export const usePlaylistStore = defineStore("playlist", () => {
  const playlistProgram = ref<PlaylistProgram[]>([]);
  const playlistTrackAll = ref<Song[]>([]);
  /* ======== 推荐歌单 ======== */
  const getPlaylistProgram = async (limit: number = 10, offset: number = 0) => {
    if (playlistProgram.value.length > 0) return;
    const { result } = await _axios.get<{ result: PlaylistProgram[] }>("/personalized", { params: { limit: 6 } });
    playlistProgram.value = result;
  };
  /* ======== 获取歌单所有歌曲 ======== */
  const getPlaylistTrackAll = async (id: number, limit: number = 0, offset: number = 0) => {
    const { songs } = await _axios.get<{ songs: Song[]; privileges: any; code: number }>("/playlist/track/all", { params: { id, limit, offset } });
    playlistTrackAll.value = songs;
    return songs;
  };
  return { getPlaylistProgram, playlistProgram, getPlaylistTrackAll, playlistTrackAll };
});
