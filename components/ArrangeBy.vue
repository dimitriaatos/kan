<template>
  <div class="container1 h2size">
    <ul class="parent">
      <li
        v-for="item in focusedCategory ? [focusedCategory] : menu"
        :key="item.type"
      >
        <button class="clickable h2size" @click="handleCategoryClick(item)">
          {{ item.title }}
        </button>
      </li>
    </ul>
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
const { toggleArrangeBy, toggleBurger } = archiveStore;
const { sortBy, filterBy } = storeToRefs(archiveStore);

const focusedCategory = ref<(typeof menu.value)[number] | null>(null);

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
  toggleArrangeBy(null, false);
  toggleBurger(false);
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

const focusOnCategory = (item: (typeof menu.value)[number] | null) => {
  focusedCategory.value = item;
};

const handleCategoryClick = (item: (typeof menu.value)[number]) => {
  focusOnCategory(item);
};
</script>

<style lang="scss" scoped>
.container1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2em;
  border-bottom: 1px solid black;
  width: 100%;
  padding: var(--half-padding) 0;
}

.parent {
  display: flex;
  flex-direction: column;
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
    flex-direction: column;
  }

  .parent {
    flex-direction: column;
    justify-content: space-between;
  }

  .child {
    align-items: flex-start;
  }

  .child.end {
    align-items: flex-start;
  }

  .child.start {
    align-items: flex-start;
  }

  .parent {
    text-align: left;
  }
}
</style>
