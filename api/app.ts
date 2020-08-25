import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { auth } from 'nexus-plugin-jwt-auth'
import { shield } from 'nexus-plugin-shield'
import { rules } from './security/permissions'
import { APP_SECRET } from './security/utils'

// Enables the Prisma plugin
use(prisma())

// Enables the JWT Auth plugin
use(auth({
    appSecret: APP_SECRET
}))

// Enables the Shield plugin
use(shield({
    rules
}))