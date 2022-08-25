import type { SbBlokData } from "@storyblok/react";

export interface GridBlok extends SbBlokData {
  columns: SbBlokData[];
}

export interface FeatureBlok extends SbBlokData {
  name: string;
}
