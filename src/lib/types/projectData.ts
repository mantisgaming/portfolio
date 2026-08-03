import type { Tag } from './tag';

export interface ProjectData {
	thumbnail: { src: string; alt: string };
	title: string;
	teamSize: number;
	brief: string;
	body: string;
	tags: Tag[];
}
