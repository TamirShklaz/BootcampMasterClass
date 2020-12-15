const WIDTH = 600
const HEIGHT = 600
const MARGIN = 16

const endX = (WIDTH - MARGIN)
const startX = MARGIN
const endY = (HEIGHT - MARGIN)
const startY = MARGIN

const FINAL_WIDTH = endX - startX
const FINAL_HEIGHT = endY - startY

function areaModelOneEvent(event, winningEvents) {
	let xScale = d3.scaleLinear()
		.domain([0, 1])
		.range([startX, endX])


	let yScale = d3.scaleLinear()
		.domain([0, 1])
		.range([startX, endY])

	let svg = d3.select("#main")
		.append("div")
		.append("svg")
		.attr("width", WIDTH + 200)
		.attr("height", HEIGHT + 200)

	svg.append("text")
		.text(1)
		.attr("x", xScale(1) + 16)
		.attr("y", yScale(1 / 2))
		.attr("font-size", "2em")


	svg.append("text")
		.text(event.length)
		.attr("x", xScale(1 / 2) + 8)
		.attr("y", yScale(1) + 42)
		.attr("font-size", "2em")

	let rects = []

	for (let y = 0; y < event.length; y++) {
		let group = svg.append("g")
		let rectWidth = xScale(1 / event.length) - MARGIN
		let rectHeight = yScale(1) - MARGIN
		let rectX = xScale(y / event.length)
		let rectY = yScale(0)

		let outcome = event[y]
		let winningEvent = winningEvents.includes(outcome)

		let rect = group.append("rect")
			.attr("x", rectX)
			.attr("y", rectY)
			.attr("width", rectWidth)
			.attr("height", rectHeight)
			.attr("class", winningEvent ? "highlighted-rect" : "rect")

		let text = group.append("text")
			.attr("x", rectX + rectWidth / 2 - 8)
			.attr("y", rectY + rectHeight / 2)
			.text(outcome)
		rects.push(rect)
	}
}

function highlightOutcome(winningEvents, ...outcomes) {
	for (let ev of winningEvents) {
		if (ev.length === 1) {
			for (let o of outcomes) {
				if (ev.indexOf(o) >= 0) {
					return true
				}
			}
		} else {
			let totalOutcome = outcomes.reduce((accum, current) => accum += current)
			return winningEvents.includes(totalOutcome)
		}
	}
}

function areaModelTwoEvents(event1, event2, winningEvents) {
	let xScale = d3.scaleLinear()
		.domain([0, 1])
		.range([startX, endX])


	let yScale = d3.scaleLinear()
		.domain([0, 1])
		.range([startX, endY])

	let svg = d3.select("#main")
		.append("div")
		.append("svg")
		.attr("width", WIDTH + 200)
		.attr("height", HEIGHT + 200)


	svg.append("text")
		.text(event2.length)
		.attr("x", xScale(1) + 16)
		.attr("y", yScale(1 / 2))
		.attr("font-size", "2em")


	svg.append("text")
		.text(event1.length)
		.attr("x", xScale(1 / 2) + 8)
		.attr("y", yScale(1) + 42)
		.attr("font-size", "2em")

	let rects = []
	for (let x = 0; x < event1.length; x++) {
		rects.push([])
		for (let y = 0; y < event2.length; y++) {
			let group = svg.append("g")
			let rectWidth = xScale(1 / event1.length) - MARGIN
			let rectHeight = yScale(1 / event2.length) - MARGIN
			let rectX = xScale(x / event1.length)
			let rectY = yScale(y / event2.length)

			let outcome = event1[x] + event2[y]
			let winningEvent;
			for (let ev of winningEvents) {
				if (`${ev}`.length === 1) {
					if (ev == event1[x] || ev == event2[y]) {
						winningEvent = true
						break;
					}
				} else {
					winningEvent = winningEvents.includes(outcome)
				}
			}


			let rect = group.append("rect")
				.attr("x", rectX)
				.attr("y", rectY)
				.attr("width", rectWidth)
				.attr("height", rectHeight)
				.attr("class", winningEvent ? "highlighted-rect" : "rect")

			let text = group.append("text")
				.attr("x", rectX + rectWidth / 2 - 8)
				.attr("y", rectY + rectHeight / 2)
				.text(outcome)


			rects[x].push(rect)
		}
	}
}

