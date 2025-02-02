import { defineStore } from "pinia";
import type { Category } from "~/types/Category";

interface CategoriesState {
  categories: Category[];
  nameForAll: string;
}

export const useCategoriesStore = defineStore("categories", {
  state: (): CategoriesState => ({
    categories: [],
    nameForAll: "Tous",
  }),
  getters: {
    categoriesList(state: CategoriesState): Category[] {
      return state.categories;
    },
    currentCategory(state: CategoriesState): Category {
      const { categoryFilter } = useTasksStore();
      if (categoryFilter === -1) {
        return {
          id: -1,
          name: state.nameForAll,
          color: "neutral",
        };
      }
      return state.categories[
        state.categories.findIndex((c) => c.id === categoryFilter)
      ];
    },
  },
  actions: {
    async fetchCategories() {
      const {
        categories: { get },
      } = useApi();
      const categories = await get();
      this.categories = categories;
    },
    getCategoriesFromId(numArray: number[]) {
      return numArray.map(
        (c) =>
          this.categories[this.categories.findIndex((cat) => c == cat.id)]
      );
    },
  },
});
