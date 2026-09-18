import config from '@payload-config'
import { getPayload as get } from 'payload'

export const getPayload = async () => get({ config })
