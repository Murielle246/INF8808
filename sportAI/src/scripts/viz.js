
/**
 * Sets the domain of the color scale
 *
 * @param {*} colorScale The color scale used in the heatmap
 * @param {object[]} data The data to be displayed
 */
 export function setColorScaleDomainV3 (colorScale, data) {
  const allData = data.map(elt => elt.Counts);
  colorScale.domain([Math.min(...allData), Math.max(...allData)]);
}

/**
 * For each data element, appends a group 'g' to which an SVG rect is appended
 *
 * @param {object[]} data The data to use for binding
 */
 export function appendRectsV3 (data) {
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
  xScale.range([ 0, width ]);
	xScale.domain(players); 
}


/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
 export function updateGroupXScale (scale, scale1, scale2, scale3, data, dataG11, dataG12, dataG13, width) {
  // Setting the domain and range of x scale
  scale.domain(data.map((elt) => elt.Months)).range([0, width])
  scale1.domain(dataG11.map((elt) => elt.Cat)).range([0, width])
  scale2.domain(dataG12.map((elt) => elt.Cat)).range([0, width])
  scale3.domain(dataG13.map((elt) => elt.Cat)).range([0, width])

}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (yScale21, yScale22, yScale23, yScale11, yScale12, yScale13, data, dataG11, dataG12, dataG13,  height) {  // a revoir
 
  let Ymax21 = 0
  let Ymax22 = 0
  let Ymax23 = 0

  let Ymax11 = 0
  let Ymax12 = 0
  let Ymax13 = 0
 
  data.forEach(elt => {
    elt.Attributs.forEach(row => {
      if(row.Players[0].Count > Ymax21) Ymax21 = row.Players[0].Count
      if(row.Players[1].Count > Ymax22) Ymax22 = row.Players[1].Count
      if(row.Players[2].Count > Ymax23) Ymax23 = row.Players[2].Count
    });
  })

  dataG11.forEach(elt => {
    elt.Players.forEach(row => {
      if(row.Count > Ymax11) Ymax11 = row.Count
    });
  })

  dataG12.forEach(elt => {
    elt.Players.forEach(row => {
      if(row.Count > Ymax12) Ymax12 = row.Count
    });
  })

  dataG13.forEach(elt => {
    elt.Players.forEach(row => {
      if(row.Count > Ymax13) Ymax13 = row.Count
    });
  })

  yScale21.domain([0, Ymax21 + 10]).range([height, 0]);
  yScale22.domain([0, Ymax22 + 10]).range([height, 0]);
  yScale23.domain([0, Ymax23 + 5]).range([height, 0]);

  yScale11.domain([0, Ymax11 + 15]).range([height, 0]);  
  yScale12.domain([0, Ymax12 + 15]).range([height, 0]);  
  yScale13.domain([0, Ymax13 + 15]).range([height, 0]);  


}


/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
 export function createGroups (data, dataG11, dataG12, dataG13, x, x1, x2, x3) {
  d3.selectAll('.group')
    .selectAll('.months')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'attribut_month')
    .attr('transform', (value) => `translate(${x(value.Months)}, 0)`)

  d3.selectAll('.group1')
    .selectAll('.Cat')
    .data(dataG11)
    .enter()
    .append('g')
    .attr('class', 'attribut_cat1')
    .attr('transform', (value) => `translate(${x1(value.Cat)}, 0)`)


  d3.selectAll('.group2')
  .selectAll('.Cat')
  .data(dataG12)
  .enter()
  .append('g')
  .attr('class', 'attribut_cat2')
  .attr('transform', (value) => `translate(${x2(value.Cat)}, 0)`)

  d3.selectAll('.group3')
  .selectAll('.Cat')
  .data(dataG13)
  .enter()
  .append('g')
  .attr('class', 'attribut_cat3')
  .attr('transform', (value) => `translate(${x3(value.Cat)}, 0)`)


}

/**
 * Updates the domain and range of the scale for the y axis
 *
 * @param {*} yScale The scale for the y axis
 * @param {string[]} aspects les  aspects à comparer
 * @param {number} height The height of the diagram
 */
 export function updateYScaleV3 (yScale, aspects, height) {
  yScale.range([ 0, height ]);
	yScale.domain(aspects);  
}


/**
 *  Draws the X axis at the top of the diagram.
 *
 *  @param {*} xScale The scale to use to draw the axis
 */
 export function drawXAxisV3 (xScale) {
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
  d3.select('.main-svg3')
	  .select('.y.axis')
    .call(d3.axisRight(yScale))
	  .attr('transform', `translate(${width},0)`);
}

