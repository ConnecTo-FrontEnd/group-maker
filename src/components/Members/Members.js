export default class Members {
  constructor($target, membersData) {
    this.init = () => {
      $target.innerHTML = `
      <h2>MANAGE MEMBERS</h2>
      <ul class="membersList"></ul>
      `;

      const $membersList = document.querySelector('.membersList');

      for (const memberKey of Object.keys(membersData)) {
        $membersList.innerHTML += `<li>${membersData[memberKey].name}</li>`;
      }

      $membersList.innerHTML += `<li><button>Add Member</button></li>`;
    };
  }
}
