const HEIGHT = 900;
const WIDTH = 600;
const COLORS = ['lightblue', 'orange', 'brown', 'paleblue', 'purple'];
const MARGINS = { left: 50, top: 10, right: 70, bottom: 70 };

const svg = d3.select('svg').attr('height', HEIGHT).attr('width', WIDTH);
const graphWidth = WIDTH - MARGINS.left - MARGINS.right;
const graphHeight = HEIGHT - MARGINS.top - MARGINS.bottom;

const graph = svg
  .append('g')
  .attr('width', graphWidth + 'px')
  .attr('height', graphHeight + 'px')
  .attr('transform', `translate`);

d3.json('buildings.json').then((data) => {
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (data) => data.height)])
    .range([0, graphHeight]);
  const rect = graph
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('width', 50)
    .attr('height', (d, i) => y(d.height))
    .attr('x', (d, i) => i * 55)
    .attr('fill', (d, i) => COLORS[i]);
});
