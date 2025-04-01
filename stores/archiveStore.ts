import { defineStore } from "pinia";
import { z } from "zod";
import { getFormattedWorks } from "~/assets/archive";
import type { Order, Sort, Works } from "~/assets/arrangeBy";
import { defaultSorting } from "~/assets/common";
import { archiveSchema, getArchiveQuery, type Archive } from "~/schema";

export const useArchiveStore = defineStore("archiveStore", () => {
  const isOpen = ref<boolean>(false);
  const sortBy = ref<{ type: Sort; order: Order }>(defaultSorting);
  const filterBy = ref<string | null>(null);
  const parsedWorks = ref<Works>([]);

  const toggleArrangeBy = (state?: boolean) => {
    isOpen.value = state ?? !isOpen.value;
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
  };
});
