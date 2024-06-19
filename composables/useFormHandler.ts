// useFormHandler.ts
import { ref } from 'vue';

type ApiError = {
    statusCode: number;
    data: {
        data: {
            errors: {
                message: string;
                path: string;
            }[];
        };
    };
};

export function useFormHandler() {
    const form: Ref<HTMLFormElement | null> = ref(null);

    const setFormErrors = (errors: any[]) => {
        form.value?.setErrors(
            errors.map(error => ({
                message: error.message,
                path: error.path,
            }))
        );
    };

    const handleValidationErrors = (err: unknown) => {
        if (typeof err === 'object' && err !== null && 'statusCode' in err && 'data' in err) {
            const error = err as ApiError;
            if (error.statusCode === 422) {
                setFormErrors(error.data.data.errors);
            }
        }
    };

    const clearForm = () => {
        form.value?.clear();
    };

    return {
        form,
        setFormErrors,
        clearForm,
        handleValidationErrors,
    };
}
