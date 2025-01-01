<script setup>

import {computed, onMounted, onUnmounted, ref} from "vue";
import router from "../../router.js";
import {useRoute} from "vue-router";
import NavbarItem from "./NavbarItem.vue";
import NavbarSubmenu from "./NavbarSubmenu.vue";

const props = defineProps({
  logo: {type: String, required: false},
  variableItems: {type: Array, required: true},
  fixedItems: {type: Array, required: false},
  navbarConfig: {type: Object, required: false},
});

const route = useRoute();

// Navbar state
const navbarExpanded = ref(localStorage.getItem('navbar_is_expanded') === 'true' || false);
const submenuExpanded = ref({});
const tooltip = ref({visible: false, text: '', styles: {}});
const popup = ref({visible: false, items: [], styles: {}});
const mainPopup = ref({visible: false, styles: {}});

// Parse navbar config
const activeColor = props.navbarConfig?.activeColor ?? '#756094';
const primaryColor = props.navbarConfig?.primaryColor ?? '#452750';
const secondaryColor = props.navbarConfig?.secondaryColor ?? '#2F1937';
const iconSize = props.navbarConfig?.iconSize ?? 'xl'; // Tailwind JIT safelist: 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-8xl', 'text-9xl'
const mobileBreakpoint = props.navbarConfig?.mobileBreakpoint ?? 640;

// Helper function to check if an item (or its children) is active
const isActive = (item) => {
  if (item.to && item.to === route.path) {
    return true;
  } else if (item.children) {
    return item.children.some(child => child.to === route.path);
  }
  return false;
}

// Compute active state for each item
const computeActiveState = (items) => {
  const result = items.map((item) => ({
    ...item,
    isActive: isActive(item),
    children: item.children ? computeActiveState(item.children) : undefined,
  }));
  // look for active children and add to submenuExpanded
  if (navbarExpanded.value) {
    result.forEach((item, index) => {
      if (item.children && item.children.some(child => child.isActive)) {
        submenuExpanded.value[index] = true;
      }
    });
  }
  return result;
}

const variableItems = computed(() => computeActiveState(props.variableItems));
const fixedItems = computed(() => computeActiveState(props.fixedItems));

// Toggle navbar size
function toggleNavbarExpansion(newState = null) {
  navbarExpanded.value = newState ?? !navbarExpanded.value;
  if (navbarExpanded.value === false) {
    submenuExpanded.value = {};
  } else {
    hideTooltip();
    // expand submenu for active items
    variableItems.value.forEach((item, index) => {
      if (item.children && item.isActive) {
        submenuExpanded.value['variableItems_' + index] = true;
      }
    });
    fixedItems.value.forEach((item, index) => {
      if (item.children && item.isActive) {
        submenuExpanded.value['fixedItems_' + index] = true;
      }
    });
  }
  localStorage.setItem('navbar_is_expanded', navbarExpanded.value.toString());
}

// Toggle submenu visibility for expanded navbar
const toggleSubmenuExpand = (groupAndIndex) => {
  submenuExpanded.value[groupAndIndex] = !submenuExpanded.value[groupAndIndex]
}

// Handle item click
const handleClick = (item, groupAndIndex, event) => {
  const [prop, index] = groupAndIndex.split('_');
  if (item.children && !item.to && navbarExpanded.value) {
    // Expand submenu when navbar is expanded
    toggleSubmenuExpand(groupAndIndex)
  } else if (item.children && !navbarExpanded.value) {
    // Show popup submenu when navbar is collapsed
    showPopupMenu(item.title, item.children, event);
    event.stopPropagation();
  } else if (item.to) {
    // Navigate if `to` param exists
    router.push(item.to)
  }
}

// Handle submenu item click
const handleSubmenuClick = (child) => {
  if (child.to) router.push(child.to);
  popup.value.visible = false; // Close popup after click
};

const showTooltip = (groupAndIndex, event) => {
  const [prop, index] = groupAndIndex.split('_');
  const item = prop && index ? props[prop][index] : {};
  const rect = event.target.getBoundingClientRect();

  const isMobile = window.innerWidth < mobileBreakpoint;

  tooltip.value = {
    visible: true,
    text: prop === 'expandToggle' ? 'Expand' : item.title,
    styles: {
      top: isMobile ? `${rect.bottom}px` : `${rect.top + rect.height / 2}px`,
      transform: isMobile ? 'translateX(-50%)' : 'translateY(-50%)',
      left: isMobile ? `${rect.left + rect.width / 2}px` : `${rect.right + 10}px`,
    }
  };
};

