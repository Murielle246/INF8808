'use strict'

import * as helper from './scripts/helper.js'
import * as viz from './scripts/viz.js'
import * as preprocess from './scripts/preprocess.js'
import * as legend from './scripts/legend.js'
import * as panel from './scripts/panel.js'
import * as hover from './scripts/hover.js'

// import * as util from './scripts/util.js'

import * as d3Chromatic from 'd3-scale-chromatic'

/**
 * @file This file is the entry-point for the the code for the projet for the course INF8808.
 * @author OUR NAMES
 * @version v1.0.0
 */

(function (d3) {
  const svgSize = {
    width: 800,
    height: 625
  }

  helper.setCanvasSize(svgSize.width, svgSize.height) // keep
  helper.generateMapG(svgSize.width, svgSize.height) // to change
  helper.generateMarkerG(svgSize.width, svgSize.height)  // to change
  helper.appendGraphLabels()   // to modify
  helper.initPanelDiv()           // we will see
  
  // set the view to the default
  d3.select('#defaultOpen').dispatch('click');


  build()

  /**
   *   This function builds the graph.
   */
  function build () {
    var color = d3.scaleOrdinal(d3.schemeCategory10)

    var projection = helper.getProjection()

    var path = helper.getPath(projection)

    d3.json('./montreal.json').then(function (data) {
      viz.mapBackground(data, path, viz.showMapLabel)
    })

    d3.json('./projetpietonnisation2017.geojson').then(function (data) {
      preprocess.convertCoordinates(data, projection)
      preprocess.simplifyDisplayTitles(data)

      viz.colorDomain(color, data)
      viz.mapMarkers(data, color, panel)

      legend.drawLegend(color, d3.select('.main-svg'))

      const simulation = helper.getSimulation(data)
      helper.simulate(simulation)
    })
  }


  
// visualisation 3
let boundsV3
let svgSizeV3
let graphSizeV3

const margin = { top: 35, right: 200, bottom: 35, left: 200 }

const xScale = d3.scaleBand().padding(0.05)
const yScale = d3.scaleBand().padding(0.2)
const colorScale = d3.scaleSequential(d3Chromatic.interpolateYlGnBu)

const players = ['Mbappe', 'Benzema', 'Mane']
const aspects = ['Tkl', 'Ast', 'Gls', 'Succ','Int']

d3.csv('./stats_summary_GLOBAL.csv', d3.autoType).then(function (data) {
  data = preprocess.summarizeLinesV3(data)
  data = preprocess.arrangeV3(data)
  console.log(data)

  viz.setColorScaleDomainV3(colorScale, data)

  legend.initGradientV3(colorScale)
  legend.initLegendBarV3()
  legend.initLegendAxisV3()

  const g = helper.generateGV3(margin)

  helper.appendAxesV3(g)
  viz.appendRectsV3(data)

  setSizingV3()
  buildV3()

  /**
   *   This function handles the graph's sizing.
   */
  function setSizingV3 () {
    boundsV3 = d3.select('.graph3').node().getBoundingClientRect()
    console.log(boundsV3);

    svgSizeV3 = {
      width: 800,
      height: 550
    }

    graphSizeV3 = {
      width: svgSizeV3.width - margin.right - margin.left,
      height: svgSizeV3.height - margin.bottom - margin.top
    }

    helper.setCanvasSizeV3(svgSizeV3.width, svgSizeV3.height)
  }

  /**
   *   This function builds the graph.
   */
  function buildV3 () {
    viz.updateXScaleV3(xScale, players, graphSizeV3.width)
    viz.updateYScaleV3(yScale, aspects, graphSizeV3.height)

    viz.drawXAxisV3(xScale)
    viz.drawYAxisV3(yScale, graphSizeV3.width)

    viz.rotateXTicksV3()

    viz.updateRectsV3(xScale, yScale, colorScale)

    hover.setRectHandlerV3(xScale, yScale, hover.rectSelectedV3, hover.rectUnselectedV3, hover.selectTicksV3, hover.unselectTicksV3)

    legend.drawV3(margin.left / 2, margin.top + 5, graphSizeV3.height - 10, 15, 'url(#gradient)', colorScale)
  }

  window.addEventListener('resize', () => {
    setSizingV3()
    buildV3()
  })
})


})(d3)



