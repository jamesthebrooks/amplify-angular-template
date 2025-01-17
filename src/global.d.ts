export interface NativeScreenOrientation extends ScreenOrientation {
  lock(orientation: 'portrait' | 'landscape' | 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary' | 'any'): Promise<void>;
  unlock(): void;
}
