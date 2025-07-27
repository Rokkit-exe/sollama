import type { PullResponse } from '$models/PullResponse';

export const pullingState = $state({
	state: {
		status: '',
		digest: '',
		total: 0,
		completed: 0
	} as PullResponse,
	init(): void {
		this.reset();
	},
	reset(): void {
		this.state = {
			status: '',
			digest: '',
			total: 0,
			completed: 0
		};
	},
	update(response: PullResponse): void {
		this.state.status = response.status;
		this.state.digest = response.digest;
		this.state.total = response.total;
		this.state.completed = response.completed;
	},
	isPulling(): boolean {
		return this.state.status !== '';
	},
	getProgress(): number {
		if (this.state.total === 0) return 0;
		return Math.round((this.state.completed / this.state.total) * 100);
	}
});
