export default class App {
  constructor({ $target }) {
    this.state = {
      selectedTab: "",
    };

    this.$sidebar = document.createElement("div");
    this.$sidebar.className = "sidebar";
    $target.appendChild(this.$sidebar);

    this.$contentsWrapper = document.createElement("div");
    this.$contentsWrapper.className = "contentsWrapper";
    $target.appendChild(this.$contentsWrapper);

    this.renderSidebar = (() => {
      this.$sidebar.innerHTML = `
    <span class="logo">GROUP-MAKER</span>
    <ul class="sidebar__tabBtnList">
      <li><button>NewGroup</button></li>
      <li><button>Members</button></li>
      <li><button>Records</button></li>
    </ul>
    <ul class="sidebar__infoBtnList">
      <li><button>GITHUB</button></li>
      <li><button>ISSUE</button></li>
      <li><button>뭐시기</button></li>
      <li><button>저시기</button></li>
    </ul>
    `;
    })();

    this.$tabBtnList = document.querySelector(".sidebar__tabBtnList");
    this.$tabBtnList.addEventListener("click", (e) => {
      this.$contentsWrapper.innerHTML = e.target.innerHTML;
    });
  }
}
