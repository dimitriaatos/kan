<template>
  <div class="container1 h2size">
    <ul
      v-if="parent !== null"
      class="child"
      :class="{
        start: parent == menu.at(0)?.property,
        end: parent == menu.at(-1)?.property,
      }"
    >
      <li
        v-for="menuChild in menu.find((item) => item.property === parent)
          ?.children"
        :key="menuChild"
      >
        <button
          class="clickable h2size"
          :class="{
            selected: child === menuChild,
          }"
          @click="select(menuChild)"
        >
          {{ menuChild }}
        </button>
      </li>
    </ul>
    <ul class="parent">
      <li v-for="item in menu" :key="item.property">
        <button
          class="clickable h2size"
          :class="{
            selected: parent === item.property,
          }"
          @click="toggle(item.property)"
        >
          {{ item.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { menu } from "~/assets/arrangeBy";

const arrangeBy = useArrangeByStore();
const { parent, child } = storeToRefs(arrangeBy);
const toggle = (value: (typeof menu)[number]["property"] | null) => {
  parent.value = parent.value === value ? null : value;
  child.value = null;
};

const select = (value: (typeof menu)[number]["children"][number] | null) => {
  child.value = value;
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
</style>
