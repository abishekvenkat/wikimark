export interface Settings {
  fontSize: 'small' | 'medium' | 'large';
  contentWidth: 'standard' | 'wide';
  showImages: boolean;
  showToc: boolean; 
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}