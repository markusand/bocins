<template>
  <div class="divider">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div.divider {
  --color: var(--divider-color, #8888);
  --margin: var(--divider-margin, 2rem);

  display: flex;
  align-items: center;
  color: var(--color);
  margin: var(--margin) 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid currentcolor;
    margin: 0 0.5rem;
  }

  &:empty::after { display: none; }
}
</style>
