import NewGroupForm from './NewGroupForm.js';
import NewGroupResult from './NewGroupResult.js';
import solver from '../../core/solver.js';

class NewGroup {
  constructor({ $target, initialState, addRecord }) {
    this.$target = $target;
    this.state = initialState;
    this.addRecord = addRecord;

    this.$container = document.createElement('section');
    this.$contentBox = document.createElement('div');

    this.$container.appendChild(this.$contentBox);
    this.newGroupForm = new NewGroupForm({
      $target: this.$contentBox,
      maxGroupNum: this.state.members.length,
      onSubmit: groupNum => {
        this.createNewRecord(groupNum);
      },
    });

    this.newGroupResult = new NewGroupResult({
      $target: this.$contentBox,
      initialState: {
        members: this.state.members,
        record: this.state.records.at(-1),
      },
      onSave: newRecord => {
        this.addRecord(newRecord);
      },
      onRetry: groupNum => {
        this.createNewRecord(groupNum);
      },
      onBack: () => this.renderForm(),
    });

    this.render(); // 나중에 합체할 때 지울 것
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    this.$target.innerHTML = '';
    this.$target.appendChild(this.$container);
    this.renderForm();
  }

  renderForm() {
    this.newGroupForm.render();
  }

  renderResult(result) {
    this.newGroupResult.setState(result);
  }

  createNewRecord(groupNum) {
    const data = {
      groupNum,
      records: [...this.state.records],
      peopleArr: this.state.members.filter(({ isActive }) => isActive).map(({ id }) => id),
      totalPeopleNum: this.state.members.length,
      forbiddenPairs: [],
    };
    const { newRecord, roundScore, weights } = solver(data);
    console.log(roundScore, weights);
    this.renderResult({
      members: this.state.members,
      record: newRecord,
    });
  }
}

export default NewGroup;
