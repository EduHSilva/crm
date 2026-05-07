import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.kontrol.crm',
  appName: 'Kontrol CRM',
  webDir: '.output/public',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
}

export default config
