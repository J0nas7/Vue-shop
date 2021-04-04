<template>
    <div v-if="documents.length">
        <div v-for="doc in documents" :key="doc.text">
            {{ doc.text }}
        </div>
    </div>
    <div v-else>
        Nothing to show
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    setup() {
        const documents = []

        documents.push({ text: "le" })
        documents.push({ text: "la" })
        documents.push({ text: "lo" })

        return { documents }
    }
}
</script>

<style>

</style>