import d3Legend from 'd3-svg-legend'

/**
 * Draws the color legend.
 *
 * @param {*} colorScale The color scale used for the legend
 * @param {*} g The d3 Selection of the SVG g elemnt containing the legend
 */
export function drawLegend (colorScale, g) {
  // TODO : Generate the legend
  // For help, see : https://d3-legend.susielu.com/

 /* g.append('text')
    .text('Légende')
    .attr('transform', 'translate(60, 115)')
    .attr('font-family', 'Open Sans Condensed')

  g.append('g')
    .attr('transform', 'translate(60, 135)')
    .attr('font-family', 'Open Sans Condensed')
    .call(
      d3Legend
        .legendColor()
        .shape('path', d3.symbol().type(d3.symbolCircle).size(300)())
        .shapePadding(2)
        .scale(colorScale)
    )*/
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
  // TODO : Draw the legend
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
