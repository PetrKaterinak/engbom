<script setup lang="ts">
import {Item} from "./Models/Item";

const props = defineProps<{
  children: Array<Item>,
  activeColor: string,
  iconSize: string,
}>();

const emit = defineEmits<{
  (event: 'submenu-clicked', child: Item): void;
}>();

const handleSubmenuClick = (child: Item) => {
  emit('submenu-clicked', child);
};
</script>

<template>
  <div class="ml-4 mt-1 space-y-1">
    <div v-for="(child, childIndex) in props.children"
         :key="'submenu' + childIndex">
      <div @click="handleSubmenuClick(child)"
           class="navbar-button w-full text-left rounded-md flex items-center justify-between gap-2 px-2"
           :class="child.isActive ? 'text-white' : 'hover:bg-white/30 text-gray-400'"
           :style="child.isActive ? `background-color: ${props.activeColor}` : ''">
        <div class="truncate">
          <div class="flex items-center gap-2">
            <span v-if="child.icon" :class="[child.icon, 'text-' + props.iconSize]"/>
            <span v-else class="mdi mdi-circle-medium" :class="['text-' + props.iconSize]"/>
            <span class="truncate">{{ child.title }}</span>
          </div>
        </div>
        <span v-if="child.badge" class="navbar-badge">{{ child.badge }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-badge {
  @apply text-xs text-center py-0.5 px-1 min-w-6 mr-1 bg-rose-500 text-white rounded-full;
}
</style>