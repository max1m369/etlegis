import { withPayload } from '@payloadcms/next/withPayload'

const services = [
  'soprovozhdenie-ugolovnyh-del-v-sfere-ekonomiki',
  'soprovozhdenie-ugolovnyh-del',
  'nalogovyj-komplaens',
  'soprovozhdenie-vyezdnoj-nalogovoj-proverki',
  'soprovozhdenie-v-delah-o-bankrotstve',
  'osparivanie-sdelok-dolzhnika-v-ramkah-dela-o-bankrotstve',
  'arbitrazh-korporativnye-spory',
  'arbitrazh-hozyajstvennye-spory-subekov',
  'privlechenie-k-subsidiarnoj-otvetstvennosti',
  'semejnye-spory',
  'nasledstvennye-spory',
  'upravlenie-intellektualnoj-sobstvennostyu',
]

const cases = [
  'pobeda-v-mnogoletnej-sudebnoj-tyazhbe',
  'privlechenie-kontroliruyushchego-dolzhnika',
  'zashchita-po-osparivaniyu-sdelki',
  'zashchita-ot-privlecheniya-k-subsidiarnoj-otvetstvennosti',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      ...services.map((s) => ({ source: `/${s}`, destination: `/services/${s}`, permanent: true })),
      ...cases.map((s) => ({ source: `/${s}`, destination: `/cases/${s}`, permanent: true })),
      { source: '/person', destination: '/team/birukov-aleksey', permanent: true },
      { source: '/bulatova-kseniya-aleksandrovna', destination: '/team', permanent: true },
      { source: '/blog', destination: '/media', permanent: true },
      { source: '/blog/:slug', destination: '/media/:slug', permanent: true },
      { source: '/sample-page', destination: '/', permanent: true },
    ]
  },
}

export default withPayload(nextConfig)
