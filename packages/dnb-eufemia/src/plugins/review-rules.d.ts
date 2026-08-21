export type ReviewRuleCategory =
  | 'requirement'
  | 'deprecation'
  | 'recommendation';

export type ReviewRuleLevel = 'error' | 'warning' | 'information';

export type ReviewRuleMetadata = {
  category: ReviewRuleCategory;
  description: string;
  documentation: string;
  fixable: boolean;
  level: ReviewRuleLevel;
  tools: string[];
};

declare const reviewRules: Record<string, ReviewRuleMetadata>;

export default reviewRules;
