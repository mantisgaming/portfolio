import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getProjectFromDatabase } from '$lib/server/db';

export const prerender = false;

export const load: PageServerLoad = async ({ params }) => {
	const project = await getProjectFromDatabase(params.slug);

	if (project) {
		return project;
	}

	error(404, 'Not found');
};
