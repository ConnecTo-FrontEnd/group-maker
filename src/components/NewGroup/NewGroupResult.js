class NewGroupResult {
  constructor({ $target, initialState, onSave, onRetry, onBack }) {
    this.$target = $target;
    this.state = initialState;
    this.onSave = onSave;
    this.onRetry = onRetry;
    this.onBack = onBack;

    this.$list = document.createElement('ol');
    this.$list.classList.add('result__list', 'result__list--group');

    this.$controlsBox = document.createElement('div');
    this.$controlsBox.classList.add('result__controls');
    this.$controlsBox.innerHTML = `
      <button class="result__btn result__btn--retry" data-role="retry" type="button">Retry</button>
      <button class="result__btn result__btn--submit" data-role="save" type="button">Save</button>
      <button class="result__btn result__btn--submit" data-role="back" type="button">back</button>
    `;
    this.bindEventListener();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    this.$list.innerHTML = this.drawGroups();
    this.$target.appendChild(this.$list);
    this.$target.appendChild(this.$controlsBox);
  }

  drawGroups() {
    const { record } = this.state;
    return `${record.map((group, groupIdx) => this.drawGroup(group, groupIdx)).join('')}`;
  }

  drawGroup(group, groupIdx) {
    return `          
        <li class="result__item result__item--group">
          <h3 class="result__item__title">${groupIdx + 1}조:</h3>
          <ul class="result__list result__list--member">
            ${group.map(member => this.drawMember(member)).join('')}
          </ul>
        </li>`;
  }

  drawMember(memberId) {
    const { members } = this.state;
    if (memberId === null) return '';
    return `
        <li class="result__item result__item--member">${members[memberId].name}</li>
    `;
  }

  bindEventListener() {
    this.$controlsBox.addEventListener('click', ({ target }) => {
      if (target.tagName !== 'BUTTON') return;
      const { role } = target.dataset;
      const { record } = this.state;
      switch (role) {
        case 'retry':
          this.onRetry(record.length);
          break;
        case 'save':
          this.onSave(record);
          break;
        case 'back':
          this.onBack();
          break;
        default:
          break;
      }
    });
  }
}

export default NewGroupResult;
