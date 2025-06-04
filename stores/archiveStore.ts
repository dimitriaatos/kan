import { defineStore } from "pinia";
import { z } from "zod";
import { getFormattedWorks } from "~/assets/archive";
import type { Order, Sort, Works } from "~/assets/arrangeBy";
import { defaultSorting } from "~/assets/common";
import { archiveSchema, getArchiveQuery, type Archive } from "~/schema";

export enum OpenFrom {
  Hover,
  Click,
}
type ArrangeByOpen = { state: boolean; from: OpenFrom | null };

export const useArchiveStore = defineStore("archiveStore", () => {
  const isOpen = ref<ArrangeByOpen>({
    state: false,
    from: null,
  });
  const sortBy = ref<{ type: Sort; order: Order }>(defaultSorting);
  const filterBy = ref<string | null>(null);
  const parsedWorks = ref<Works>([]);

  const isBurgerOpen = ref(false);

  const toggleBurger = (state?: boolean) => {
    if (state !== undefined) isBurgerOpen.value = state;
    else isBurgerOpen.value = !isBurgerOpen.value;
  };

  type ToggleArrangeBy = {
    (callback: (prev: typeof isOpen.value) => typeof isOpen.value): void;
    (from: ArrangeByOpen["from"], state?: ArrangeByOpen["state"]): void;
  };

  const toggleArrangeBy: ToggleArrangeBy = (
    from,
    state?: ArrangeByOpen["state"]
  ) => {
    if (typeof from === "function") {
      const callback = from;
      isOpen.value = callback(isOpen.value);
    } else isOpen.value = { from, state: state ?? !isOpen.value };
  };

  const initArchive = async (
    $directus: ReturnType<typeof useNuxtApp>["$directus"]
  ): Promise<boolean> => {
    const config = useRuntimeConfig();
    try {
      const res = await $directus.query(
        getArchiveQuery(filterBy.value !== null),
        {
          sort: `${sortBy.value.order}${sortBy.value.type}`,
          typology: filterBy.value,
        }
      );
      const parsed = z.object({ archive: archiveSchema }).parse(res).archive;
      const formatted = getFormattedWorks(parsed, config);
      parsedWorks.value = formatted;
      return true;
    } catch {
      return false;
    }
  };

  const toggleAccordion = (index: number, state?: boolean) => {
    console.log({ index, state });
    parsedWorks.value[index].open = state ?? !parsedWorks.value[index].open;
  };

  return {
    initArchive,
    parsedWorks,
    toggleAccordion,

    isOpen,
    toggleArrangeBy,
    sortBy,
    filterBy,

    isBurgerOpen,
    toggleBurger,
  };
});
