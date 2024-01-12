<template>
  <section class="section">
    <h3>Date fields<em>Select dates from calendars or datepickers</em></h3>
    
    <Calendar
      v-model="data.date"
      :not-after="new Date()"
      :invalid="invalidDates" />
    
    <Calendar
      v-model="data.dates"
      :invalid="invalidDates" />
    
    <Calendar
      :not-after="new Date()"
      :invalid="invalidDates"
      @select="warn" />
    
    <fieldset class="label">
      <legend>Date</legend>
      <Datepicker
        v-model="data.date"
        :not-after="new Date()"
        clearable />
    </fieldset>

    <fieldset class="label">
      <legend>Dates range</legend>
      <Datepicker
        v-model="data.dates"
        clearable>
        <template #separator> ~ </template>
        <template #date="{ date }">
          {{ date?.toLocaleDateString() }}
        </template>
      </Datepicker>
    </fieldset>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { Calendar, Datepicker } from '/@/components';

const invalidDates = ['2022-08-04', '2022-08-05', ['2022-07-08', '2022-07-14']];

const data = reactive({
  date: undefined,
  dates: [undefined, undefined] as [Date | undefined, Date | undefined],
});

const warn = (dates: Date | (Date | undefined)[] | undefined) => {
  const array = Array.isArray(dates) ? dates : [dates];
  const text = array
    .filter(Boolean)
    .map(date => date?.toLocaleDateString())
    .join( ' -> ');
  alert(text);
};
</script>
