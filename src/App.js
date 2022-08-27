import NewGroup from './components/NewGroup/NewGroup.js';
import Members from './components/Members/Members.js';
import Records from './components/Records/Records.js';
import Storage from './utils/Storage.js';

export default class App {
  constructor({ $target }) {
    // 시작하자마자 로컬스토리지에서 데이터를 가지고 와!
    this.storage = new Storage({
      storageId: 'groupMaker',
      defaultValue: {
        members: [],
        records: [],
      },
    });
    this.state = this.storage.getItem();

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
      <li><a href="https://github.com/ConnecTo-FrontEnd/group-maker" target="_blank" rel="noopener noreferrer">GITHUB</a></li>
      <li><a href="https://github.com/ConnecTo-FrontEnd/group-maker/issues/new" target="_blank" rel="noopener noreferrer">ISSUE</a></li>
      <li><a href="https://github.com/pereng11" target="_blank" rel="noopener noreferrer">JY</a></li>
      <li><a href="https://github.com/chaerin-dev" target="_blank" rel="noopener noreferrer">CR</a></li>
    </ul>
    `;
    })();

    // Make New Group, Members, Records 컴포넌트 불러와! 이 때 필요한 데이터 넘겨 줘!
    this.components = (() => {
      this.newGroupComponent = new NewGroup({
        $target: this.$contentsWrapper,
        initialState: this.state,
        addRecord: newRecord => {
          this.addRecord(newRecord);
        },
      });
      this.membersComponent = new Members(this.$contentsWrapper, this.state.members);
      this.recordsComponent = new Records(this.$contentsWrapper);
    })();

    // 탭 메뉴 선택 buttons에 이벤트 리스너 -> 클릭할때마다 컨텐츠 공간 안에 들어갈 컴포넌트 바꿔줘!
    this.$tabBtnList = document.querySelector('.sidebar__tabBtnList');
    this.$tabBtnList.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        if (e.target.innerHTML === 'Make New Group') this.newGroupComponent.render();
        if (e.target.innerHTML === 'Manage Members') this.membersComponent.init();
        if (e.target.innerHTML === 'Previous Records') this.recordsComponent.init();
      }
    });
  }
  setState(nextState) {
    this.state = nextState;
    this.storage.setItem(this.state);
  }

  addRecord(newRecord) {
    const nextState = {
      ...this.state,
      records: [...this.state.records, newRecord],
    };
    this.setState(nextState);
    this.newGroup.setState(this.state);
  }
}
