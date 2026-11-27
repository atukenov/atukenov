declare module "troika-three-text" {
  export function configureTextBuilder(config: {
    defaultFontURL?: string | null;
    unicodeFontsURL?: string | null;
    sdfGlyphSize?: number;
    useWorker?: boolean;
  }): void;
}
