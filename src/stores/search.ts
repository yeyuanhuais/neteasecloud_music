import type { SearchSuggest } from "@/models/search";
import _axios from "@/plugins/axios";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      showSearchView: false,
      searchKeyword: "",
      suggestData: {} as SearchSuggest,
    };
  },
  getters: {
    showHit: state => {
      return state.searchKeyword === "";
    },
  },
  actions: {
    async suggest() {
      const { result }: { result: SearchSuggest }= await _axios.get("/search/suggest", { params: { keywords: this.searchKeyword } });
      this.suggestData = result;
    },
  },
});
