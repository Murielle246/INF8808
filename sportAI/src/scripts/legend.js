import d3Legend from 'd3-svg-legend'



/**
 * Draws a legend in the area at the bottom of the screen, corresponding to the bars' colors
 *
 * @param {string[]} data The data to be used to draw the legend elements
 * @param {*} color The color scale used throughout the visualisation
 */
 export function draw (data, color) {
  // TODO : Generate the legend in the div with class "legend". Each SVG rectangle
  // should have a width and height set to 15.
  // Tip : Append one div per legend element using class "legend-element".

  console.log(data)
  data.forEach(attribut => {

    // create a div to content player name and color box
    let div = d3.selectAll('div.legend').append('div').attr('class', 'legend-element')

    // create SVG for rectangle
    let SVG = div.append('svg').attr('width', 15).attr('height', 15).style('padding', '5px 9px 0px 0px')

    // adding rectangles to the SVG element
    SVG.append('rect').attr('width', '15').attr('height', '15').style('fill', color(attribut))

    // match text for a div
    div.append('span').text(attribut).attr('Style', 'font-weight: bold')

  });
}
