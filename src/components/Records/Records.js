export default class Records {
  constructor(initialState, $target) {
    this.init = () => {
      $target.innerHTML = `
      <h2>PREVIOUS RECORDS</h2>
      `;
    };
  }
}
