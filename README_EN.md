# NocoBase Plugin: Attachment Cleaner & Lifecycle Management (`@nocobase/plugin-attachment-cleaner`)

<p align="left">
  <b>English</b> | <a href="./README.md">简体中文</a>
</p>

[![Views](https://komarev.com/ghpvc/?username=nocobase-plugin-attachment-cleaner&color=007ec6&style=flat-square&label=Views)](https://github.com/STlxx-lin/nocobase-plugin-attachment-cleaner)
[![Version](https://img.shields.io/badge/version-v0.0.16-blue.svg)](https://github.com/STlxx-lin/nocobase-plugin-attachment-cleaner/releases)
[![NocoBase Version](https://img.shields.io/badge/NocoBase-2.x-brightgreen.svg)](https://www.nocobase.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

An enterprise-grade attachment lifecycle management and storage optimization plugin designed for NocoBase 2.x. By deeply analyzing relational references across all collections, it intelligently discovers orphaned (unreferenced) files and duplicate attachments. It delivers safe multi-tier isolation with a soft recycle bin, smart deduplication and reference rewriting, automated scheduled purging, and complete audit logging to dramatically slash object storage and disk costs.

---

## 🌟 Key Features

### 1. 🔍 Deep Database Reference Traversal & Smart Analysis
- **Inverse Reference Discovery**: Automatically traverses all collections and attachment fields, constructing an accurate dependency graph.
- **Orphaned Attachment Identification**: Accurately detects unreferenced attachments resulting from record deletion, field clearing, or image replacement.
- **SHA-256 Duplicate Fingerprinting**: Groups identical files by hash, calculating exact recoverable storage space.
- **Storage Overview Dashboard**: Real-time KPI cards displaying total attachments, total storage footprint, orphaned file volume, and recycle bin size.

### 2. 🛡️ Multi-Tier Isolation & Safety Recycle Bin
- **Non-Destructive Soft Isolation**: Detected orphaned files are safely moved to the "Attachment Recycle Bin" without immediate physical deletion, ensuring zero operational risk.
- **One-Click Instant Restoration**: Files in the recycle bin can be restored back to the active attachment library with a single click.
- **Manual & Bulk Permanent Purge**: Permanently destroy isolated files on local disks or cloud storage (Local / OSS / S3 / COS) when verified.

### 3. ⚡ Smart Deduplication & Automatic Reference Rewriting
- **Custom Retention Rules**: Set preferred storage locations or determine master files by creation date/reference frequency.
- **System-wide Reference Rewriting**: Retains only 1 primary copy per duplicate group, safely moves duplicates to the recycle bin, and **automatically rewrites all foreign key references across all collections** to ensure zero broken links.

### 4. ⏰ Automated Scheduled Pruning & Retention Policies
- **Built-in Cron Job**: Runs daily at midnight (`0 2 * * *`) to automatically purge expired attachments.
- **Flexible Retention Thresholds**: Customize recycle bin retention days (default 30 days) before permanent physical destruction.
- **Hot-Configurable**: Adjust thresholds and toggles on the fly without restarting server processes.

### 5. 📜 Complete Audit Trail & Snapshot Tracking
- **Granular Operation Auditing**: Records all scan triggers, recycle bin moves, restorations, purges, and deduplication tasks.
- **Detailed Snapshots**: Captures operator ID, action type, affected row count, parameters, and timestamps.
- **Automated Log Rotation**: Prevents audit tables from unbounded growth.

### 6. 💻 Modern Admin UI & Headless CLI Tooling
- **Intuitive Visual Console**: Built-in dashboard, unreferenced file browser, duplicate manager, recycle bin, and settings tabs.
- **CLI Commands**: Trigger scans, automated purges, and deduplication directly in headless servers or CI/CD pipelines.

---

## 🛠️ CLI Guide

Run attachment cleaner commands directly from the NocoBase project root:

```bash
# 1. Scan and generate full storage analysis report
yarn nocobase attachment-cleaner:scan

# 2. Automatically purge expired recycle bin items (optional day threshold)
yarn nocobase attachment-cleaner:clean --days 30

# 3. Perform duplicate deduplication and rewrite references
yarn nocobase attachment-cleaner:dedup
```

---

## 📊 Collections Schema

| Collection Key | Description |
| :--- | :--- |
| `attachmentRecycleBin` | Recycle bin records with attachment ID, isolated time, and operator |
| `attachmentCleanerSettings` | Global configuration (auto-clean toggle, retention days, preferred storage) |
| `attachmentCleanerAuditLogs` | Persistent audit logs for every clean, restore, and deduplication event |

---

## 📦 Installation & Activation

```bash
# 1. Add and enable plugin
yarn nocobase pm add @nocobase/plugin-attachment-cleaner
yarn nocobase pm enable @nocobase/plugin-attachment-cleaner

# 2. Access "Attachment Cleaner" in the NocoBase admin left sidebar menu
```

---

## 📬 Feedback & Support

For issues, feature requests, or custom consulting:
- **Feedback QQ**: `1414794992`
- **GitHub Issues**: [Open an issue](https://github.com/STlxx-lin/nocobase-plugin-attachment-cleaner/issues)

---

## 📄 License

MIT / AGPL-3.0 License