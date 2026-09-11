/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import React from 'react';
import { Plugin } from '@nocobase/client-v2';
import { AttachmentCleanerPage } from '../client/AttachmentCleanerPage';

export class PluginAttachmentCleanerClient extends Plugin {
  async load() {
    const manager = this.app.pluginSettingsManager as any;
    if (!manager) return;

    const title = '附件清理管理';
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