/**
 * Rotates the ticks on the X axis 45 degrees towards the left.
 */
 export function rotateXTicksV3 () {
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
  d3.selectAll('.element')
  .attr('transform', d => `translate(${xScale(d.Players)},${yScale(d.Aspects)})`) 
  .selectAll('rect')
  .attr('width', xScale.bandwidth())
  .attr('height', yScale.bandwidth())
  .attr('fill', d => colorScale(d.Counts));
}
 /* Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
 export function drawBars (y21, y22, y23, y11, y12, y13, xSubgroup2, xSubgroup11, xSubgroup12, xSubgroup13,players, height, color2, color1, tip1, tip2, tip3, tip4) {

  // draw view 2 bars
    d3.select('#map-g211')
      .selectAll('.attribut_month')
      .selectAll('.rect')
      .data((value) => value.Attributs.map((p) => ({ ...p , Months: value.Months })))
      .enter()
      .append('rect')
      .attr('y', (value) => y21(value.Players[0].Count))
      .attr('x', (value) => xSubgroup2(value.Attribut))
      .attr('fill', (value) => color2(value.Attribut))
      .attr('height', (value) => height - y21(value.Players[0].Count))
      .attr('width', xSubgroup2.bandwidth())
      .on('mouseover', tip1.show)
      .on('mouseout', tip1.hide)

  d3.select('#map-g221')
      .selectAll('.attribut_month')
      .selectAll('.rect')
      .data((value) => value.Attributs.map((p) => ({ ...p , Months: value.Months })))
      .enter()
      .append('rect')
      .attr('y', (value) => y22(value.Players[1].Count))
      .attr('x', (value) => xSubgroup2(value.Attribut))
      .attr('fill', (value) => color2(value.Attribut))
      .attr('height', (value) => height - y22(value.Players[1].Count))
      .attr('width', xSubgroup2.bandwidth())
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide)

      d3.select('#map-g231')
      .selectAll('.attribut_month')
      .selectAll('.rect')
      .data((value) => value.Attributs.map((p) => ({ ...p , Months: value.Months })))
      .enter()
      .append('rect')
      .attr('y', (value) => y23(value.Players[2].Count))
      .attr('x', (value) => xSubgroup2(value.Attribut))
      .attr('fill', (value) => color2(value.Attribut))
      .attr('height', (value) => height - y23(value.Players[2].Count))
      .attr('width', xSubgroup2.bandwidth())
      .on('mouseover', tip3.show)
      .on('mouseout', tip3.hide)


  // draw view 1 bars
  d3.select('#map-g111')
  .selectAll('.attribut_cat1')
  .selectAll('.rect')
  .data((value) => value.Players.map((p) => ({ ...p , Cat: value.Cat })))
  .enter()
  .append('rect')
  .attr('y', (value) => y11(value.Count))
  .attr('x', (value) => xSubgroup11(value.Player))
  .attr('fill', (value) => color1(value.Player))
  .attr('height', (value) => height - y11(value.Count))
  .attr('width', xSubgroup11.bandwidth())
  .on('mouseover', tip4.show)
  .on('mouseout', tip4.hide)

  d3.select('#map-g121')
  .selectAll('.attribut_cat2')
  .selectAll('.rect')
  .data((value) => value.Players.map((p) => ({ ...p , Cat: value.Cat })))
  .enter()
  .append('rect')
  .attr('y', (value) => y12(value.Count))
  .attr('x', (value) => xSubgroup12(value.Player))
  .attr('fill', (value) => color1(value.Player))
  .attr('height', (value) => height - y12(value.Count))
  .attr('width', xSubgroup12.bandwidth())
  .on('mouseover', tip4.show)
  .on('mouseout', tip4.hide)


  d3.select('#map-g131')
  .selectAll('.attribut_cat3')
  .selectAll('.rect')
  .data((value) => value.Players.map((p) => ({ ...p , Cat: value.Cat })))
  .enter()
  .append('rect')
  .attr('y', (value) => y13(value.Count))
  .attr('x', (value) => xSubgroup13(value.Player))
  .attr('fill', (value) => color1(value.Player))
  .attr('height', (value) => height - y13(value.Count))
  .attr('width', xSubgroup13.bandwidth())
  .on('mouseover', tip4.show)
  .on('mouseout', tip4.hide)

    
}

