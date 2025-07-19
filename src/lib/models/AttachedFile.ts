export type AttachedFile = {
	name: string;
	size: number; // in bytes
	type: string; // MIME type
	content: string; // optional, for text files
};