// Hide Tooltip
const hideTooltip = () => {
  tooltip.value.visible = false;
};

// Show popup submenu
const showPopupMenu = (title, items, event) => {
  const isMobile = window.innerWidth < mobileBreakpoint;
  let rect;
  if (isMobile) {
    rect = document.getElementById('navbar').getBoundingClientRect();
  } else {
    rect = event.target.getBoundingClientRect();
  }

  popup.value = {
    visible: true,
    title: title,
    items,
    styles: {
      top: isMobile ? `${rect.bottom}px` : `${rect.top}px`,
      left: isMobile ? 0 : `${rect.right + 10}px`,
      width: isMobile ? '100%' : 'auto',
    }
  };
};

// Show main popup
const showMainPopup = (event) => {
  const rect = document.getElementById('logo-section').getBoundingClientRect();
  mainPopup.value = {
    visible: true,
    styles: {
      top: `${rect.bottom + 10}px`,
      left: `${rect.left + 10}px`,
    }
  };
};

// Close popup when clicked outside
const handleClickOutside = (event) => {
  // Check if clicked inside the popup
  if (!event.target.closest('.navbar-popup') && popup.value.visible) {
    popup.value.visible = false;
  }

  if (!event.target.closest('.main-popup') && mainPopup.value.visible) {
    mainPopup.value.visible = false;
  }
};

// Handle window resize
let timeout;
const handleResize = () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (window.innerWidth < mobileBreakpoint) {
      toggleNavbarExpansion(false);
      submenuExpanded.value = {};
    }
  }, 200); // Delay in milliseconds
};

