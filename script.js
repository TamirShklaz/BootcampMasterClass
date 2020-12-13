let subset1 = set1.slice(0, 100)
let subset2 = set2.slice(0, 100)

let bin1 = binData2(set1, 0, 100, 10)
let bin2 = binData2(set2, 0, 100, 10)

addTable(bin1, "Set 1")
addTable(bin2, "Set 2")

addHist("bar", bin2, "Set 2")


let hist = addHist("bar", bin1, "Set 1")
let medianValue = median(set1)
addVerticalLine(medianValue, "Median", bin1, hist)


let averageValue = average(set1)
