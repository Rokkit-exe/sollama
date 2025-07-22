export type Tool = {
	type: string;
	function: {
		name: string;
		description: string;
		parameters: {
			type: string;
			properties: Record<string, any>;
			required: string[];
		};
	};
};
