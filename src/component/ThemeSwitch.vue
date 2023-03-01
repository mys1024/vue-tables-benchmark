<script lang="ts" setup>
import { toggleDark } from '~/logic/dark'
</script>

<template>
  <button icon-btn mx-2 outline-none @click="toggleDark()">
    <div i="carbon-sun dark:carbon-moon" />
  </button>
</template>
