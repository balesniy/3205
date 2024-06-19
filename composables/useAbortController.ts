// useAbortController.ts
import { ref, onUnmounted } from 'vue';

export function useAbortController() {
    const abortController = ref<AbortController | null>(null);

    const createAbortController = () => {
        abortController.value?.abort();
        abortController.value = new AbortController();
    };

    const abort = () => {
        abortController.value?.abort();
        abortController.value = null;
    };

    onUnmounted(() => {
        abortController.value?.abort();
    });

    return {
        createAbortController,
        abort,
        signal: computed(() => abortController.value?.signal),
    };
}