// Attach and detach event listeners
onMounted(() => {
  window.addEventListener('resize', handleResize)
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div id="navbar" class="w-full sm:h-screen flex flex-row sm:flex-col gap-1 sm:gap-4 items-center py-2 sm:py-4 pl-2"
       :class="[ navbarExpanded ? 'sm:w-56' : 'sm:w-14' ]"
       :style="[ `background: ${primaryColor}`, `background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`]">

    <!-- Logo section -->
    <div @click.stop="showMainPopup" id="logo-section" class="min-w-14 sm:w-full pr-2 flex items-center" :class="[navbarExpanded ? 'justify-start' : 'justify-center']">
      <img v-if="props.logo" :src="props.logo" alt="logo" class="w-full max-w-8 aspect-square"/>
      <div v-if="navbarExpanded" class="flex flex-col h-full ml-2 overflow-hidden leading-3">
        <span class="font-bold text-lg truncate text-white">Engineering Bill of Material</span>
        <span>Petr Katerinak</span>
      </div>
    </div>


    <!-- Navigation Items -->
    <nav class="flex flex-row sm:flex-col gap-2 h-full w-full overflow-y-hidden sm:overflow-y-auto overflow-x-auto sm:overflow-x-hidden scrollbar-gutter-stable scrollbar-thin">
      <div v-for="(item, index) in variableItems" :key="'variableItems_' + index" class="relative w-full">
        <div @click="handleClick(item, 'variableItems_' + index, $event)"
             @mouseenter="navbarExpanded ? () => {} : showTooltip('variableItems_' + index, $event)"
             @mouseleave="hideTooltip"
             class="navbar-button"
             :class="item.isActive ? 'text-white' : 'hover:bg-white/30 text-gray-400'"
             :style="item.isActive ? `background-color: ${activeColor}` : ''">

          <!-- Icon and Title -->
          <NavbarItem :navbar-expanded="navbarExpanded" :item="item" :icon-size="iconSize"/>

        </div>

        <!-- Submenu -->
        <NavbarSubmenu v-if="item.children && submenuExpanded['variableItems_' + index]"
                       :children="item.children" :active-color="activeColor" :icon-size="iconSize"
                       @submenu-clicked="handleSubmenuClick"/>

      </div>
    </nav>

    <!-- Bottom Navigation Items -->
    <nav class="flex flex-row sm:flex-col gap-2 sm:w-full pr-2">
      <div v-for="(item, index) in fixedItems" :key="'fixedItems_' + index" class="relative w-full">
        <div @click="handleClick(item, 'fixedItems_' + index, $event)"
             @mouseenter="navbarExpanded ? () => {} : showTooltip('fixedItems_' + index, $event)"
             @mouseleave="hideTooltip"
             class="navbar-button"
             :class="item.isActive ? 'text-white' : 'hover:bg-white/30 text-gray-400'"
             :style="item.isActive ? `background-color: ${activeColor}` : ''">

          <!-- Icon and Title -->
          <NavbarItem :navbar-expanded="navbarExpanded" :item="item" :icon-size="iconSize"/>

        </div>

        <!-- Submenu -->
        <NavbarSubmenu v-if="item.children && submenuExpanded['fixedItems_' + index]"
                       :children="item.children" :active-color="activeColor" :icon-size="iconSize"
                       @submenu-clicked="handleSubmenuClick"/>

      </div>
    </nav>

    <!-- Expand/Collapse Button -->
    <nav class="hidden sm:flex flex-row sm:flex-col space-y-2 w-full xs:pb-2 sm:pr-2">
      <div class="relative w-full">
        <div @click="toggleNavbarExpansion(null)"
             @mouseenter="navbarExpanded ? () => {} : showTooltip('expandToggle', $event)"
             @mouseleave="navbarExpanded ? () => {} : hideTooltip"
             class="navbar-button hover:bg-white/30 text-gray-400">
          <div class="w-full h-8 flex items-center" :class="[navbarExpanded ? 'justify-start px-1.5' : 'justify-center']">
            <span class="mdi" :class="[navbarExpanded ? 'mdi-chevron-left' : 'mdi-chevron-right', 'text-' + iconSize]"/>
            <div v-if="navbarExpanded" class="ml-2">
              Collapse
            </div>
          </div>
        </div>
      </div>
    </nav>

  </div>

  <!-- Tooltip -->
  <Teleport to="body">
    <div v-if="tooltip.visible && !navbarExpanded" class="navbar-tooltip" :style="tooltip.styles">
      {{ tooltip.text }}
      <div class="navbar-tooltip-arrow"/>
    </div>
  </Teleport>

  <!-- Popup Submenu -->
  <Teleport to="body">
    <div v-if="popup.visible"
         :style="[popup.styles, `background-color: ${primaryColor}`]"
         class="navbar-popup">
      <div class="p-2 font-bold">{{ popup.title }}</div>
      <div v-for="(child, index) in popup.items" :key="'popup_' + index"
           @click="handleSubmenuClick(child)"
           class="popup-item"
           :class="child.isActive ? 'text-white' : 'hover:bg-white/30 text-gray-400'"
           :style="child.isActive ? `background-color: ${activeColor}` : ''">
        <div class="truncate">
          <div class="flex items-center gap-2">
            <span v-if="child.icon" :class="[child.icon, 'text-' + iconSize]"/>
            <span v-else class="mdi mdi-circle-medium" :class="['text-' + iconSize]"/>
            <span class="truncate">{{ child.title }}</span>
          </div>
        </div>
        <span v-if="child.badge" class="navbar-badge">{{ child.badge }}</span>
      </div>
    </div>
  </Teleport>

  <!-- Main Popup -->
  <Teleport to="body">
    <div v-if="mainPopup.visible"
         :style="mainPopup.styles"
         class="main-popup">
      <div class="flex flex-col h-full mx-2 overflow-hidden leading-3">
        <span class="font-bold text-lg truncate">Engineering Bill of Material</span>
        <span>Petr Katerinak</span>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>

/* Custom scrollbar styles */
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-gutter-stable {
  scrollbar-gutter: stable;
}

.navbar-button {
  @apply rounded-lg transition-all w-full min-w-8 cursor-pointer;
}

.navbar-tooltip {
  @apply absolute z-20 bg-white text-gray-800 border border-gray-200 text-sm px-2 py-1 rounded shadow whitespace-nowrap pointer-events-none transition-opacity duration-1000;
}

.navbar-tooltip-arrow {
  @apply absolute left-1/2 sm:left-0 top-0 sm:top-1/2 -translate-x-1/2 sm:translate-x-0 translate-y-0 sm:-translate-y-1/2 -mt-1 sm:mt-0 ml-0 sm:-ml-1 w-2 h-2 bg-white rotate-45;
}

.navbar-popup {
  @apply fixed z-10 text-white rounded-md shadow-lg p-2;
}

.popup-item {
  @apply px-2 py-1 flex items-center justify-between gap-2 rounded cursor-pointer;
}

.main-popup {
  @apply fixed z-10 bg-white text-gray-700 border border-gray-200 rounded-md shadow p-2;
}
</style>