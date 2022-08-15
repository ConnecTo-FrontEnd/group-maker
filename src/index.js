import tabMenu from './tabMenu.js';
import Table from './Table.js';

const worker = new Worker('./src/worker/index.js');

// 테스트를 위한 임시 코드

const peopleArr = [];
for (let i = 0; i < 17; i++) {
	peopleArr.push(i);
}

const data = {
	rounds: [],
	groupNum: 5,
	peopleArr,
	totalPeopleNum: 17,
	forbiddenPairs: [],
};

const zero = [
	'강지승',
	'김경현',
	'김민석',
	'김은우',
	'김이주',
	'김채린',
	'김현진',
	'박윤하',
	'박지윤',
	'백남헌',
	'손재영',
	'신민경',
	'유은지',
	'이채련',
	'전희준',
	'조한',
	'최현정',
];

function submitData(e) {
	worker.postMessage(data);
}

const $form = document.querySelector('#tabpanel-1 form');
const $testBtn = document.querySelector('.makeGroup__submit button');
const $resultBox = document.querySelector('.result__content');

const resultTable = new Table({
	$target: $resultBox,
	initialState: { members: zero, groups: data.rounds[0] },
});

$form.addEventListener('submit', (e) => {
	e.preventDefault();
});

$testBtn.addEventListener('click', (e) => {
	submitData();
});

worker.addEventListener('message', (e) => {
	console.log(e.data);
	data.rounds = [...e.data.rounds];
	resultTable.setState({
		members: zero,
		groups: data.rounds[data.rounds.length - 1],
	});
});