function treeModel(...events) {
	let treeData = {
		name: "start",
		size: [],
		children: []
	}
	buildTree(events, 0, treeData)
	drawTree(treeData)
}

function buildTree(events, eventNo, root) {
	if (eventNo === events.length - 1) {
		let ev = events[eventNo]
		for (let c of ev) {
			let child = {
				name: c,
				size: [100, 100],
			}
			root.children.push(child)
			root.size.push(100)
		}
	} else {
		let ev = events[eventNo]
		for (let c of ev) {
			let child = {
				name: c,
				size: [],
				children: []
			}
			root.children.push(child)
			root.size.push(100)
			buildTree(events, eventNo + 1, child)
		}
	}
}

function drawTree(treeData) {
	let width = 1200,
		height = 1200;

	let svg = d3.select("#main")
		.append("div")
		.append("svg")
		.attr("width", width)
		.attr("height", height)

// append the svg object to the body of the page
	const g = svg
		.attr("width", width)
		.attr("height", height)
		.append("g")
		.attr('transform', `translate(100,${height / 2})`)


	const duration = 750;
	let i = 0,
		root = d3.hierarchy(treeData, function (d) {
			return d.children;
		});

// Collapse after second level
	root.children.forEach(collapse);
	root.x0 = 0;
	root.y0 = 0;

// Reverse size parameters, in order to maintain order in horizontal layout
	loopOverHierarchy(treeData, d => {
		if (Array.isArray(d.size)) {
			if (!d._size) d._size = d.size.slice();
			d.size = d._size.slice().reverse();
		}
	})


	const flexLayout = d3.flextree();

	update(root);

// Collapse the node and all it's children
	function collapse(d) {
		if (d.children) {
			d._children = d.children
			d._children.forEach(collapse)
			d.children = null
		}
	}

	function loopOverHierarchy(d, callback) {
		callback(d);
		if (d.children) d.children.forEach(c => loopOverHierarchy(c, callback))
		if (d._children) d._children.forEach(c => loopOverHierarchy(c, callback))
	}

	function update(source) {

		// Assigns the x and y position to the nodes
		let treeData = flexLayout(root);

		// Switch x and y coordinates for horizontal layout
		treeData.each(d => {
			const x = d.x;
			d.x = d.y;
			d.y = x;
		})

		// Compute the new tree layout.
		let nodes = treeData.descendants(),
			links = treeData.descendants().slice(1);

		// ****************** Nodes section ***************************

		// Update the nodes...
		let node = g.selectAll('g.node')
			.data(nodes, d => d.id || (d.id = ++i));

		// Enter any new modes at the parent's previous position.
		let nodeEnter = node.enter().append('g')
			.attr('class', 'node')
			.attr("transform", function (d) {
				return "translate(" + source.x0 + "," + source.y0 + ")";
			})
			.on('click', click);

		// Add Circle for the nodes
		nodeEnter.append('circle')
			.attr('class', 'node')
			.attr('r', 1e-6)
			.style("fill", function (d) {
				return d._children ? "lightsteelblue" : "#fff";
			});

		// Add labels for the nodes
		nodeEnter.append('text')
			.attr('pointer-events', 'none')
			.attr('dy', '0.35em')
			.text(function (d) {
				return d.data.name;
			})
			.attr('text-anchor', 'middle')

		// UPDATE
		let nodeUpdate = nodeEnter.merge(node)
			.attr("fill", "#fff")
			.attr("stroke", "steelblue")
			.attr("stroke-width", "3px;")
			.style('font', '12px sans-serif')

		// Transition to the proper position for the node
		nodeUpdate.transition()
			.duration(duration)
			.attr("transform", function (event, i, arr) {
				const d = d3.select(this).datum();
				return "translate(" + d.x + "," + d.y + ")";
			});

		// Update the node attributes and style
		nodeUpdate.select('circle.node')
			.attr('r', 20)
			.style("fill", function (d) {
				return d._children ? "lightsteelblue" : "#fff";
			})
			.attr('cursor', 'pointer');


		// Remove any exiting nodes
		let nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function (event, i, arr) {
				const d = d3.select(this).datum();
				return "translate(" + source.x + "," + source.y + ")";
			})
			.remove();

		// On exit reduce the node circles size to 0
		nodeExit.select('circle')
			.attr('r', 1e-6);

		// On exit reduce the opacity of text labels
		nodeExit.select('text')
			.style('fill-opacity', 1e-6)


		// ****************** links section ***************************

		// Update the links...
		let link = g.selectAll('path.link')
			.data(links, function (d) {
				return d.id;
			});

		// Enter any new links at the parent's previous position.
		let linkEnter = link.enter().insert('path', "g")
			.attr("class", "link")
			.attr('d', function (d) {
				let o = {
					x: source.x0,
					y: source.y0
				}
				return diagonal(o, o)
			});

		// UPDATE
		let linkUpdate = linkEnter.merge(link)
			.attr("fill", "none")
			.attr("stroke", "#ccc")
			.attr("stroke-width", "2px")

		// Transition back to the parent element position
		linkUpdate.transition()
			.duration(duration)
			.attr('d', function (d) {
				return diagonal(d, d.parent)
			});

		// Remove any exiting links
		let linkExit = link.exit().transition()
			.duration(duration)
			.attr('d', function (event, i, arr) {
				const d = d3.select(this).datum();
				let o = {
					x: source.x,
					y: source.y
				}
				return diagonal(o, o)
			})
			.remove();

		// Store the old positions for transition.
		nodes.forEach(function (d) {
			d.x0 = d.x;
			d.y0 = d.y;
		});

		// Creates a curved (diagonal) path from parent to the child nodes
		function diagonal(s, d) {
			const path = `M ${s.x} ${s.y}
            C ${(s.x + d.x) / 2} ${s.y},
              ${(s.x + d.x) / 2} ${d.y},
              ${d.x} ${d.y}`

			return path
		}

		// Toggle children on click.
		function click(event, d) {
			if (d.children) {
				d._children = d.children;
				d.children = null;
			} else {
				d.children = d._children;
				d._children = null;
			}
			update(d);
		}
	}

}

