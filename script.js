let chart = addProbabilityHist("bar", "wow", [1, 2, 3, 4, 5, 6], [0, 0, 0, 0, 0, 0])


async function simulate() {
	for (let i = 0; i < 1000; i++) {
		let outcome = Math.floor(Math.random() * 6) + 1
		await sleep(10)
		incrementBar(chart, outcome - 1)
	}
}


