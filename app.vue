<template>
  <div>
    <UContainer class="py-8">
      <UCard>
        <template #header>
          <h2>Users</h2>
        </template>

        <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Email" name="email" required>
            <UInput v-model="state.email"/>
          </UFormGroup>

          <UFormGroup label="Number" name="masked">
            <UInput v-model="state.masked" type="text" v-maska:unmaskedValue.unmasked="'##-##-##'"/>
          </UFormGroup>

          <UButton type="submit">
            Submit
          </UButton>
        </UForm>

        <template #footer>
          <UTable :rows="userData.data" :loading="userData.loading" />
        </template>
      </UCard>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { userSchema as schema } from '@/schema/user';
import { useFormHandler } from '@/composables/useFormHandler';
import { useUserFetcher } from '@/composables/useUserFetcher';
import type { FormSubmitEvent } from '#ui/types';
import type { Schema } from '@/schema/user';

const { form, clearForm, handleValidationErrors } = useFormHandler();
const { fetchUsers, userData, abortFetch } = useUserFetcher();

const state = reactive({
  email: undefined,
  masked: undefined,
});

const unmaskedValue = ref('');

defineExpose({
  unmaskedValue
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  clearForm();
  abortFetch();

  try {
    await fetchUsers(unmaskedValue.value, state.email);
  } catch (err) {
    handleValidationErrors(err);
  }
}
</script>

