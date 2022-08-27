export default class Records {
  constructor($target) {
    this.init = () => {
      $target.innerHTML = `
      <h2>PREVIOUS RECORDS</h2>
      `;
    };
  }
}
