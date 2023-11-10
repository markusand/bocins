<template>
  <Dropdown
    class="b-datepicker b-input"
    :style="`width:${props.size}${isNumber(props.size) ? 'rem' : ''}`">
    <template #toggler>
      <div class="b-datepicker__label">
        <span v-if="date">{{ props.formatter(date) }}</span>
        <span v-else class="b-datepicker__placeholder">{{ props.placeholder }}</span>
      </div>
      <Icon
        v-if="clearable && date"
        src="/icons/close.svg"
        class="b-datepicker__clear"
        @click="clear" />
      <Icon
        v-else
        src="/icons/chevron-down.svg"
        class="b-datepicker__chevron" />
    </template>
    <Calendar v-model="date" v-bind="$attrs" class="b-datepicker__calendar" />
  </Dropdown>
</template>

<script setup lang="ts">
import { isNumber } from '/@/utils/number';
import Dropdown from '../Dropdown.vue';
import Calendar from './Calendar.vue';
import Icon from '../Icon.vue';

type Props = {
  placeholder?: string;
  clearable?: boolean;
  formatter?: (date: Date) => string;
  size?: string | number;
};

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Pick a date',
  formatter: (date: Date) => date.toLocaleDateString(),
  size: 'calc(100% - 2 * var(--margin))',
});

const date = defineModel<Date | undefined>({ required: true });

const clear = () => { date.value = undefined; };
</script>
