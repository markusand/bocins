<template>
  <section class="section">
    <h3>Form fields<em>Enter text or numeric data</em></h3>
    
    <article>
      <label class="label">
        <em>Base field</em>
        <InputField
          v-model="data.name"
          placeholder="Name" />
      </label>
      
      <label class="label">
        <em>Prefix</em>
        <InputField
          v-model="data.website"
          type="url"
          placeholder="Website"
          size="15"
          prefix="https://" />
      </label>
      
      <label class="label">
        <em>Suffix</em>
        <InputField
          v-model="data.priceEuro"
          type="text"
          placeholder="Price"
          size="5"
          suffix="€" />
      </label>
      
      <label class="label">
        <em>Icon</em>
        <InputField
          v-model="data.search"
          type="text"
          placeholder="Search"
          clearable>
          <template #prefix>
            <Icon src="/icons/search.svg" />
          </template>
        </InputField>
      </label>

      <label class="label">
        <em>Password</em>
        <PasswordField
          v-model="data.password"
          placeholder="Password"
          size="14" />
      </label>

      <label class="label">
        <em>Number</em>
        <NumberField
          v-model="data.age"
          placeholder="Age"
          min="18"
          max="99"
          size="6" />
      </label>

      <label class="label">
        <em>Tags</em>
        <ChipsField v-model="data.tags" size="15" />
      </label>

      <fieldset class="label">
        <legend>Group fields</legend>
        <fieldset class="input-group">
          <InputField
            v-model="data.name"
            placeholder="Name"
            size="6" />
          <PasswordField
            v-model="data.password"
            placeholder="Password"
            size="6" />
          <ChipsField v-model="data.tags" />
          <NumberField
            v-model="data.age"
            placeholder="Age"
            min="18"
            max="99"
            size="5" />
          <Selector
            v-model="data.age"
            :options="[...Array(82)].map((_, i) => 18 + i)"
            placeholder="Select one..."
            size="5" />
        </fieldset>
      </fieldset>

      <fieldset class="label">
        <em>With button</em>
        <InputField v-model="data.website" size="10" />
        <Button>
          <Icon src="/icons/search.svg" class="unique" />
        </Button>
      </fieldset>

      <fieldset class="label">
        <em>Grouped</em>
        <span class="input-group">
          <InputField v-model="data.website" size="10" />
          <Button>
            <Icon src="/icons/search.svg" class="unique" />
          </Button>
        </span>
      </fieldset>
    </article>
    
    <article>
      <fieldset class="label">
        <legend>Files</legend>
        <FileUpload
          v-model="data.files"
          accept="image/*"
          max-size="100"
          multiple
          @error="onUploadError" />
      </fieldset>

      <fieldset class="label">
        <legend>Preview file</legend>
        <FileUpload
          v-model="data.avatar"
          accept="image/*"
          max-size="100"
          @error="onUploadError">
          <template #file="{ file, remove }">
            <img :src="fileUrl(file)" class="preview">
            <button class="remove-file" @click="remove">&times;</button>
          </template>
        </FileUpload>
      </fieldset>

      <fieldset class="label">
        <legend>With callback</legend>
        <FileUpload
          accept="image/*"
          max-size="100"
          multiple
          @change="onUploadChange"
          @error="onUploadError">
          <template #file="{ file, remove }">
            <img :src="fileUrl(file)" class="preview">
            <button class="remove-file" @click="remove">&times;</button>
          </template>
        </FileUpload>
      </fieldset>
    </article>

    <label class="label">
      <em>Bio</em>
      <LongText
        v-model="data.bio"
        max-length="280"
        rows="7.5"
        indentable />
    </label>

    <label class="label block">
      <em>Block input</em>
      <InputField v-model="data.name" block />
    </label>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import {
  InputField,
  LongText,
  FileUpload,
  PasswordField,
  NumberField,
  Icon,
  Selector,
  ChipsField,
  Button,
} from '/@/components';

const data = reactive({
  name: '',
  bio: '',
  search: '',
  password: '',
  website: '',
  priceEuro: '0',
  age: 18,
  files: [] as File[],
  avatar: [] as File[],
  tags: [] as string[],
});

const fileUrl = (file: File) => URL.createObjectURL(file);

const onUploadError = (error: { error: Error, file?: File }) => {
  alert(error.error.message);
};

const onUploadChange = ({ files }: { files: File[] }) => {
  alert(`Upload ${files.length} files`);
};
</script>

<style lang="scss" scoped>
.preview {
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  opacity: 0.5;
}

.remove-file {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #f65;
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 2rem;
  border-radius: 50%;
  display: none;

  .dropzone:hover & { display: block; }
}
</style>
