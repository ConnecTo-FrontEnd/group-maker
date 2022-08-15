self.importScripts('https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js');
self.importScripts(['./solver.js']);

self.addEventListener(
	'message',
	(e) => {
		// Any message from the host page starts a new computation
		const { rounds, groupNum, peopleArr, totalPeopleNum, forbiddenPairs } =
			e.data;
		// Compute results and send them back to the host page
		self.solver(
			rounds,
			groupNum,
			peopleArr,
			totalPeopleNum,
			forbiddenPairs,
			(results) => {
				self.postMessage(results);
			}
		);
	},
	false
);
