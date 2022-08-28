import Modal from '../Common/Modal.js';
import Storage from '../../utils/Storage.js';

export default class member {
  constructor(storage, initialState, $target) {
    this.storage = storage;
    this.state = initialState;
    this.$target = $target;
  }

  init() {
    // 서브타이틀, 멤버 리스트 만들어!
    this.$target.innerHTML = `
      <h2>MANAGE member</h2>
      <ul class="memberList"></ul>
    `;

    // 멤버리스트를 멤버 이름, 수정버튼, 삭제버튼으로 채워줘!
    this.$memberList = document.querySelector('.memberList');
    for (const memberKey of Object.keys(this.state.members)) {
      this.$memberList.innerHTML += `
      <li class="memberItem">
        ${this.state.members[memberKey].name}
        <button class="editBtn" data-name=${this.state.members[memberKey].name}>EDIT</button>
        <button class="deleteBtn" data-name=${this.state.members[memberKey].name}>DELETE</button>
      </li>`;
    }

    // 마지막에 멤버 추가 버튼 추가해줘!
    this.$memberList.innerHTML += `
    <li>
      <button class="addBtn">Add Member</button>
    </li>
    `;

    // 모달 추가해줘!
    this.$modalComponent = new Modal(this.$target);
    this.$memberList += this.$modalComponent;

    // 이름 수정/삭제, 멤버 추가 버튼 이벤트 처리
    this.$memberList = document.querySelector('.memberList');
    this.$memberList.addEventListener('click', e => {
      if (e.target.className === 'editBtn') this.editNameModal(e.target.dataset.name);
      if (e.target.className === 'deleteBtn') this.deleteNameModal(e.target.dataset.name);
      if (e.target.className === 'addBtn') this.addMemberModal();
    });
  }

  // 모달창을 editName 버전으로 채워주는 넘
  editNameModal(nameBeforeEdit) {
    this.$modalComponent.showModal();
    this.$modalComponent.$modalTitle.innerHTML = 'EDIT NAME';
    this.$modalComponent.$modalContent.innerHTML = `
      <label for="newName">Name</label>
      <input class="inputName" type="text" name="newName" value="${nameBeforeEdit}"></input>
      <button class="edit">Edit!</button>
      <p class="errorMsg"></p>
    `;
    // 모달 내부 edit 버튼 이벤트 처리
    this.$edit = document.querySelector('.edit');
    this.$inputName = document.querySelector('.inputName');
    this.$edit.addEventListener('click', e => this.edit(nameBeforeEdit, this.$inputName.value));
  }

  // 모달창을 deleteName 버전으로 채워주는 넘
  deleteNameModal(nameBeforeDelete) {
    this.$modalComponent.showModal();
    this.$modalComponent.$modalTitle.innerHTML = 'DELETE NAME';
    this.$modalComponent.$modalContent.innerHTML = `
      <p class="errorMsg">Are you sure to delete ${nameBeforeDelete}?</p>
      <button class="delete">Delete!</button>
    `;
    // 모달 내부 delete 버튼 이벤트 처리
    this.$delete = document.querySelector('.delete');
    this.$delete.addEventListener('click', e => this.delete(nameBeforeDelete));
  }

  // 모달창을 addMember 버전으로 채워주는 놈
  addMemberModal() {
    this.$modalComponent.showModal();
    this.$modalComponent.$modalTitle.innerHTML = 'ADD MEMBER';
    this.$modalComponent.$modalContent.innerHTML = `
      <label for="newName">Name</label>
      <input class="inputName" type="text" name="newName"></input>
      <button class="add">Add!</button>
      <p class="errorMsg"></p>
    `;
    // 모달 내부 add 버튼 이벤트 처리
    this.$add = document.querySelector('.add');
    this.$inputName = document.querySelector('.inputName');
    this.$add.addEventListener('click', e => this.add(this.$inputName.value));
  }

  // 모달 내부에서 edit 버튼 눌렀을 때 로컬스토리지에 업데이트해주는 넘
  edit(nameBeforeEdit, inputName) {
    if (this.checkCorrectInput(inputName)) {
      // 로컬스토리지에 업데이트
      this.state.members.forEach(member => {
        if (member.name === nameBeforeEdit) member.name = inputName;
      });
      this.storage.setItem(this.state);
      // 새로 렌더링
      this.init();
    }
  }

  // 모달 내부에서 delete 버튼 눌렀을 때 로컬스토리지에 업데이트해주는 넘
  delete(deleteName) {
    // 로컬스토리지에 업데이트
    this.state.members.forEach((member, i) => {
      if (member.name === deleteName) this.state.members.splice(i, 1);
    });
    this.storage.setItem(this.state);
    // 새로 렌더링
    this.init();
  }

  // 모달 내부에서 add 버튼 눌렀을 때 로컬스토리지에 업데이트해주는 넘
  add(inputName) {
    if (this.checkCorrectInput(inputName)) {
      // 로컬스토리지에 업데이트
      this.state.lastId++;
      this.state.members[this.state.lastId] = { id: this.state.lastId, name: inputName, isActive: true };
      this.storage.setItem(this.state);
      // 새로 렌더링
      this.init();
    }
  }

  // 이미 존재하는 이름인지 확인하는 넘
  isExistingName(inputName) {
    const nameList = [...this.state.members].map(member => member.name);
    return nameList.includes(inputName);
  }

  // 적절한 input인지 확인하고 아니면 에러메시지 날리는 넘
  checkCorrectInput(inputName) {
    this.$errorMsg = document.querySelector('.errorMsg');
    // input이 비어있거나 공백 뿐이면? 에러메시지 날려~!
    if (!inputName.replace(/\s/g, '').length) {
      if (inputName === '') this.$errorMsg.innerHTML = 'Input is empty!';
      else this.$errorMsg.innerHTML = 'Input only contains whitespace!';
      setTimeout(() => (this.$errorMsg.innerHTML = ''), 2000);
      return false;
    }
    // input이 이미 존재하는 이름이면? 에러메시지 날려~!
    if (this.isExistingName(inputName)) {
      this.$errorMsg.innerHTML = `${inputName} alreay exist!`;
      setTimeout(() => (this.$errorMsg.innerHTML = ''), 2000);
      return false;
    }
    return true;
  }
}
