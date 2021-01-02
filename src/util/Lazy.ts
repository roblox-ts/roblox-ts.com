export class Lazy<T> {
	private isInitialized: boolean;
	private value: T | undefined;

	constructor(private readonly getValue: () => T) {
		this.isInitialized = false;
	}

	public get() {
		if (!this.isInitialized) {
			this.isInitialized = true;
			this.value = this.getValue();
		}
		return this.value as T;
	}
}
