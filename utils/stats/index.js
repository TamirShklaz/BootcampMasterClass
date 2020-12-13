function addCanvas(title, id) {
	let header = document.createElement("h1")
	let fragment = document.createDocumentFragment()
	header.innerHTML = title
	fragment.appendChild(header)

	let canvas = document.createElement("canvas")
	canvas.id = id
	fragment.appendChild(canvas)

	document.getElementById("main").appendChild(fragment)
}

function addHist(type, bins, title) {
	const id = Math.random() * 1000 + 1 + ""
	addCanvas(title, id)
	const chartCtx = document.getElementById(id).getContext('2d')
	let chart = new Chart(chartCtx, {
		type,
		data: {
			labels: bins.map(bin => bin.id),
			datasets: [{
				label: title,
				data: bins.map(bin => bin.count),
				borderWidth: 1,
				backgroundColor: Array(bins.length).fill().map(val => `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 0.4)`)
			}]
		},
		options: {
			annotation: {
				drawTime: "afterDatasetsDraw",
				annotations: []
			}
		},

	})
	return chart
}

function addBoxPlot(label, data, title) {
	addCanvas(title, id)
	const chartCtx = document.getElementById(id).getContext('2d')

	let box = new Chart(chartCtx, {
		type: "boxplot",
		data: {
			labels: ["Box Plot"],
			datasets: [
				{
					label,
					backgroundColor: "rgb(164,189,245)",
					borderColor: 'red',
					borderWidth: 1,
					outlierColor: '#999999',
					padding: 10,
					itemRadius: 0,
					data: [
						data
					]
				}
			]
		},
		options: {
			responsive: true,
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Box Plot Chart'
			}
		}
	})
}

function addPieChart(type, label, bins, title, id) {
	addCanvas(title, id)
	const chartCtx = document.getElementById(id).getContext('2d')
	let pie = new Chart(chartCtx, {
		type,
		data: {
			labels: bins.map(bin => `${numeral(bin.min).format('($ 0.00 a)')}-${numeral(bin.max).format('($ 0.00 a)')}`),
			datasets: [{
				label,
				data: bins.map(b => b.count),
				backgroundColor: Array(bins.length).fill().map(val => `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 0.4)`)
			}]
		},
		options: {}
	})
}

function addTable(bins, title) {
	let doc = document;
	let fragment = doc.createDocumentFragment()
	let heading = doc.createElement("h1")
	heading.innerHTML = title
	fragment.appendChild(heading)

	const headerRow = doc.createElement("tr")
	const header1 = doc.createElement("th")
	header1.innerHTML = "Bin"
	const header2 = doc.createElement("th")
	header2.innerHTML = "Frequency"

	headerRow.appendChild(header1)
	headerRow.appendChild(header2)
	fragment.appendChild(headerRow)
	for (let bin of bins) {
		const tr = doc.createElement("tr")
		const td1 = doc.createElement("td")
		const td2 = doc.createElement("td")
		td1.innerHTML = bin.id
		td2.innerHTML = bin.count
		tr.appendChild(td1)
		tr.appendChild(td2)
		fragment.appendChild(tr)
	}
	const table = doc.createElement("table")
	table.appendChild(fragment)
	doc.getElementById("main").appendChild(table)
}

function round(num) {
	return Math.round(num * 100) / 100
}

function binData(inputData, numBuckets) {
	let min = Math.min(...inputData)
	let max = Math.max(...inputData)
	let diff = (max - min) / numBuckets;
	let bins = []
	for (let i = min; i < max; i += diff) {
		let min = round(i);
		let max = round(i + diff)
		bins.push({
			id: `${min}-${max}`,
			min,
			max,
			count: 0
		})
	}
	for (let i = 0; i < inputData.length; i++) {
		let val = inputData[i];
		for (let k = 0; k < bins.length; k++) {
			if (val > bins[k].min && val <= bins[k].max) {
				bins[k].count += 1
			}
		}
	}
	return bins;
}

function binData2(inputData, start, end, numBuckets) {
	let min = start
	let max = end
	let diff = (max - min) / numBuckets;
	let bins = []
	for (let i = min; i < max; i += diff) {
		let min = round(i);
		let max = round(i + diff)
		bins.push({
			id: `${min}-${max}`,
			min,
			max,
			count: 0
		})
	}
	for (let i = 0; i < inputData.length; i++) {
		let val = inputData[i];
		for (let k = 0; k < bins.length; k++) {
			if (val > bins[k].min && val <= bins[k].max) {
				bins[k].count += 1
			}
		}
	}
	return bins;
}

function plotLine(label, data) {
	chart.data.datasets.push({
		label,
		data: data.map((val, index) => {
			return {x: index, y: val, extra: "hi"}
		}),
		backgroundColor: 'rgba(200,0,0,0.9)',
		borderColor: 'rgba(200,0,0,0.9)'
	})
	chart.update()
}

function getRandomColor() {
	return Math.floor(Math.random() * 255)
}

function boxPlot(data) {
	new Chart(chart2Ctx, {
		type: "boxplot",
		data: {
			labels: ["A"],
			datasets: [
				{
					label: "Spread",
					backgroundColor: "rgb(164,189,245)",
					borderColor: 'red',
					borderWidth: 1,
					outlierColor: '#999999',
					padding: 10,
					itemRadius: 0,
					data: [
						data
					]
				}
			]
		},
		options: {
			responsive: true,
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Chart.js Box Plot Chart'
			}
		}
	})
}

function median(data) {
	data.sort((a, b) => a - b)
	let length = data.length;
	let middleIndex = data.length / 2
	if (length % 2 === 0) {
		let sum = data[middleIndex] + data[middleIndex + 1]
		let avg = sum / 2;
		return avg
	} else {
		return data[Math.floor(length / 2)]
	}
}

function q1(data) {
	let half = data.slice(0, data.length / 2)
	return median(half)
}

function q3(data) {
	let half = data.slice(data.length / 2, data.length)
	return median(half)
}

function average(data) {
	let sum = 0;
	for (let index in data) {
		sum += data[index]
	}
	let length = data.length
	return sum / length
}

function mad(data) {
	let avg = average(data)
	let sum = 0;
	for (let index in data) {
		sum += Math.abs(data[index] - avg)
	}
	return sum / data.length
}

function getBinFromVal(val, bins) {
	for (let bin of bins) {
		if (val <= bin.max && val >= bin.min) {
			return bin;
		}
	}
}

function addVerticalLine(y, label, bins, chart) {

	let bin = getBinFromVal(y, bins)
	chart.options.annotation.annotations.push({
		display: true,
		type: "line",
		mode: "vertical",
		scaleID: "x-axis-0",
		value: bin.id,
		borderColor: `rgb(${getRandomColor()},${getRandomColor()},${getRandomColor()})`,
		borderWidth: 3,
		label: {
			position: "top",
			size: 8,
			enabled: true,
			content: label
		}
	})
	chart.update()
}

function randomValues(count, min, max) {
	const delta = max - min;
	return Array.from({length: count}).map(() => Math.random() * delta + min);
}


