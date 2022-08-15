const worker = new Worker('./src/worker.js');

const data = {
	rounds: [],
	groupNum: 5,
	peopleArr,
	totalPeopleNum: 17,
	forbiddenPairs: [],
};

function submitData(e) {
	worker.postMessage(data);
}

worker.addEventListener('message', (e) => {
	console.log(e.data);
	data.rounds = [...e.data.rounds];
});
