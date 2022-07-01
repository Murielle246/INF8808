/*8*********** Generate view 1 graph ***********/

export function generateG1 (width, height, margin) {
  const g11 = d3.select('.graph11')
    .select('svg')
    .append('g')
    .attr('id', 'map-g111')
    .attr('class', 'group1')
    .attr('width', width)
    .attr('height', height)
    .attr('transform',
     'translate(' + (margin.left+550) + ',' + margin.top + ')' + 'rotate(90)')

  const g12 = d3.select('.graph12')
  .select('svg')
  .append('g')
  .attr('class', 'group2')
  .attr('id', 'map-g121')
  .attr('width', width)
  .attr('height', height)
  .attr('transform',
   'translate(' + (margin.left+550) + ',' + margin.top + ')' + 'rotate(90)')

   const g13 =  d3.select('.graph13')
    .select('svg')
    .append('g')
    .attr('class', 'group3')
    .attr('id', 'map-g131')
    .attr('width', width)
    .attr('height', height)
    .attr('transform',
     'translate(' + (margin.left+550) + ',' + margin.top + ')' + 'rotate(90)')

     return [g11, g12, g13]
}


/*8*********** Generate view 2 graph ***********/
export function generateG2 (width, height, margin) {
  const g21 = d3.select('.graph21')
    .select('svg')
    .append('g')
    .attr('id', 'map-g211')
    .attr('class', 'group')
    .attr('width', width)
    .attr('height', height)
    .attr('transform',
     'translate(' + margin.left + ',' + margin.top + ')')


     const g22 = d3.select('.graph22')
     .select('svg')
     .append('g')
     .attr('class', 'group')
     .attr('id', 'map-g221')
     .attr('width', width)
     .attr('height', height)
     .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')

      const g23 = d3.select('.graph23')
      .select('svg')
      .append('g')
      .attr('class', 'group')
      .attr('id', 'map-g231')
      .attr('width', width)
      .attr('height', height)
      .attr('transform',
       'translate(' + margin.left + ',' + margin.top + ')')

    return [g21, g22, g23]
}

export function appendAxes (g2, g1) {

  // view 2 axes
  g2[0].append('g')
    .attr('class', 'x axis')

  g2[0].append('g')
    .attr('class', 'y axis21')

  g2 [1].append('g')
    .attr('class', 'x axis')

  g2[1].append('g')
    .attr('class', 'y axis22')

  g2[2].append('g')
    .attr('class', 'x axis')

  g2[2].append('g')
    .attr('class', 'y axis23')

  // view 1 axes
  g1[0].append('g')
    .attr('class', 'x axis11')
    

  g1[0].append('g')
    .attr('class', 'y axis11')

  g1 [1].append('g')
    .attr('class', 'x axis12')

  g1[1].append('g')
    .attr('class', 'y axis12')

  g1[2].append('g')
    .attr('class', 'x axis13')

  g1[2].append('g')
    .attr('class', 'y axis13')
}


