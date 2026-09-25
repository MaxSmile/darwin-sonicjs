import { definePlugin } from '../../sdk'
import { listMenuItems, fetchPluginStatuses } from './services/menu-repository'
import { adminMenuRoutes } from './routes/admin-menu'
import { renderMenuSettingsContent } from './templates/admin-menu-list.template'

export const menuPlugin = definePlugin({
  id: 'menu',
  version: '1.0.0',
  name: 'Menu Manager',
  description: 'Admin sidebar navigation manager.',
  sonicjsVersionRange: '^3.0.0',
  author: { name: 'SonicJS Team', email: 'team@sonicjs.com' },

  register(app) {
    app.route('/admin/menu', adminMenuRoutes as any)
  },

  async onBoot() {
    // Menu defaults and sidebar navigation are handled in-memory by default.
    // Database seeding and reconciliation are handled on-demand when visiting
    // /admin/menu or toggling plugins in /admin/plugins — avoiding D1 writes
    // on every worker cold start across Cloudflare edge locations.
  },

  settingsTabContent: {
    async loadData(db: any) {
      const items = await listMenuItems(db)
      const pluginIds = [...new Set(items.filter(i => i.pluginId).map(i => i.pluginId as string))]
      const pluginStatuses = await fetchPluginStatuses(db, pluginIds)
      return { items, pluginStatuses }
    },
    render({ data }) {
      const items = data?.items ?? []
      const pluginStatuses = data?.pluginStatuses ?? {}
      return renderMenuSettingsContent(items, pluginStatuses)
    },
  },
})

export function createMenuPlugin() {
  return menuPlugin
}
