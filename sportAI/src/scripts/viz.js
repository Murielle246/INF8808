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
 * Draws the map base of Montreal. Each neighborhood should display its name when hovered.
 *
 * @param {object[]} data The data for the map base
 * @param {*} path The path associated with the current projection
 * @param {Function} showMapLabel The function to call when a neighborhood is hovered
 */
 export function mapBackground2 (data, path) {
  // TODO : Generate the map background and set the hover handlers
    d3.select('#map-g21')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('d', (d) => path(d))
    .style('fill', '#cdd1c3')
    .attr('stroke', 'white')
    .attr('stroke-width', '5px')
    //.on('mouseover', (d) => showMapLabel(d, path))
    //.on('mouseout', () => {
        //  d3.select('#neighborhoodName').style('visibility', 'hidden')
    ///})

   // d3.select('.main-svg').append('text').attr('id', 'neighborhoodName').attr('visibility', 'hidden')

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


/////////////////////


/**
 * Sets the domain and range of the X scale.
 *
 * @param {*} scale The x scale
 * @param {object[]} data The data to be used
 * @param {number} width The width of the graph
 */
 export function updateGroupXScale (scale, scale1, data, dataG1, width) {
  // Setting the domain and range of x scale
  scale.domain(data.map((elt) => elt.Months)).range([0, width])
  scale1.domain(dataG1.map((elt) => elt.Cat)).range([0, width])
}

/**
 * Sets the domain and range of the Y scale.
 *
 * @param {*} scale The Y scale
 * @param {object[]} data The data to be used
 * @param {number} height The height of the graph
 */
export function updateYScale (yScale21, yScale22, yScale23, yScale11, yScale12, yScale13, data, dataG1,  height) {  // a revoir
  //TODO : Set the domain and range of the graph's y scale
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

  dataG1.forEach(elt => {
    elt.Players.forEach(row => {
      if(row.Count > Ymax11) Ymax11 = row.Count
    });
  })

  yScale21.domain([0, Ymax21 + 10]).range([height, 0]);
  yScale22.domain([0, Ymax22 + 10]).range([height, 0]);
  yScale23.domain([0, Ymax23 + 5]).range([height, 0]);

  yScale11.domain([0, Ymax11 + 15]).range([height, 0]);  //
  yScale12.domain([0, Ymax11 + 15]).range([height, 0]);  //to change ymax11 to ymax 12 when the new data
  yScale13.domain([0, Ymax11 + 15]).range([height, 0]);  //to change ymax11 to ymax 13 when the new data

  console.log(Ymax11)
  console.log(Ymax21)
  console.log(Ymax23)

}


/**
 * Creates the groups for the grouped bar chart and appends them to the graph.
 * Each group corresponds to an act.
 *
 * @param {object[]} data The data to be used
 * @param {*} x The graph's x scale
 */
 export function createGroups (data, dataG1, x, x1) {
  // TODO : Create the groups
  d3.selectAll('.group')
    .selectAll('.months')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'attribut_month')
    .attr('transform', (value) => `translate(${x(+value.Months)}, 0)`)

dataG1
    d3.selectAll('.group')
    .selectAll('.cat')
    .data(dataG1)
    .enter()
    .append('g')
    .attr('class', 'attribut_cat')
    .attr('transform', (value) => `translate(${x1(+value.Cat)}, 0)`)

}

/**
 * Draws the bars inside the groups
 *
 * @param {*} y The graph's y scale
 * @param {*} xSubgroup The x scale to use to position the rectangles in the groups
 * @param {string[]} players The names of the players, each corresponding to a bar in each group
 * @param {number} height The height of the graph
 * @param {*} color The color scale for the bars
 * @param {*} tip The tooltip to show when each bar is hovered and hide when it's not
 */
 export function drawBars (y21, y22, y23, y11, y12, y13, xSubgroup2, xSubgroup1, players, height, color2, color1, tip1, tip2, tip3, tip4) {

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
  .selectAll('.attribut_cat')
  .selectAll('.rect')
  .data((value) => value.Players.map((p) => ({ ...p , Cat: value.Cat })))
  .enter()
  .append('rect')
  .attr('y', (value) => y11(value.Count))
  .attr('x', (value) => xSubgroup1(value.player))
  .attr('fill', (value) => color1(value.player))
  .attr('height', (value) => height - y11(value.Count))
  .attr('width', xSubgroup1.bandwidth())
  .on('mouseover', tip4.show)
  .on('mouseout', tip4.hide)

  d3.select('#map-g121')
  .selectAll('.attribut_cat')
  .selectAll('.rect')
  .data((value) => value.Players.map((p) => ({ ...p , Cat: value.Cat })))
  .enter()
  .append('rect')
  .attr('y', (value) => y12(value.Count))
  .attr('x', (value) => xSubgroup1(value.player))
  .attr('fill', (value) => color1(value.player))
  .attr('height', (value) => height - y11(value.Count))
  .attr('width', xSubgroup1.bandwidth())
  .on('mouseover', tip4.show)
  .on('mouseout', tip4.hide)


  d3.select('#map-g131')
  .selectAll('.attribut_cat')
  .selectAll('.rect')
  .data((value) => value.Players.map((p) => ({ ...p , Cat: value.Cat })))
  .enter()
  .append('rect')
  .attr('y', (value) => y13(value.Count))
  .attr('x', (value) => xSubgroup1(value.player))
  .attr('fill', (value) => color1(value.player))
  .attr('height', (value) => height - y13(value.Count))
  .attr('width', xSubgroup1.bandwidth())
  .on('mouseover', tip4.show)
  .on('mouseout', tip4.hide)

    
}

