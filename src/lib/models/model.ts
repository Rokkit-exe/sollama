export type Details = {
	parent_model: string;
	format: string;
	families: string[];
	parameter_size: string;
	quantization_level: string;
};

export type Model = {
	model: string;
	modified_at: Date;
	size: number;
	digest: string;
	details: Details;
};
