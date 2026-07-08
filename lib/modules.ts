export const MODULES = {
  bookings: {
    label: 'Bookings & Calendar',
    description: 'Appointments, schedule, staff assignments',
  },
  crm: {
    label: 'CRM & Clients',
    description: 'Client cards, visit history, loyalty points',
  },
  pos: {
    label: 'POS & Checkout',
    description: 'Sales, payments, receipts',
  },
  inventory: {
    label: 'Inventory',
    description: 'Stock, products, low-stock alerts',
  },
  notifications: {
    label: 'Notifications',
    description: 'Telegram, WhatsApp, Viber, Email reminders',
  },
} as const

export type ModuleKey = keyof typeof MODULES

export function isModuleEnabled(enabledModules: string[], module: ModuleKey): boolean {
  return enabledModules.includes(module)
}
