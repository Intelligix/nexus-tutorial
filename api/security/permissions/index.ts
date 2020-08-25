import { rule, not, or } from 'nexus-plugin-shield'
import { getUserId } from '../utils'

const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        const userId = getUserId(ctx.token)
        return Boolean(userId)
    }
)

const isSuperAdmin = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        return ctx.user.role === 'SUPER'
    }
)

const rules = {
    Query: {
        drafts: isAuthenticated,
        posts: isAuthenticated,
    },
    Mutation: {
        createDraft: isAuthenticated,
        publish: isAuthenticated,

        // signup: or(not(isAuthenticated), isAuthenticated),
        // login: or(not(isAuthenticated), isAuthenticated)

    }
}

export { rules }
