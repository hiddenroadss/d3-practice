const HEIGHT = 600;
const WIDTH = 600;
const COLORS = ['lightblue', 'orange', 'brown', 'paleblue', 'purple'];
const MARGINS = { left: 70, top: 10, right: 10, bottom: 70 };
const graphWidth = WIDTH - MARGINS.left - MARGINS.right;
const graphHeight = HEIGHT - MARGINS.top - MARGINS.bottom;

const svg = d3.select('svg').attr('height', HEIGHT).attr('width', WIDTH);

const graph = svg
  .append('g')
  .attr('width', graphWidth + 'px')
  .attr('height', graphHeight + 'px')
  .attr('transform', `translate(${MARGINS.left}, ${MARGINS.top})`);

const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

d3.json('buildings.json').then((data) => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (data) => data.height)])
    .range([graphHeight, 0]);
  const x = d3
    .scaleBand()
    .domain(data.map((item) => item.name))
    .range([0, graphWidth])
    .paddingInner(0.1)
    .paddingOuter(0.1);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);
  xAxisGroup.call(xAxis);
  yAxisGroup.call(yAxis);

  const rect = graph
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', () => x.bandwidth())
    .attr('height', (d, i) => graphHeight - y(d.height))
    .attr('x', (d) => x(d.name))
    .attr('y', (d) => y(d.height))
    .attr('fill', (d, i) => COLORS[i]);
});
