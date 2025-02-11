<template>
  <div class="container1 h2size" @mouseleave="toggleArrangeBy(false)">
    <ul
      v-if="focusedCategory !== null"
      class="child"
      :class="{
        start: focusedCategory?.type == menu.at(0)?.type,
        end: focusedCategory?.type == menu.at(-1)?.type,
      }"
    >
      <li
        v-for="(menuChild, index) in focusedCategory?.children"
        :key="menuChild.title"
      >
        <button
          class="clickable h2size"
          :class="{
            selected: isChildSelected(focusedCategory, index),
          }"
          @click="selectChild(focusedCategory, index)"
        >
          {{ menuChild.title }}
        </button>
      </li>
    </ul>
    <ul class="parent">
      <li v-for="item in menu" :key="item.type">
        <button
          class="clickable h2size"
          :class="{
            selected: focusedCategory?.type === item.type,
          }"
          @mouseover="handleCategoryHover(item)"
          @click="handleCategoryClick(item)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {
  Arrange,
  sortingMenu,
  filteringMenuElement,
  Sort,
} from "~/assets/arrangeBy";
import { defaultSorting } from "~/assets/common";
import type { Typology } from "~/schema";

const props = defineProps<{ typology: Typology[] | null }>();

const menu = computed(() => {
  filteringMenuElement.children = props.typology || [];
  return [...sortingMenu, filteringMenuElement];
});

const archiveStore = useArchiveStore();
const { toggleArrangeBy } = archiveStore;
const { sortBy, filterBy, isOpen } = storeToRefs(archiveStore);

const focusedCategory = ref<(typeof menu.value)[number]>(menu.value[0]);

/**Type-guard function*/
const getIsTypology = (
  item: (typeof menu.value)[number]
): item is typeof filteringMenuElement => {
  return item.type === Arrange.Typology;
};

const selectChild = (category: (typeof menu.value)[number], index: number) => {
  if (getIsTypology(category)) {
    if (filterBy.value === category.children[index].id) filterBy.value = null;
    else filterBy.value = category.children[index].id;
  } else {
    if (
      sortBy.value.type === category.type &&
      category.children[index].type === sortBy.value.order
    ) {
      sortBy.value = defaultSorting;
    } else {
      sortBy.value = {
        type: category.type,
        order: category.children[index].type,
      };
    }
  }
  isOpen.value = false;
};

const isChildSelected = (
  category: (typeof menu.value)[number],
  index: number
): boolean => {
  switch (category.type) {
    case Arrange.Typology:
      return filterBy.value === category.children[index].id;
    case sortBy.value.type:
      return category.children[index].type === sortBy.value.order;
    default:
      return false;
  }
};

const focusOnCategory = (item: (typeof menu.value)[number]) => {
  focusedCategory.value = item;
};

const handleCategoryHover = (item: (typeof menu.value)[number]) => {
  const { matches: isMobile } = window.matchMedia("(hover: hover)");
  if (isMobile) focusOnCategory(item);
};

const handleCategoryClick = (item: (typeof menu.value)[number]) => {
  if (getIsTypology(item)) {
    if (filterBy.value !== null && focusedCategory.value?.type === item.type)
      filterBy.value = null;
  } else {
    if (sortBy.value.type !== defaultSorting.type) {
      sortBy.value = defaultSorting;
    }
  }
  focusOnCategory(item);
};
</script>

<style lang="scss" scoped>
.container1 {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10vw;
  border-bottom: 1px solid black;
  width: 100%;
  padding: var(--half-padding) 0;
}

.parent {
  display: flex;
  flex-direction: column;
  gap: var(--half-padding);
  text-align: right;
}

.child {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
}

.child.end {
  justify-content: flex-end;
}

.child.start {
  justify-content: flex-start;
}

@media (max-width: 850px) {
  .container1 {
    flex-direction: column-reverse;
  }

  .parent {
    flex-direction: row;
    justify-content: space-between;
  }

  .child {
    align-items: center;
  }

  .child.end {
    align-items: flex-end;
  }

  .child.start {
    align-items: flex-start;
  }
}
</style>
