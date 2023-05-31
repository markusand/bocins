<template>
  <section class="section">
    <h3>Togglers<em>Activate or deactivate between options</em></h3>

    <fieldset class="label stack">
      <legend>Single option</legend>
      <Toggler v-model="data.howto" value="Cheap" label="Cheap" />
      <Toggler v-model="data.howto" value="Fast">Fast</Toggler>
      <Toggler v-model="data.howto" value="Good">✨</Toggler>
      <p>{{ data.howto }}</p>
    </fieldset>

    <fieldset class="label stack">
      <legend>Multiple options</legend>
      <Toggler v-model="data.parts" value="Milk" label="Milk" />
      <Toggler v-model="data.parts" value="Apples">Apples</Toggler>
      <Toggler v-model="data.parts" value="Beef">🥩</Toggler>
      <p>{{ data.parts }}</p>
    </fieldset>

    <fieldset class="label stack">
      <legend>Switch</legend>
      <Toggler v-model="data.active" switch>On / Off</Toggler>
      <Toggler
        v-for="shift in shifts"
        :key="shift"
        v-model="data.shift"
        :value="shift"
        :disabled="!data.active"
        switch
        block>
        {{ shift }}
      </Toggler>
    </fieldset>

    <fieldset class="label stack">
      <legend>Buttons</legend>
      <fieldset>
        <ToggleButton v-model="data.active">On / Off</ToggleButton>
        <fieldset class="button-group">
          <ToggleButton
            v-for="shift in shifts"
            :key="shift"
            v-model="data.shift"
            :value="shift"
            :disabled="!data.active">
            {{ shift }}
          </ToggleButton>
        </fieldset>
      </fieldset>
      <fieldset class="button-group">
        <ToggleButton v-model="data.parts" value="Milk">Milk</ToggleButton>
        <ToggleButton v-model="data.parts" value="Apples">Apples</ToggleButton>
        <ToggleButton v-model="data.parts" value="Beef">🥩</ToggleButton>
      </fieldset>
    </fieldset>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'; 
import { Toggler, ToggleButton } from '/@/components';

const shifts = ['Morning', 'Afternoon', 'Night'];

const data = reactive({
  shift: undefined,
  active: false,
  parts: [] as string[],
  howto: undefined,
});
</script>
