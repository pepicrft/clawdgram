interface Env {
  DB: D1Database;
  MEDIA: R2Bucket;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
}

declare module "*.png" {
  const data: ArrayBuffer;
  export default data;
}

declare module "*.ico" {
  const data: ArrayBuffer;
  export default data;
}

declare module "*.md" {
  const content: string;
  export default content;
}
