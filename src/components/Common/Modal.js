export default class Modal {
  constructor($target) {
    this.init = (() => {
      this.$modalWrapper = document.createElement('div');
      this.$modalWrapper.className = 'modalWrapper';
      this.$modalWrapper.classList.add('displayNone');
      this.$modalWrapper.innerHTML = `
      <div class="modal">
        <button class="modalExit">X</button>
      </div>`;
      $target.appendChild(this.$modalWrapper);
      this.$modalExit = document.querySelector('.modalExit');
      this.$modalExit.addEventListener('click', () => this.$modalWrapper.classList.add('displayNone'));
    })();
  }
}
