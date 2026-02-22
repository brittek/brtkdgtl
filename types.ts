export interface CaseStudyProof {
  summary: string;
  problem: string;
  solution: string[];
  stack: string[];
  role: string[];
}

export type MediaType = 'image' | 'video' | 'svg';

export interface MediaAsset {
  type: MediaType;
  src: string;
  alt: string;
  poster?: string;
}

export interface Artifact {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  media: MediaAsset;
  gallery: MediaAsset[];
  caseStudyHref?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string[];
  year: string;
  thumbnail: string;
  description: string;
  tags: string[];
  href?: string;
  proof?: CaseStudyProof;
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
}

export enum RoutePath {
  Home = '/',
  Services = '/services',
  Work = '/work',
  About = '/about',
  Contact = '/contact'
}