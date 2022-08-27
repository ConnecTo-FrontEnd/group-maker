import Modal from '../Common/Modal.js';

export default class Members {
  constructor($target, membersData, modal) {
    this.init = () => {
      // 서브타이틀이랑 멤버 리스트 담을 공간 만들어!
      $target.innerHTML = `
      <h2>MANAGE MEMBERS</h2>
      <ul class="membersList"></ul>
      `;

      // 멤버리스트 공간을 멤버 이름, 수정버튼, 삭제버튼으로 채워줘!
      this.$membersList = document.querySelector('.membersList');
      for (const memberKey of Object.keys(membersData)) {
        this.$membersList.innerHTML += `
        <li>
          ${membersData[memberKey].name}
          <button>EDIT</button>
          <button>DELETE</button>
        </li>`;
      }

      // 마지막에 멤버 추가 버튼 추가해줘!
      this.$membersList.innerHTML += `
      <li>
        <button class="addBtn">Add Member</button>
      </li>
      `;

      // 모달 추가해줘!
      this.$modal = new Modal($target);
      this.$membersList += this.$modal;
      this.$modalWrapper = document.querySelector('.modalWrapper');

      // 멤버 추가 버튼 관련 이벤트 처리
      this.$addBtn = document.querySelector('.addBtn');
      this.$addBtn.addEventListener('click', e => {
        this.$modalWrapper.classList.remove('displayNone');
      });
    };
  }
}
