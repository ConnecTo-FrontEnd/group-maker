export default function Table({
	$target,
	initialState = { members: [], groups: [] },
}) {
	if (!new.target) {
		return new Table(initialState);
	}

	const $table = document.createElement('table');
	const $thead = document.createElement('thead');
	const $tbody = document.createElement('tbody');

	const getModifiedGroups = (groups) => {
		if (!groups) return [];

		const modifiedGroups = Array.from({ length: groups.length }, () => []);
		groups.forEach((group) =>
			group.forEach((member, order) => modifiedGroups[order].push(member))
		);
		return modifiedGroups;
	};
	const drawColNames = (cols) => {
		return `<tr>${cols.map((num) => `<th>${num}조</th>`).join('')}</tr>`;
	};
	const drawMember = (group) => {
		return `
    <tr>
      ${group
				.map((memberIdx) => `<td>${this.state.members[memberIdx] ?? ''}</td>`)
				.join('')}
    </tr>`;
	};

	this.state = {
		...initialState,
		groups: getModifiedGroups(initialState.groups),
	};
	this.setState = (nextState) => {
		const { members, groups } = nextState;
		this.state = {
			members,
			groups: getModifiedGroups(groups),
		};
		this.render();
	};

	this.render = () => {
		const { groups } = this.state;

		const colsArr = Array.from({ length: groups.length }, (v, idx) => idx + 1);
		$thead.innerHTML = `
    <tr>
      ${drawColNames(colsArr)}
    </tr>
    `;

		$tbody.innerHTML = `
      ${groups.map((group) => drawMember(group)).join('')}
    `;
	};

	$table.appendChild($thead);
	$table.appendChild($tbody);
	$target.appendChild($table);
}
