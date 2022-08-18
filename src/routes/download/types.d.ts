export interface GitHubRelease {
  name: string;
  html_url: string;
  assets: Asset[];
}

export interface Asset {
  browser_download_url: string;
  name: string;
  size: number;
}

export interface OsRelease {
  assets: OsAsset[];
  version: string;
  url: string;
  releaseNotesUrl?: string;
}

export interface OsAsset {
  name: string;
  assetName: string;
  assetMatcher: (assetName: string) => boolean;
  asset?: Asset;
  showMoreFormats: boolean;
  otherFormats: Asset[];
}