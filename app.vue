<template>
  <div>
    <NuxtLoadingIndicator/>
    <UContainer class="py-8">
      <UCard>
        <template #header>
          <h2>Users</h2>
        </template>

        <UForm ref="form" :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
          <UFormGroup label="Email" name="email" required>
            <UInput v-model="state.email" />
          </UFormGroup>

          <UFormGroup label="Number" name="number">
            <UInput v-model="state.number" type="text" v-maska:unmaskedValue.unmasked="'##-##-##'" />
          </UFormGroup>

          <UButton type="submit">
            Submit
          </UButton>
        </UForm>

        <template #footer>
          <UTable :rows="state.data" />
        </template>
      </UCard>
    </UContainer>
  </div>
</template>
<script setup lang="ts">
import { userSchema as schema } from '@/schema/user';
import type { Schema } from '@/schema/user';
import type { FormError, FormSubmitEvent } from '#ui/types'
import type { User } from '@/data/user'


const state = reactive({
  email: undefined,
  number: undefined,
  data: [] as User[],
})

const unmaskedValue = ref('')
defineExpose({ unmaskedValue })

const form = ref()

async function onSubmit (event: FormSubmitEvent<Schema>) {
  form.value.clear()
  try {
    const { users } = await $fetch('/api/users', {
      query: { number: unmaskedValue.value, email: state.email },
    })
    state.data = users
  } catch (err) {
    if (err.statusCode === 422) {
      form.value.setErrors(err.data.errors.map((err) => ({
        // Map validation errors to { path: string, message: string }
        message: err.message,
        path: err.path,
      })))
    }
  }
}
</script>

