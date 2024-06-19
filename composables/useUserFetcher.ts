// useUserFetcher.ts
import {ref} from 'vue';
import {useAbortController} from './useAbortController';
import type {User} from "~/data/user";

export function useUserFetcher() {
    const state = reactive({
        data: [] as User[],
        loading: false,
    });

    const {createAbortController, abort, signal} = useAbortController();

    const fetchUsers = async (unmaskedValue?: string, email?: string) => {
        createAbortController();
        state.loading = true;

        const response = await $fetch('/api/users', {
            query: {number: unmaskedValue, email: email},
            signal: signal.value,
        });
        state.data = response.users;
        state.loading = false;
    };

    return {
        fetchUsers,
        userData: state,
        abortFetch: abort,
    };
}
