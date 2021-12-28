<template>
  <div
    class="wrapper h-3 w-6 flex flex-row items-end space-x-0.5 px-1 opacity-60"
  >
    <div class="w-1/3 h-1/3 rounded-tr-xs rounded-tl-xs"></div>
    <div class="w-1/3 h-2/3 rounded-tr-xs rounded-tl-xs"></div>
    <div class="w-1/3 h-full rounded-tr-xs rounded-tl-xs"></div>
  </div>
</template>

<script>
export default {
  name: "PriorityIndicator",
};
</script>

<style scoped>
.low > :first-child {
  background: #047857;
}

.low > :nth-child(2),
.low > :nth-child(3) {
  background: #9ca3af;
}

.medium > :first-child,
.medium > :nth-child(2) {
  background: #f59e0b;
}

.medium > :nth-child(3) {
  background: #9ca3af;
}

.high > div {
  background: #b91c1c;
}

.none > div {
  background: #9ca3af;
}
</style>