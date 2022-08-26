import NewGroup from './components/NewGroup/NewGroup.js';
import Members from './components/Members/Members.js';
import Records from './components/Records/Records.js';

export default class App {
  constructor({ $target }) {
    // 시작하자마자 로컬스토리지에서 데이터를 가지고 와!
    this.getLocalStorage = (() => {
      this.dataStr = window.localStorage.getItem('groupMaker');
      this.dataObj = JSON.parse(this.dataStr);
    })();

    // 왼쪽에 올 사이드바 공간을 만들어줘
    this.$sidebar = document.createElement('div');
    this.$sidebar.className = 'sidebar';
    $target.appendChild(this.$sidebar);

    // 오른쪽에 올 컨텐츠 공간을 만들어줘
    this.$contentsWrapper = document.createElement('div');
    this.$contentsWrapper.className = 'contentsWrapper';
    $target.appendChild(this.$contentsWrapper);

    // 사이드바 공간 안에 logo, 조직 선택 selectBox, 탭 메뉴 선택 buttons, footer 역할을 하는 buttons 추가해!
    this.renderSidebar = (() => {
      this.$sidebar.innerHTML = `
    <h1 class="logo">GROUP-MAKER</h1>
    <ul class="sidebar__tabBtnList">
      <li><button>Make New Group</button></li>
      <li><button>Manage Members</button></li>
      <li><button>Previous Records</button></li>
    </ul>
    <ul class="sidebar__infoBtnList">
      <li><button>GITHUB</button></li>
      <li><button>ISSUE</button></li>
      <li><button>뭐시기</button></li>
      <li><button>저시기</button></li>
    </ul>
    `;
    })();

    // Make New Group, Members, Records 컴포넌트 불러와! 이 때 필요한 데이터 넘겨 줘!
    this.components = (() => {
      this.newGroupComponent = new NewGroup(this.$contentsWrapper);
      this.membersComponent = new Members(this.$contentsWrapper, this.dataObj.members);
      this.recordsComponent = new Records(this.$contentsWrapper);
    })();

    // 탭 메뉴 선택 buttons에 이벤트 리스너 -> 클릭할때마다 컨텐츠 공간 안에 들어갈 컴포넌트 바꿔줘!
    this.$tabBtnList = document.querySelector('.sidebar__tabBtnList');
    this.$tabBtnList.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        if (e.target.innerHTML === 'Make New Group') this.newGroupComponent.init();
        if (e.target.innerHTML === 'Manage Members') this.membersComponent.init();
        if (e.target.innerHTML === 'Previous Records') this.recordsComponent.init();
      }
    });
  }
}
