import type { Tag } from './tag';

export interface ProjectData {
	thumbnail: { src: string; alt: string };
	title: string;
	teamSize: number | string;
	roles: string[];
	brief: string;
	tags: Tag[];
}
