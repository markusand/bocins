<template>
  <div class="divider">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
div.divider {
  display: flex;
  align-items: center;
  color: var(--divider-color, #8888);

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid currentcolor;
    margin: var(--divider-margin, 2rem 0.5rem);
    opacity: var(--divider-opacity, 0.5);
  }

  &:empty::after { display: none; }
}
</style>
