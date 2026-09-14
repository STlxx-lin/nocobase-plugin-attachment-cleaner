import React from 'react';
import { Plugin } from '@nocobase/client';
import { AttachmentCleanerPage } from './AttachmentCleanerPage';

export class PluginAttachmentCleanerClient extends Plugin {
  async load() {
    const manager = this.app?.pluginSettingsManager as any;
    if (!manager) return;

    let title = '附件清理管理';
    try {
      const i18n = this.app?.i18n;
      const res = i18n?.t ? i18n.t('Attachment Cleaner', { ns: ['@nocobase/plugin-attachment-cleaner', 'client'] }) : null;
      if (res && res !== 'Attachment Cleaner') {
        title = res;
      } else {
        const lang = (i18n?.language || (typeof window !== 'undefined' ? localStorage.getItem('NOCOBASE_LOCALE') : '') || '').toLowerCase();
        title = (!lang || lang.startsWith('zh')) ? '附件清理管理' : (res || 'Attachment Cleaner');
      }
    } catch (e) {
      title = '附件清理管理';
    }
    const icon = 'DeleteOutlined';
    const menuKey = 'attachment-cleaner';
    const pageName = `${menuKey}.index`;

    if (typeof manager.addMenuItem === 'function' && typeof manager.addPageTabItem === 'function') {
      manager.addMenuItem({
        key: menuKey,
        title,
        icon,
        aclSnippet: 'pm',
      });

      manager.addPageTabItem({
        menuKey,
        key: 'index',
        title,
        icon,
        aclSnippet: 'pm',
        Component: AttachmentCleanerPage,
      });

      const pluginNames = [
        this.options?.name,
        this.options?.packageName,
        'attachment-cleaner',
        '@nocobase/plugin-attachment-cleaner',
      ].filter(Boolean);

      [...new Set(pluginNames)].forEach((pluginName) => {
        manager.setPluginSettingsLink?.(pluginName, pageName);
      });
      return;
    }

    if (typeof manager.add === 'function') {
      manager.add(menuKey, {
        title,
        icon,
        aclSnippet: 'pm',
        Component: AttachmentCleanerPage,
      });
    }
  }
}

export default PluginAttachmentCleanerClient;
