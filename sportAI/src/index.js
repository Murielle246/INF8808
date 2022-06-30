'use strict'

import * as helper from './scripts/helper.js'
import * as viz from './scripts/viz.js'
import * as preprocess from './scripts/preprocess.js'
import * as legend from './scripts/legend.js'
import * as panel from './scripts/panel.js'

import d3Tip from 'd3-tip'
import * as tooltip from './scripts/tooltip.js'

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

  const margin = { top: 80, right: 0, bottom: 55, left: 230 }
  const barColors2 = ['#0000FF','#EE82EE']
  const barColors1 = ['#0000FF','#EA82EE', '#AA82EE']
  const Attributs2 = ['SoT', 'Gls']
  const Attributs1 = ['Mbappe', 'Benzema', 'Mane']

  const xScale = d3.scaleBand().padding(0.15)
  const xScale1 = d3.scaleBand().padding(0.20)

  const xSubgroupScale = d3.scaleBand().padding([0.015])
  const xSubgroupScale1 = d3.scaleBand().padding([0.020])

  const yScale21 = d3.scaleLinear()
  const yScale22 = d3.scaleLinear()
  const yScale23 = d3.scaleLinear()

  const yScale11 = d3.scaleLinear()
  const yScale12 = d3.scaleLinear()
  const yScale13 = d3.scaleLinear()

 

  helper.setCanvasSize(svgSize.width, svgSize.height) // keep
  helper.appendGraphLabels()
  
  // set the view to the default
  d3.select('#defaultOpen').dispatch('click');

  build()

  /**
   *   This function builds the graph.
   */
  function build () {

    const tip1 = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d, 1) })
    const tip2 = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d, 2) })
    const tip3 = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d, 3) })

    d3.select(('.graph21')).select('.svg').call(tip1)
    d3.select(('.graph22')).select('.svg').call(tip2)
    d3.select(('.graph23')).select('.svg').call(tip3)

    const tip4 = d3Tip().attr('class', 'd3-tip').html(function (d) { return tooltip.getContents(d, 4) })

    d3.select(('.graph11')).select('.svg').call(tip4)
    d3.select(('.graph12')).select('.svg').call(tip4)
    d3.select(('.graph13')).select('.svg').call(tip4)

    d3.csv('./data.csv').then(function (datas) {

      const data = preprocess.summarizeLines(datas)
      const dataG1 = preprocess.summarizeLinesG1(datas)

      console.log(dataG1)
      console.log(data)

      const graph2 = helper.generateG2(svgSize.width, svgSize.height, margin)
      const graph1 = helper.generateG1(svgSize.width, svgSize.height, margin)
      //const g23 = helper.generateG23(svgSize.width, svgSize.height, margin)

      helper.appendAxes(graph2, graph1)
      helper.appendAxesLabels()
      helper.positionLabels(svgSize.width - margin.left - margin.bottom,  svgSize.height - margin.top - margin.bottom)
    

      const color2 = helper.defineColorScale(barColors2,Attributs2)
      const color1 = helper.defineColorScale(barColors1,Attributs1)

      legend.draw(Attributs2,Attributs1, color2, color1)

      viz.updateGroupXScale(xScale, xScale1, data, dataG1, svgSize.width - margin.left - margin.bottom)
      helper.updateXSubgroupScale(xSubgroupScale, xSubgroupScale1, Attributs2, Attributs1, xScale, xScale1)
      viz.updateYScale(yScale21, yScale22, yScale23, yScale11, yScale12, yScale13, data, dataG1, svgSize.height - margin.top - margin.bottom)

      helper.drawXAxis(xScale, xScale1, svgSize.height - margin.top - margin.bottom)
      helper.drawYAxis(yScale21, yScale22, yScale23, yScale11, yScale12, yScale13)



      viz.createGroups(data, dataG1, xScale, xScale1)
      viz.drawBars(yScale21, yScale22, yScale23, yScale11, yScale12, yScale13, xSubgroupScale, xSubgroupScale1, Attributs2, svgSize.height - margin.top - margin.bottom, color2, color1, tip1, tip2, tip3, tip4)
    })
  }

})(d3)



