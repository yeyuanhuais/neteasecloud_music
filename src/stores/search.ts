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
      const { result } = await _axios.get<{ result: SearchSuggest }>("/search/suggest", { params: { keywords: this.searchKeyword } });
      this.suggestData = result;
    },
  },
});
