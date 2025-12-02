
export interface ContentSection {
  title: string;
  content: string;
}

export interface Reference {
  title: string;
  url: string;
}

export interface CEOProfile {
  name: string;
  title: string;
  industry: string;
  summary: string;
  dashboard: string; // HTML Content for Executive Summary Dashboard
  lessons: string; // HTML Content for Lessons for the CEO
  sections: ContentSection[];
  references: Reference[];
}

export interface CEOSummary {
  name: string;
  company: string; // Notable works or businesses
}

export enum AppState {
  HOME = 'HOME',
  LOADING = 'LOADING',
  CONTENT = 'CONTENT',
  ERROR = 'ERROR'
}

export interface CategoryItem {
  id: string;
  label: string;
  iconName: string;
}