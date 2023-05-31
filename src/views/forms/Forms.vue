<template>
  <section>
    <FormFields />
    <FormSelectors />
    <FormDates />
    <FormTogglers />
    <FormSliders />
    <FormOther />
  </section>
</template>

<script setup lang="ts">
import FormFields from './FormFields.vue';
import FormSelectors from './FormSelectors.vue';
import FormDates from './FormDates.vue';
import FormTogglers from './FormTogglers.vue';
import FormSliders from './FormSliders.vue';
import FormOther from './FormOther.vue';
</script>
