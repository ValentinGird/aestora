export interface Wallpaper {
  id: string;
  url: string;
  url_4k: string;
  cta_url: string;
  title: string;
  description: string;
  tags: string[];
}

export interface EmailFormData {
  email: string;
  wallpaperId: string;
}