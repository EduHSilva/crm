import { getTokenCookie } from '~/utils/util'
import type { DashboardData } from '~/utils/types'

export interface BudgetServiceOptions {
  apiUrl: string | unknown
}

export interface BudgetService {
  find(): Promise<DefaultResponse<DashboardData>>
}

export default function budgetService({ apiUrl }: BudgetServiceOptions): BudgetService {
  return {

    async find(): Promise<DefaultResponse<DashboardData>> {
      const base = `${apiUrl}dashboard`
      return await $fetch(base, {
        headers: {
          Authorization: 'Bearer ' + getTokenCookie().value?.token
        }
      })
    }
  }
}
