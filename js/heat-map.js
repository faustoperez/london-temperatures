const svg = d3.select("svg")

svg
    .attr("width", 800)
    .attr("height", data.length * 52)


const colorScale = d3.scaleLinear()
    .domain([0, 5, 10, 15, 20, 25, 30, 31, 32, 33, 34, 35, 36])
    .range(['#003276', '#11519a', '#2371bf', '#4893da', '#74b6f1', '#acd7fc', '#f5f5f5', '#fac7c3', '#ff948c', '#eb6766', '#d2383c', '#a61c1e', '#790000'])


const boxScale = d3.scaleLinear()
    .domain([0, 40])
    .range([50, 0])


const lineGenerator = d3.line()
    .x((d,i) => { return 225 + 50 * i })
    .y((d,i) => { return boxScale(d) })

const dataPoints = svg
    .selectAll("g.data-point")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "data-point")
    .attr("transform", (d, i) => { return `translate(0, ${i * 52})` })

dataPoints
    .append("text")
    .attr("x", 175)
    .attr("y", 32)
    .attr("class", "year")
    .text((d,i) => { return d.year })

const months = dataPoints
    .append("g")
    .attr("class", "months")
    .attr("transform", "translate(200, 0)")

const monthGroups = months
    .selectAll("g.month")
    .data((d,i) => { return d.months })
    .enter()
    .append("g")
    .attr("class", "month")
    .attr("transform", (d, i) => { return `translate(${i * 50}, 0)`})

monthGroups
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 48)
    .attr("height", 50)
    .style("fill", (d,i) => { return colorScale(d) })

monthGroups
    .append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 10)

const temperatures = monthGroups
    .append("text")
    .attr("class", "temp")
    .attr("x", 25)
    .attr("y", 26)
    .text((d, i) => { return Math.round(d) })


dataPoints
    .append("path")
    .datum((d, i) => { return d.months })
    .attr("d", (d, i) => { return lineGenerator(d) })
