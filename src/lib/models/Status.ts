export enum Status {
	Idle = 'Idle',
	NotLoaded = 'NotLoaded',
	Loading = 'Loading',
	Thinking = 'Thinking',
	Generating = 'Generating',
	Action = 'Action',
	ChainStart = 'Chain Start',
	ChainEnd = 'Chain End',
	Finish = 'Finish',
	Error = 'Error'
}

export function toEnum<T extends Record<string, string>>(
	enumObj: T,
	value: string
): T[keyof T] | undefined {
	return Object.values(enumObj).includes(value as T[keyof T]) ? (value as T[keyof T]) : undefined;
}
