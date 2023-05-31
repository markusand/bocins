<template>
  <section class="section">
    <h3>Other<em>More form elements</em></h3>
    <fieldset class="label">
      <legend>Rating</legend>
      <Rating v-model="data.rating" />
    </fieldset>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Rating } from '/@/components';

const data = reactive({
  rating: undefined,
});
</script>
