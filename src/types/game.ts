export type StatKey = 'str' | 'mag' | 'luk' | 'int' | 'cha' | 'abs';

export type Stats = Record<StatKey, number>;

export type ClassId =
  | 'chef'
  | 'sage'
  | 'necro'
  | 'priest'
  | 'guildmaster'
  | 'hiddengod'
  | 'calamity'
  | 'courier'
  | 'charmer'
  | 'debugger';

export type SkillTier = 'SSR' | 'SR' | 'R';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  tag: string;
  goddessReaction: string;
  statDelta: Partial<Stats>;
  affinity: Partial<Record<ClassId, number>>;
  styleTag: 'pragmatic' | 'chaotic' | 'slacker' | 'heroic' | 'greedy';
}

export interface Question {
  id: number;
  chapter: string;
  scene: string;
  prompt: string;
  options: QuestionOption[];
}

export interface IsekaiClass {
  id: ClassId;
  name: string;
  title: string;
  badgeText: string;
  stampText: string;
  stampType: 'qualified' | 'danger' | 'legend' | 'anomaly';
  description: string;
  guildMasterComment: string;
  baseStats: Stats;
  survivalBase: number;
  accentColor: string;
  iconType:
    | 'chef'
    | 'sage'
    | 'necro'
    | 'priest'
    | 'guildmaster'
    | 'hiddengod'
    | 'calamity'
    | 'courier'
    | 'charmer'
    | 'debugger';
}

export interface CheatSkill {
  id: string;
  name: string;
  tier: SkillTier;
  description: string;
  preferredStyles: Array<QuestionOption['styleTag']>;
}

export interface AppraisalResult {
  adventurerId: string;
  isekaiClass: IsekaiClass;
  skill: CheatSkill;
  stats: Stats;
  survivalDays: number;
  dominantStyle: QuestionOption['styleTag'];
  createdAt: string;
}

export interface CloudSaveRecord {
  lastResult?: AppraisalResult;
  totalAttempts: number;
  unlockedClasses: ClassId[];
  updatedAt: string;
}

export interface SharedStats {
  totalAppraisals: number;
  classCounts: Partial<Record<ClassId, number>>;
}
