import { AppraisalResult, ClassId, CloudSaveRecord, SharedStats } from '../types/game';

/**
 * Bilibili Toy SDK 兼容类型定义
 * 参考 @bilibili/toy-sdk 与容器注入的 window.toy / window.ToySDK 规范：
 * - 遵循“云存档当存档，不当内存”原则，仅在结算等关键节点读写
 * - 使用批量接口，避免循环调用触发 307044 限流
 */
export interface BilibiliToySDK {
  available?: () => boolean;
  getCloudStorage?: (params: { keys: string[] }) => Promise<Record<string, unknown>>;
  setCloudStorage?: (params: { data: Record<string, unknown> }) => Promise<void>;
  getSharedStorage?: (params: { keys: string[] }) => Promise<Record<string, unknown>>;
  setSharedStorage?: (params: { data: Record<string, unknown> }) => Promise<void>;
  getUserProfile?: () => Promise<{ uname?: string; face?: string }>;
  share?: (params?: { title?: string; desc?: string }) => Promise<void>;
}

declare global {
  interface Window {
    toy?: BilibiliToySDK;
    ToySDK?: BilibiliToySDK;
  }
}

const CLOUD_SAVE_KEY = 'isekai_appraisal_save_v1';
const SHARED_STATS_KEY = 'isekai_appraisal_global_stats_v1';

const DEFAULT_SHARED_STATS: SharedStats = {
  totalAppraisals: 12840,
  classCounts: {
    chef: 1420,
    sage: 2150,
    necro: 1180,
    priest: 1090,
    guildmaster: 960,
    hiddengod: 410,
    calamity: 1310,
    courier: 1580,
    charmer: 1490,
    debugger: 1250,
  },
};

function getToyContainer(): BilibiliToySDK | null {
  if (typeof window === 'undefined') return null;
  const sdk = window.toy || window.ToySDK;
  if (!sdk) return null;
  if (typeof sdk.available === 'function' && !sdk.available()) {
    return null;
  }
  return sdk;
}

export function isToyEnvironment(): boolean {
  return getToyContainer() !== null;
}

/**
 * 读取玩家个人云存档（非 Toy 环境自动降级为 localStorage）
 */
export async function loadCloudSave(): Promise<CloudSaveRecord> {
  const sdk = getToyContainer();
  if (sdk?.getCloudStorage) {
    try {
      const res = await sdk.getCloudStorage({ keys: [CLOUD_SAVE_KEY] });
      const raw = res?.[CLOUD_SAVE_KEY];
      if (raw && typeof raw === 'string') {
        return JSON.parse(raw) as CloudSaveRecord;
      }
      if (raw && typeof raw === 'object') {
        return raw as CloudSaveRecord;
      }
    } catch (err) {
      console.warn('[BilibiliToy] getCloudStorage failed, fallback to local:', err);
    }
  }

  try {
    const localRaw = localStorage.getItem(CLOUD_SAVE_KEY);
    if (localRaw) {
      return JSON.parse(localRaw) as CloudSaveRecord;
    }
  } catch {
    // ignore storage errors
  }

  return {
    totalAttempts: 0,
    unlockedClasses: [],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * 在鉴定结算节点保存个人云存档，并更新本地缓存
 */
export async function saveAppraisalToCloud(result: AppraisalResult): Promise<CloudSaveRecord> {
  const prev = await loadCloudSave();
  const unlockedSet = new Set<ClassId>(prev.unlockedClasses);
  unlockedSet.add(result.isekaiClass.id);

  const nextRecord: CloudSaveRecord = {
    lastResult: result,
    totalAttempts: prev.totalAttempts + 1,
    unlockedClasses: Array.from(unlockedSet),
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(CLOUD_SAVE_KEY, JSON.stringify(nextRecord));
  } catch {
    // ignore storage errors
  }

  const sdk = getToyContainer();
  if (sdk?.setCloudStorage) {
    try {
      await sdk.setCloudStorage({
        data: {
          [CLOUD_SAVE_KEY]: JSON.stringify(nextRecord),
        },
      });
    } catch (err) {
      console.warn('[BilibiliToy] setCloudStorage failed (rate-limit or offline):', err);
    }
  }

  return nextRecord;
}

/**
 * 读取全站共享统计数据（各职业转生分布），仅在结果页拉取一次
 */
export async function loadSharedStats(): Promise<SharedStats> {
  const sdk = getToyContainer();
  if (sdk?.getSharedStorage) {
    try {
      const res = await sdk.getSharedStorage({ keys: [SHARED_STATS_KEY] });
      const raw = res?.[SHARED_STATS_KEY];
      if (raw && typeof raw === 'string') {
        return JSON.parse(raw) as SharedStats;
      }
      if (raw && typeof raw === 'object') {
        return raw as SharedStats;
      }
    } catch (err) {
      console.warn('[BilibiliToy] getSharedStorage failed, using local/default:', err);
    }
  }

  try {
    const localRaw = localStorage.getItem(SHARED_STATS_KEY);
    if (localRaw) {
      return JSON.parse(localRaw) as SharedStats;
    }
  } catch {
    // ignore
  }

  return DEFAULT_SHARED_STATS;
}

/**
 * 上报一次职业鉴定结果到共享统计（结算时单次提交）
 */
export async function reportClassToSharedStats(classId: ClassId): Promise<SharedStats> {
  const current = await loadSharedStats();
  const nextStats: SharedStats = {
    totalAppraisals: current.totalAppraisals + 1,
    classCounts: {
      ...current.classCounts,
      [classId]: (current.classCounts[classId] ?? 0) + 1,
    },
  };

  try {
    localStorage.setItem(SHARED_STATS_KEY, JSON.stringify(nextStats));
  } catch {
    // ignore
  }

  const sdk = getToyContainer();
  if (sdk?.setSharedStorage) {
    try {
      await sdk.setSharedStorage({
        data: {
          [SHARED_STATS_KEY]: JSON.stringify(nextStats),
        },
      });
    } catch (err) {
      console.warn('[BilibiliToy] setSharedStorage failed:', err);
    }
  }

  return nextStats;
}

/**
 * 唤起 B 站 Toy 分享面板（若在普通浏览器则降级为提示）
 */
export async function triggerToyShare(result: AppraisalResult): Promise<boolean> {
  const sdk = getToyContainer();
  if (sdk?.share) {
    try {
      await sdk.share({
        title: `我在异世界转生为【${result.isekaiClass.name}】！`,
        desc: `获得 ${result.skill.tier} 级外挂 ${result.skill.name}，预计存活 ${result.survivalDays} 天！`,
      });
      return true;
    } catch (err) {
      console.warn('[BilibiliToy] share failed:', err);
    }
  }
  return false;
}
