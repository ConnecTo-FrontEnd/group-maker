export class Storage {
  constructor({ storageId, defaultValue = {} }) {
    this.storage = localStorage;
    this.storageId = storageId;
    this.defaultValue = defaultValue;
  }

  getItem() {
    try {
      const data = this.storage.getItem(this.storageId);
      return data ? JSON.parse(data) : this.defaultValue;
    } catch (err) {
      throw new Error('localStorage parse Error in getItem', err);
    }
  }

  setItem(value) {
    try {
      this.storage.setItem(this.storageId, JSON.stringify(value));
    } catch (err) {
      throw new Error('localStorage setItem Error', err);
    }
  }

  removeItem(key) {
    try {
      this.storage.removeItem(key);
    } catch (err) {
      throw new Error('localStorage remove Error', err);
    }
  }
}

export default Storage;
