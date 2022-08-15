export default function Storage({ storageId, defaultValue = [] }) {
	this.storage = localStorage;

	this.getItem = () => {
		try {
			const data = this.storage.getItem(storageId);
			return data ? JSON.parse(data) : defaultValue;
		} catch (err) {
			throw new Error('localStorage parse Error in getItem', err);
		}
	};

	this.setItem = (value) => {
		try {
			this.storage.setItem(storageId, JSON.stringify(data));
		} catch (err) {
			throw new Error('localStorage setItem Error', err);
		}
	};

	this.removeItem = (key) => {
		try {
		} catch (err) {
			throw new Error('localStorage remove Error', err);
		}
	};
}
