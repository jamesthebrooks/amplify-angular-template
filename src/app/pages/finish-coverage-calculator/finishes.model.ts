export interface IFinish {
  name: string;
  link: string;
  src: string;
  coverageType?: 'area' | 'volume';
  coverageMin: number; // Normalized and expressed in m²/L
  coverageMax: number; // Normalized and expressed in m²/L
  specData?: {
    [key: string]: string;
  }
}
