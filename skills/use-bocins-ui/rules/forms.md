# Forms & Validation

## Rules

- ALWAYS use `v-model` on form components
- Use `invalid` prop for error states
- Label all inputs (accessibility)

### v-model (REQUIRED on forms)

Always use v-model. Direct :value and @input bindings are strictly forbidden for form components.

```html
<!-- ✓ Correct -->
<Input v-model="text" />
<Selector v-model="item" :options="items" />    <!-- Single select -->
<Selector v-model="multi" :options="items" />   <!-- Array = multi -->

<!-- ✗ Wrong -->
<Input :value="text" @input="..." />
```

## Validation Pattern

Use a library or composable to handle validation and bind it to `invalid` prop.

```html
<form @submit.prevent="handleSubmit">
  <label>
    <em>Email</em>
    <Input v-model="email" :invalid="v$.email.$error" />
  </label>
  <p v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</p>

  <Button type="submit" :disabled="v$.$invalid">Submit</Button>
</form>
```

```ts
const form = reactive({ email: '' });
const { validate, validators = { required, email } } = useValidation();
const v$ = validate({
  email: { required, email },
}, form);
```
