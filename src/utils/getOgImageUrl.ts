import type { GetStaticPathsOptions, GetStaticPathsResult } from 'astro';

import { getStaticPaths } from '../pages/open-graph/[...path]';

const routes = (await getStaticPaths({} as GetStaticPathsOptions)) as GetStaticPathsResult;

/**  All the OpenGraph image paths as generated by our `getStaticPaths`. */
const paths = new Set(routes.map(({ params }) => params.path));

/**
 * Get the path to the OpenGraph image for a page
 * @param path Pathname of the page URL.
 * @returns Path to the OpenGraph image if found. Otherwise, `undefined`.
 */
export function getOgImageUrl(path: string): string | undefined {
	const imagePath = path.replace(/^\//, '').replace(/\/$/, '') + '.png';
	if (paths.has(imagePath)) return '/open-graph/' + imagePath;
}
