/**
 * Sets the domain of the color scale. Each type of site should have its own corresponding color.
 *
 * @param {*} color The color scale to be used
 * @param {object[]} data The data to be displayed
 */
export function colorDomain (color, data) {
  // Set the color domain
  let temp = new Set()
  data.features.forEach((feature) => {
    temp.add(feature.properties.TYPE_SITE_INTERVENTION)
  })
  color.domain([...temp].sort())
}

/**
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
export function mapBackground (data, path, showMapLabel) {
  // TODO : Generate the map background and set the hover handlers
    d3.select('#map-g')
    .selectAll('path')
    .data(data.features)
    .enter()
    .append('path')
    .attr('d', (d) => path(d))
    .style('fill', '#cdd1c3')
    .attr('stroke', 'white')
    .attr('stroke-width', '1px')
    .on('mouseover', (d) => showMapLabel(d, path))
    .on('mouseout', () => {
      d3.select('#neighborhoodName').style('visibility', 'hidden')
    })

  d3.select('.main-svg').append('text').attr('id', 'neighborhoodName').attr('visibility', 'hidden')

}

/**
 * When a neighborhood is hovered, displays its name. The center of its
 * name is positioned at the centroid of the shape representing the neighborhood
 * on the map. Called when the neighborhood is hovered.
 *
 * @param {object[]} d The data to be displayed
 * @param {*} path The path used to draw the map elements
 */
export function showMapLabel (d, path) {
  // TODO : Show the map label at the center of the neighborhood
  // by calculating the centroid for its polygon
  d3.select('#neighborhoodName')
    .attr('x', path.centroid(d)[0])
    .attr('y', path.centroid(d)[1])
    .text(d.properties.NOM)
    .style('text-anchor', 'middle')
    .style('visibility', 'visible')
    .style('font-size', 'smaller')
}

/**
 * Displays the markers for each street on the map.
 *
 * @param {object[]} data The street data to be displayed
 * @param {*} color The color scaled used to determine the color of the circles
 * @param {*} panel The display panel, which should be dislayed when a circle is clicked
 */
export function mapMarkers (data, color, panel) {
  // TODO : Display the map markers.
  // Their color corresponds to the type of site and their outline is white.
  // Their radius is 5 and goes up to 6 while hovered by the cursor.
  // When clicked, the panel is displayed.

  d3.select('#marker-g')
    .selectAll('circle')
    .data(data.features)
    .enter()
    .append('circle')
    .attr('class', 'marker')
    .attr('r', '5')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('fill', (d) => color(d.properties.TYPE_SITE_INTERVENTION))
    .attr('stroke', 'white')
    .attr('stroke-width', '1px')
    .on('mouseover', function () {
      d3.select(this).attr('r', '6')
    })
    .on('mouseout', function () {
      d3.select(this).attr('r', '5')
    })
    .on('click', (elt) => {
      panel.display(elt, color)
    })
}

/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
 export function setColorScaleDomainV3 (colorScale, data) {
  // TODO : Set domain of color scale
  const allData = data.map(elt => elt.Counts);
  colorScale.domain([Math.min(...allData), Math.max(...allData)]);
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
 export function appendRectsV3 (data) {
  // TODO : Append SVG rect elements
  d3.select('#graph3-g')
  .selectAll('.element')
  .data(data)
  .enter()
  .append('g')
  .attr('class', 'element')
  .append('rect');
}

/**
 * Updates the domain and range of the scale for the x axis
 *
 * @param {*} xScale The scale for the x axis
 * @param {string[]} players The data to be used
 * @param {number} width The width of the diagram
 */
 export function updateXScaleV3 (xScale, players, width) {
  // TODO : Update X scale
  xScale.range([ 0, width ]);
	xScale.domain(players); 

}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} aspects The names of the neighborhoods // les  aspects à comparer
 * @param {number} height The height of the diagram
 */
 export function updateYScaleV3 (yScale, aspects, height) {
  // TODO : Update Y scale
  // Make sure to sort the neighborhood names alphabetically
  yScale.range([ 0, height ]);
	yScale.domain(aspects);  // les  aspects à comparer
}


/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
 export function drawXAxisV3 (xScale) {
  // TODO : Draw X axis
  d3.select('.main-svg3')
	  .select('.x.axis')
    .call(d3.axisTop(xScale));
}


/**
 * Draws the Y axis to the right of the diagram.
 *
 * @param {*} yScale The scale to use to draw the axis
 * @param {number} width The width of the graphic
 */
 export function drawYAxisV3 (yScale, width) {
  // TODO : Draw Y axis
  d3.select('.main-svg3')
	  .select('.y.axis')
    .call(d3.axisRight(yScale))
	  .attr('transform', `translate(${width},0)`);
}

/**
 * Rotates the ticks on the X axis 45 degrees towards the left.
 */
 export function rotateXTicksV3 () {
  // TODO : Rotate X axis' ticks
  d3.select('.main-svg3')
  .select('.x.axis')
  .selectAll('.tick')
  .selectAll('text')
  .attr('transform','rotate(-45)');
}

/**
 * After the rectangles have been appended, this function dictates
 * their position, size and fill color.
 *
 * @param {*} xScale The x scale used to position the rectangles
 * @param {*} yScale The y scale used to position the rectangles
 * @param {*} colorScale The color scale used to set the rectangles' colors
 */
 export function updateRectsV3 (xScale, yScale, colorScale) {
  // TODO : Set position, size and fill of rectangles according to bound data
  d3.selectAll('.element')
  .attr('transform', d => `translate(${xScale(d.Players)},${yScale(d.Aspects)})`) // the d  name and the aspects
  .selectAll('rect')
  .attr('width', xScale.bandwidth())
  .attr('height', yScale.bandwidth())
  .attr('fill', d => colorScale(d.Counts));
}