function findProbability(event1, event2, event3, winningOutcomes) {
	let successfulOutcomes = 0
	let totalOutcomes = event1.length * event2.length * event3.length

	for (let o1 of event1) {

		for (let o2 of event2) {


			for (let o3 of event3) {

				if (winningOutcomes.includes(o1)) {
					successfulOutcomes++;
				} else if (winningOutcomes.includes(o1 + o2)) {
					successfulOutcomes++;
				} else if (winningOutcomes.includes(o1 + o2 + o3)) {
					successfulOutcomes++;
				}


			}

		}
	}

	return successfulOutcomes / totalOutcomes
}

function addProbabilityHist(type, title, labels, data) {
	const id = Math.random() * 1000 + 1 + ""
	addCanvas(title, id)
	const chartCtx = document.getElementById(id).getContext('2d')
	let chart = new Chart(chartCtx, {
		type,
		data: {
			labels,
			datasets: [{
				label: title,
				data,
				borderWidth: 1,
				backgroundColor: Array(data.length).fill().map(val => `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, 0.4)`)
			}]
		},
		options: {
			annotation: {
				drawTime: "afterDatasetsDraw",
				annotations: []
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		},

	})
	return chart
}

function incrementBar(hist, index) {
	hist.data.datasets[0].data[index]++;
	hist.update()
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * 6) + 1
}
