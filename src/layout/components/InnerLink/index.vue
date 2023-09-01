<template>
    <div :style="'height:' + height">
        <iframe
            :id="iframeId"
            :src="src"
            frameborder="no"
            style="width: 100%; height: 100%"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
    src: {
        type: String,
        default: '/'
    },
    iframeId: {
        type: String
    }
})

const height = ref(document.documentElement.clientHeight - 94.5 + 'px')
</script>
