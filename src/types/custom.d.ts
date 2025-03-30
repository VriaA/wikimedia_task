declare module 'color-contrast-checker' {
  export default class ColorContrastChecker {
    isLevelAA(
      foreground: string,
      background: string,
      fontSize?: number
    ): boolean;
    isLevelAAA(
      foreground: string,
      background: string,
      fontSize?: number
    ): boolean;
  }
}
