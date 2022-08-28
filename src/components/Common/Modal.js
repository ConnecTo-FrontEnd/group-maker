export default class Modal {
  constructor($target) {
    this.$modalWrapper = document.createElement('div');
    this.$modalWrapper.className = 'modalWrapper displayNone';

    this.$modal = document.createElement('div');
    this.$modal.className = 'modal';
    this.$modalWrapper.appendChild(this.$modal);

    this.$modalTitle = document.createElement('h3');
    this.$modalTitle.className = 'modalTitle';
    this.$modal.appendChild(this.$modalTitle);

    this.$modalContent = document.createElement('div');
    this.$modalContent.className = 'modalContent';
    this.$modal.appendChild(this.$modalContent);

    this.$modalClose = document.createElement('button');
    this.$modalClose.className = 'modalClose';
    this.$modalClose.innerHTML = 'X';
    this.$modal.appendChild(this.$modalClose);

    $target.appendChild(this.$modalWrapper);

    this.$modalClose.addEventListener('click', () => this.hideModal());
  }

  showModal() {
    this.$modalWrapper.classList.remove('displayNone');
  }

  hideModal() {
    this.$modalWrapper.classList.add('displayNone');
  }
}
