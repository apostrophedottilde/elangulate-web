<template>
    <div class="card correction-sets-container">
        Correction sets
        <div class="card correction-sets-list" v-for="correctionSet in liveCorrectionSets" v-bind:key="correctionSet.id">
          <correction-set></correction-set>
        </div>
    </div>
</template>

<script>
    export default {
        name: "correction-sets"
    }
</script>

<style scoped>

</style>