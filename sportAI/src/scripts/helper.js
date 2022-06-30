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
     'translate(' + margin.left + ',' + margin.top + ')')

  const g12 = d3.select('.graph12')
  .select('svg')
  .append('g')
  .attr('class', 'group1')
  .attr('id', 'map-g121')
  .attr('width', width)
  .attr('height', height)
  .attr('transform',
   'translate(' + margin.left + ',' + margin.top + ')')

   const g13 =  d3.select('.graph13')
    .select('svg')
    .append('g')
    .attr('class', 'group1')
    .attr('id', 'map-g131')
    .attr('width', width)
    .attr('height', height)
    .attr('transform',
     'translate(' + margin.left + ',' + margin.top + ')')

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
    .attr('class', 'x axis1')

  g1[0].append('g')
    .attr('class', 'y axis11')

  g1 [1].append('g')
    .attr('class', 'x axis1')

  g1[1].append('g')
    .attr('class', 'y axis12')

  g1[2].append('g')
    .attr('class', 'x axis1')

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
    .text('Vue ensemble jeu 1')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')


    // Label for graph 2
    d3.select('.graph12').select('.svg').append('text')
    .text('Vue ensemble jeu 2')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')


    // Label for graph 3
    d3.select('.graph13').select('.svg').append('text')
    .text('Vue ensemble jeu 3')
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
    .attr('transform', 'translate(50, 85)')


    // Tab view 2

    // Label for tab2 view1
    d3.select('.graph21').select('.svg').append('text')
    .text('Performances tirs cadrés versus nombres de buts pour Killian Mbappe')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Oswald')
    .attr('font-size', 28)
    .attr('transform', 'translate(50, 50)')

    // Label for tab2 view2
    d3.select('.graph22').select('.svg').append('text')
    .text('Performances tirs cadrés versus nombres de buts pour Kharim  Benzema')
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
    .text('survolez pour plus d\'informations.')
    .attr('class', 'title')
    .attr('fill', '#000000')
    .attr('font-family', 'Open Sans Condensed')
    .attr('font-size', 18)
    .attr('transform', 'translate(50, 85)')
}

/**
 * Appends the labels for the the y axis and the title of the graph.
 *
 * @param {*} g The d3 Selection of the graph's g SVG element
 */
 export function appendAxesLabels () {

  d3.select('#tab2').selectAll('.svg').append('text')
    .text('Compte Gls vs SoT')
    .attr('class', 'y-axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('fill', '#898989')
    .attr('font-size', 12)

  d3.select('#tab2').selectAll('.svg').append('text')
    .text('Mois joués en ligue 1')
    .attr('class', 'x-axis-text')
    .attr('fill', '#898989')


    d3.select('#tab1').selectAll('.svg').append('text')
    .text('Comptes pour Mbappe, Benzema ET Mane')
    .attr('class', 'y-axis-text')
    .attr('transform', 'rotate(-90)')
    .attr('fill', '#898989')
    .attr('font-size', 12)

  d3.select('#tab1').selectAll('.svg').append('text')
    .text(' Categorie de performances')
    .attr('class', 'x-axis-text')
    .attr('fill', '#898989')
}

/**
 * Positions the x axis label, y axis label and title label on the graph.
 *
 * @param {number} width The width of the graph
 * @param {number} height The height of the graph
 */
 export function positionLabels (width, height) {
  d3.selectAll('.y-axis-text')
    .attr('x', -300)
    .attr('y', (height*2)/5 )

  d3.selectAll('.x-axis-text')
    .attr('x', width*3/4)
    .attr('y', height * 5/4)
}


/**
 * Defines the color scale used in the graph.
 *
 * @param {string[]} colors A sorted array of color hex strings to be used
 * @param {string[]} players A sorted array of player names to use as the domain
 * @returns {*} The color scale to be used inthe graph
 */
 export function defineColorScale (colors, Attributs) {
  return d3.scaleOrdinal().range(colors).domain(Attributs)
}

/**
 * Updates the X scale to be used within each group of the grouped bar char
 *
 * @param {*} scale The scale used for the subgroups
 * @param {string[]} players The players in the subgroups
 * @param {*} xScale The graph's encompassing x scale
 */
export function updateXSubgroupScale (scale, scale1, Attributs2, Attributs1, xScale, xScale1) {

  scale
    .domain(Attributs2)
    .range([0, xScale.bandwidth()])

  scale1
    .domain(Attributs1)
    .range([0, xScale1.bandwidth()])
}

/**
 * Draws the x axis at the bottom of the plot.
 *
 * @param {*} xScale The scale to use for the x axis
 * @param {number} height The height of the graph
 */
export function drawXAxis (xScale, xScale1, height) {
  d3.selectAll('.x.axis')
    .attr('transform', 'translate(0, ' + height + ')')
    .call(d3.axisBottom(xScale)
      .tickFormat(x => `Month ${x}`))

    d3.selectAll('.x.axis1')
      .attr('transform', 'translate(0, ' + height + ')')
      .call(d3.axisBottom(xScale1)
        .tickFormat(x => `Cat ${x}`))
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