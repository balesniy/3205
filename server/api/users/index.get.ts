import users from '@/data/users.json';
import {userSchema} from '@/schema/user';

const {TIMEOUT} = useAppConfig()
export default defineEventHandler(async (event) => {
    const result = await getValidatedQuery(event, query => userSchema.safeParse(query));
    await new Promise(resolve => setTimeout(resolve, TIMEOUT));
    if (!result.success) {
        throw createError({
            statusCode: 422,
            data: {
                errors: result.error.issues
            },
        })
    }
    const {email, number} = result.data;
    return {
        users: users.filter(user => (!number || user.number === number) && user.email === email),
    };
});
