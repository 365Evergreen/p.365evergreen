import { appConfig } from '../config/appConfig'

export function apiBase(): string {
  return appConfig.apiBaseUrl
}
