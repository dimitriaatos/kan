<template>
  <div>
    <NuxtLink
      v-if="to !== undefined"
      :to="to"
      @click="handleClick"
      id="close"
      class="clickable"
    >
      <div />
    </NuxtLink>
    <button @click="handleClick" id="close" class="clickable" v-else>
      <div />
    </button>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ to?: string }>();
const emit = defineEmits<(e: "click", event: MouseEvent) => void>();

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<style scoped>
#close {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1/1;
  width: 2em;
}

#close > div {
  background-color: rgb(255 0 0);
  border-radius: 50%;
  width: 1em;
  height: 1em;
}
</style>
