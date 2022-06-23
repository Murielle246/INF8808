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
