import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Banner } from "@/models/banner";
import _axios from "@/plugins/axios";
import type { Artist, ArtistDetail, Mv, ArtistDesc, ArtistDescTopicData } from "@/models/artist";
import type { Song } from "@/models/song";
import type { Album } from "@/models/album";

export const useArtistStore = defineStore("artist", () => {
  /* ======== 歌手分类列表 ======== */
  const getArtistList = async (pageData: { type: number; area: number; initial: string; page: number; limit: number }) => {
    const res: { code: number; artists: Artist[] } | any = await _axios.get("/artist/list", {
      params: {
        type: pageData.type,
        area: pageData.area,
        initial: pageData.initial,
        limit: pageData.limit,
        offset: (pageData.page - 1) * pageData.limit,
      },
    });

    if (res.code === 200) return res;
  }; /* ======== 获取歌手详情 ======== */
  const getArtistDetail = async (id: number) => {
    const res: { code: number; data: ArtistDetail } = await _axios.get("/artist/detail", {
      params: { id },
    });

    if (res.code === 200) return res.data;
  };
  /* ======== 歌手全部歌曲 ======== */
  const getArtistSongs = async (id: number, order: string = "time", limit: number = 10, offset: number = 0) => {
    const res: { code: number; songs: Song[] } | any = await _axios.get("/artist/songs", {
      params: { id: id, order: order, limit: limit, offset: offset },
    });

    if (res.code === 200) return res;
  };

  /* ======== 歌手热门 50 首歌曲 ======== */
  const getArtistHotSongs = async (id: number) => {
    const res: { code: number; songs: Song[] } | any = await _axios.get("/artist/top/song", {
      params: { id: id },
    });

    if (res.code === 200) return res;
  };
  /* ======== 获取歌手 mv ======== */
  const getArtistMv = async (id: number, limit: number = 10, offset: number = 0) => {
    const res: { code: number; mvs: Mv[] } | any = await _axios.get("/artist/mv", {
      params: { id: id, limit: limit, offset: offset },
    });

    if (res.code === 200) return res;
  };
  /* ======== 获取歌手描述 ======== */
  const getArtistDesc = async (id: number) => {
    const res: ArtistDesc = await _axios.get("/artist/desc", {
      params: { id: id },
    });

    if (res.code === 200) return res;
  };
  /* ======== 获取歌手专辑 ======== */
  const getArtistAlbum = async (id: number, limit: number = 10, offset: number = 0) => {
    const res: { code: number; hotAlbums: Album[] } | any = await _axios.get("/artist/album", {
      params: { id: id, limit: limit, offset: offset },
    });

    if (res.code === 200) return res;
  };
  /* ======== 获取相似歌手 ======== */
  const getSimiArtist = async (id: number) => {
    const res: { code: number; artists: Artist[] } | any = await _axios.get("/simi/artist", {
      params: { id: id },
    });

    if (res.code === 200) return res;
  };
  return { getArtistList, getArtistDetail, getArtistSongs, getArtistMv, getArtistDesc, getArtistAlbum, getArtistHotSongs, getSimiArtist };
});
