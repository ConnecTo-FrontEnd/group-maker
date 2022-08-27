export default class NewGroupForm {
  constructor({ $target, maxGroupNum, onSubmit }) {
    this.max = maxGroupNum;
    this.$target = $target;
    this.state = 1;
    this.onSubmit = onSubmit;
  }

  render() {
    this.$target.innerHTML = `
    <section class="makeGroup">
      <form class="makeGroup__form" action="">
        <fieldset>
          <legend>조 짜기 입력창</legend>
          <div class="makeGroup__numberBox">
            <span class="makeGroup__number">${this.state}</span>
            <button class="makeGroup__btn makeGroup__btn--decrease" data-name="decrease" type="button">-</button>
            <button class="makeGroup__btn makeGroup__btn--increase" data-name="increase" type="button">+</button>
          </div>
          <button class="makeGroup__btn makeGroup__btn--submit" type="submit">조 짜기!</button>
        </fieldset>
      </form>
    </section>
    `;
    this.$form = this.$target.querySelector('.makeGroup__form');
    this.$numberBox = this.$target.querySelector('.makeGroup__numberBox');
    this.$number = this.$target.querySelector('.makeGroup__number');
    this.#bindEventListener();
  }

  #increase() {
    if (this.state === this.max) return;
    this.state++;
    this.#updateNumber();
  }

  #decrease() {
    if (this.state < 2) return;
    this.state--;
    this.#updateNumber();
  }

  #updateNumber() {
    this.$number.innerHTML = this.state;
  }

  #createGroup(e) {
    e.preventDefault();
    this.onSubmit(this.state);
  }

  #handleClick({ target }) {
    if (target.tagName !== 'BUTTON') return;
    const btnName = target.dataset.name;
    if (btnName === 'increase') {
      this.#increase();
    } else {
      this.#decrease();
    }
  }

  #bindEventListener() {
    this.$form.addEventListener('submit', e => {
      this.#createGroup(e);
    });

    this.$numberBox.addEventListener('click', e => {
      this.#handleClick(e);
    });
  }
}
