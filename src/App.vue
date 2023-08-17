<template>
    <router-view />
</template>

<script setup>
import useSettingsStore from '@/stores/settings';
import { handleThemeStyle } from '@/util/theme';
import {nextTick, onMounted} from "vue";

onMounted(() => {
    nextTick(() => {
        // 初始化主题样式
        handleThemeStyle(useSettingsStore().theme);
    });
});
</script>