import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import AdminUsers from './collections/AdminUsers'
import Sessions from './collections/Sessions'
import Media from './collections/Media'
import Practices from './collections/Practices'
import Services from './collections/Services'
import Cases from './collections/Cases'
import Employees from './collections/Employees'
import Posts from './collections/Posts'
import Awards from './collections/Awards'
import Leads from './collections/Leads'
import Bookings from './collections/Bookings'
import Slots from './collections/Slots'
import AuditLog from './collections/AuditLog'
import Settings from './globals/Settings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const isPostgres = process.env.DATABASE_URI?.startsWith('postgres')

export default buildConfig({
  admin: {
    user: 'admin-users',
  },
  routes: {
    api: '/api/payload',
  },
  collections: [
    AdminUsers,
    Sessions,
    Media,
    Practices,
    Services,
    Cases,
    Employees,
    Posts,
    Awards,
    Leads,
    Bookings,
    Slots,
    AuditLog,
  ],
  globals: [Settings],
  db: isPostgres
    ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URI!,
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URI || 'file:./local.db',
        },
      }),
  sharp,
  secret: process.env.PAYLOAD_SECRET || 'development-payload-secret-key-32-chars-long-etlegis',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 10_000_000,
    },
  },
})
