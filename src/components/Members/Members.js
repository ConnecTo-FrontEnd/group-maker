export default class Members {
  constructor($target, membersData) {
    this.init = () => {
      $target.innerHTML = `
      <h2>MANAGE MEMBERS</h2>
      <ul class="membersList"></ul>
      `;

      this.$membersList = document.querySelector('.membersList');

      for (const memberKey of Object.keys(membersData)) {
        this.$membersList.innerHTML += `
        <li>
          ${membersData[memberKey].name}
          <button>EDIT</button>
          <button>DELETE</button>
        </li>`;
      }

      this.$membersList.innerHTML += `
      <li>
        <button class="addBtn">Add Member</button>
        <div>
          <form class="addForm displayNone">
            <input class="addName" type="text"></input>
            <button class="addConfirmBtn" type="submit">Add!</button>
          </form>
        </div>
      </li>
      `;

      this.$addBtn = document.querySelector('.addBtn');
      this.$addForm = document.querySelector('.addForm');
      this.$addName = document.querySelector('.addName');
      this.$addConfirmBtn = document.querySelector('.addConfirmBtn');
      this.$addBtn.addEventListener('click', e => {
        this.$addBtn.classList.add('displayNone');
        this.$addForm.classList.remove('displayNone');
      });
      this.$addConfirmBtn.addEventListener('click', e => {
        e.preventDefault();
        this.$addBtn.classList.remove('displayNone');
        this.$addForm.classList.add('displayNone');
      });
    };
  }
}
