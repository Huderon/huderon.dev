import type {CollectionEntry} from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export function getUniqueTags(posts: BlogPost[]): string[] {
	return [...new Set(posts.map((post) => post.data.tags).flat())];
}

export function getTagCounts(posts: BlogPost[]): Record<string, number> {
	return posts
		.flatMap((post) => post.data.tags)
		.reduce(
			(tagCounts, tag) => {
				tagCounts[tag] = (tagCounts[tag] || 0) + 1;
				return tagCounts;
			},
			{} as Record<string, number>,
		);
}

export function getSelectedTags(tagSlug?: string): string[] {
	return tagSlug ? tagSlug.split("+").sort() : [];
}

export function generateTagCombinations(uniqueTags: string[]): string[] {
	const tagCombinationSet = new Set<string>();

	for (let i = 1; i < 1 << uniqueTags.length; i++) {
		const combination = uniqueTags.filter((_, index) => i & (1 << index));
		const comboKey = combination.sort().join("+");
		tagCombinationSet.add(comboKey);
	}

	return Array.from(tagCombinationSet);
}

export function filterPostsByTags(posts: BlogPost[], tags: string[]): BlogPost[] {
	if (!tags.length) return posts;

	return posts.filter((post) => tags.every((tag) => post.data.tags.includes(tag)));
}

export function getTagUrl(tag: string, currentSlug?: string): string {
	if (!currentSlug) {
		return `/blog/tags/${tag}`;
	}

	const currentTags = getSelectedTags(currentSlug);

	if (currentTags.includes(tag)) {
		const newTags = currentTags.filter((t) => t !== tag);
		return newTags.length ? `/blog/tags/${newTags.join("+")}` : "/blog";
	}

	const newTags = [...currentTags, tag].sort();
	return `/blog/tags/${newTags.join("+")}`;
}