/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
export function setCanvasSize (width, height) {
  d3.select('#map11').style('border', '1px solid white')
    .style('background-color', 'white')
    .style('margin-bottom', '10px')
    .select('svg')
    .attr('width', width)
    .attr('height', height)

  d3.select('#map12').style('border', '1px solid white')
    .style('background-color', 'white')
    .select('svg')
    .attr('width', width)
    .attr('height', height)
    .style('margin-top', '10px')

    d3.select('#map13').style('border', '1px solid black')
    .style('background-color', 'white')
    .select('svg')
    .style('margin-bottom', '30px')
    .style('margin-top', '10px')
    .attr('width', width)
    .attr('height', height)

    d3.select('#map21').style('border', '1px solid white')
    .style('background-color', 'white')
    .style('margin-bottom', '10px')
    .select('svg')
    .attr('width', width)
    .attr('height', height)

    d3.select('#map22').style('border', '1px solid black')
    .style('background-color', 'white')
    .select('svg')
    .attr('width', width)
    .attr('height', height)
    .style('margin-top', '10px') 
    .style('margin-bottom', '10px')


    d3.select('#map23').style('border', '1px solid black')
    .style('background-color', 'white')
    .select('svg')
    .style('margin-bottom', '30px')
    .style('margin-top', '10px')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Appends the labels for the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendGraphLabels () {
  // Label for graph 1
  d3.select('.graph11').select('.svg').append('text')
    .text('Performances d\'attaque de Kylian Mbappé, Karim Benzema et Sadio Mané')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')


    // Label for graph 2
    d3.select('.graph12').select('.svg').append('text')
    .text('Efficacité de Kylian Mbappé, Karim Benzema et Sadio Mané en %')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')


    // Label for graph 3
    d3.select('.graph13').select('.svg').append('text')
    .text('Performances technique de Kylian Mbappé, Karim Benzema et Sadio Mané')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')

    d3.select('#tab1').selectAll('.svg').append('text')
    .text('survolez pour plus d\'informations.')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Open Sans Condensed')
    .attr('font-size', 18)
    .attr('transform', 'translate(50, 70)')


    // Tab view 2

    // Label for tab2 view1
    d3.select('.graph21').select('.svg').append('text')
    .text('Performances tirs cadrés versus nombres de buts pour Kylian Mbappé')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')

    // Label for tab2 view2
    d3.select('.graph22').select('.svg').append('text')
    .text('Performances tirs cadrés versus nombres de buts pour Karim  Benzema')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')

    // Label for tab2 view3
    d3.select('.graph23').select('.svg').append('text')
    .text('Performances tirs cadrés versus nombres de buts pour Sadio Mane')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')

    d3.select('#tab2').selectAll('.svg').append('text')
    .text('Survolez pour plus d\'informations.')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Open Sans Condensed')
    .attr('font-size', 18)
    .attr('transform', 'translate(50, 70)')
}

/**
 * Appends the labels for the the y axis and the title of the graph.
 */
 export function appendAxesLabels () {

  d3.select('#tab2').selectAll('.svg').append('text')
    .text('Niveau de performances(Mensuel)')
    .attr('class', 'y-axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('fill', '#898989')
    .attr('font-size', 12)

  d3.select('#tab2').selectAll('.svg').append('text')
    .text('Mois joués dans l\'année ')
    .attr('class', 'x-axis-text')
    .attr('fill', '#898989')


    d3.select('#tab1').selectAll('.svg').append('text')
    .text('Categorie de performances')
    .attr('class', 'y-axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('fill', '#898989')
    .attr('font-size', 12)

  d3.select('#tab1').selectAll('.svg').append('text')
    .text(' Niveau de performance(Annuel)')
    .attr('class', 'x-axis-text')
    .attr('fill', '#898989')
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
 export function positionLabels (width, height) {
  d3.selectAll('.y-axis-text')
    .attr('x', -400)
    .attr('y', (height*2)/4.7 )

  d3.selectAll('.x-axis-text')
    .attr('x', width*4/4)
    .attr('y', height * 5/4)
}


/**
 * Defines the color scale used in the graph.
 *
 * @param {string[]} colors A sorted array of color hex strings to be used
 * @param {string[]} Attributs A sorted array of player names to use as the domain
 * @returns {*} The color scale to be used inthe graph
 */
 export function defineColorScale (colors, Attributs) {
  return d3.scaleOrdinal().range(colors).domain(Attributs)
}

/**
 * Updates the X scale to be used within each group of the grouped bar char
 *
 * @param {*} scale The scale used for the subgroups
 * @param {string[]} Attributs1 The players in the subgroups
 * @param {*} xScale The graph's encompassing x scale
 */
export function updateXSubgroupScale (scale, scale1, scale2, scale3, Attributs2, Attributs1, xScale, xScale1, xScale2, xScale3) {

  scale
    .domain(Attributs2)
    .range([0, xScale.bandwidth()])

  scale1
    .domain(Attributs1)
    .range([0, xScale1.bandwidth()])

  scale2
      .domain(Attributs1)
      .range([0, xScale2.bandwidth()])
    
  scale3
      .domain(Attributs1)
      .range([0, xScale3.bandwidth()])


}


/**
 * Generates the SVG element g which will contain the data visualisation.
 *
 * @param {object} margin The desired margins around the graph
 * @returns {*} The d3 Selection for the created g element
 */
 export function generateGV3 (margin) {
  return d3.select('.graph3')
    .select('svg')
    .append('g')
    .attr('id', 'graph3-g')
    .attr('transform',
      'translate(' + margin.left + ',' + margin.top + ')')
}

/**
 * Sets the size of the SVG canvas containing the graph.
 *
 * @param {number} width The desired width
 * @param {number} height The desired height
 */
 export function setCanvasSizeV3 (width, height) {
  d3.select('#map3').select('svg')
    .attr('width', width)
    .attr('height', height)
}

/**
 * Appends an SVG g element which will contain the axes.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
export function appendAxesV3 (g) {
  g.append('g')
    .attr('class', 'x axis')

  g.append('g')
    .attr('class', 'y axis')
}

export function drawXAxis (xScale, xScale1, xScale2, xScale3, height) {
  d3.selectAll('.x.axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale)
      .tickFormat(x => ` ${x}`))

    d3.select('.x.axis11')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(xScale1)
        .tickFormat(x => ` ${x}`))

    d3.select('.x.axis12')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(xScale2)
        .tickFormat(x => ` ${x}`))
    d3.select('.x.axis13')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(xScale3)
          .tickFormat(x => ` ${x}`))
}

/**
 * Draws the y axis at the left of the plot.
 *
 * @param {*} yScale The scale to use for the y axis
 */
export function drawYAxis (yScale21, yScale22, yScale23, yScale11, yScale12, yScale13 ) {
  d3.select('.y.axis21').call(d3.axisLeft(yScale21).ticks(5))
  d3.select('.y.axis22').call(d3.axisLeft(yScale22).ticks(5))
  d3.select('.y.axis23').call(d3.axisLeft(yScale23).ticks(5))

  d3.select('.y.axis11').call(d3.axisLeft(yScale11).ticks(5))
  d3.select('.y.axis12').call(d3.axisLeft(yScale12).ticks(5))
  d3.select('.y.axis13').call(d3.axisLeft(yScale13).ticks(5))
}
