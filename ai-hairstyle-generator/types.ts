export interface Hairstyle {
  id: string;
  name: string;
  imageUrl: string;
  categories: string[];
}

export interface UploadedImage {
  url: string; // Object URL for preview on web, file URI on native
  base64: string; // Base64 representation for API
  mimeType: string;
}