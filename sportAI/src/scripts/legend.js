
import d3Legend from 'd3-svg-legend'



/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
 export function draw (data, dataG, color2, color1) {

  data.forEach(attribut => {

    // create a div to content player name and color box
    let div = d3.select('#tab2').selectAll('div.legend').append('div').attr('class', 'legend-element')

    // create SVG for rectangle
    let SVG = div.append('svg').attr('width', 15).attr('height', 15).style('padding', '5px 9px 0px 0px')

    // adding rectangles to the SVG element
    SVG.append('rect').attr('width', '15').attr('height', '15').style('fill', color2(attribut))

    // match text for a div
    div.append('span').text(attribut).attr('Style', 'font-weight: bold')

  });

  dataG.forEach(attribut => {

    // create a div to content player name and color box
    let div = d3.select('#tab1').selectAll('div.legend').append('div').attr('class', 'legend-element')

    // create SVG for rectangle
    let SVG = div.append('svg').attr('width', 15).attr('height', 15).style('padding', '5px 9px 0px 0px')

    // adding rectangles to the SVG element
    SVG.append('rect').attr('width', '15').attr('height', '15').style('fill', color1(attribut))

    // match text for a div
    div.append('span').text(attribut).attr('Style', 'font-weight: bold')

  });
}

/**
 * Initializes the definition for the gradient to use with the
 * given colorScale.
 *
 * @param {*} colorScale The color scale to use
 */
 export function initGradientV3 (colorScale) {
  const svg = d3.select('.main-svg3')

  const defs = svg.append('defs')

  const linearGradient = defs
    .append('linearGradient')
    .attr('id', 'gradient')
    .attr('x1', 0).attr('y1', 1).attr('x2', 0).attr('y2', 0)

  linearGradient.selectAll('stop')
    .data(colorScale.ticks().map((tick, i, nodes) => (
      {
        offset: `${100 * (i / nodes.length)}%`,
        color: colorScale(tick)
      })))
    .join('stop')
    .attr('offset', d => d.offset)
    .attr('stop-color', d => d.color)
}

/**
 * Initializes the SVG rectangle for the legend.
 */
export function initLegendBarV3 () {
  const svg = d3.select('.main-svg3')
  svg.append('rect').attr('class', 'legend bar')
}

/**
 *  Initializes the group for the legend's axis.
 */
export function initLegendAxisV3 () {
  const svg = d3.select('.main-svg3')
  svg
    .append('g')
    .attr('class', 'legend axis')
}

/**
 * Draws the legend to the left of the graphic.
 *
 * @param {number} x The x position of the legend
 * @param {number} y The y position of the legend
 * @param {number} height The height of the legend
 * @param {number} width The width of the legend
 * @param {string} fill The fill of the legend
 * @param {*} colorScale The color scale represented by the legend
 */
export function drawV3 (x, y, height, width, fill, colorScale) {
    d3.select('.main-svg3 .legend.bar')
      .attr('width', width)
      .attr('height',height)
      .attr('x', x)
      .attr('y', y)
      .attr('fill', fill)

    const axis = d3.axisLeft(
    d3.scaleLinear()
      .domain(colorScale.domain())
      .range([height, 0])
    ).ticks(7);

    d3.select('.main-svg3 .legend.axis')
      .attr('transform',`translate(${x}, ${y})`)
      .call(axis);
}
