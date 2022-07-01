'use strict'

import * as helper from './scripts/helper.js'
import * as viz from './scripts/viz.js'
import * as preprocess from './scripts/preprocess.js'
import * as legend from './scripts/legend.js'
import * as hover from './scripts/hover.js'

import * as d3Chromatic from 'd3-scale-chromatic'

import d3Tip from 'd3-tip'
import * as tooltip from './scripts/tooltip.js'

/**
 * @file Point d'entrée de notre projet.
 * @author Muriel Dekeuka, Michel Ekelle, Eric Kenmogne, Diana Kouakam, Yacine Hamdani
 * @version v1.0.0
 * @Credit Nous nous sommes inspirés des Tp2 et Tp4 du cours INF8808 pour effectuer notre projet
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
  const Attributs1 = ['Kylain Mbappé', 'Karim Benzema', 'Sadio Mane']

  const xScale = d3.scaleBand().padding(0.15)
  const xScale11 = d3.scaleBand().padding(0.20)
  const xScale12 = d3.scaleBand().padding(0.20)
  const xScale13 = d3.scaleBand().padding(0.20)


  const xSubgroupScale = d3.scaleBand().padding([0.015])
  const xSubgroupScale1 = d3.scaleBand().padding([0.020])
  const xSubgroupScale2 = d3.scaleBand().padding([0.020])
  const xSubgroupScale3 = d3.scaleBand().padding([0.020])

  const yScale21 = d3.scaleLinear()
  const yScale22 = d3.scaleLinear()
  const yScale23 = d3.scaleLinear()

  const yScale11 = d3.scaleLinear()
  const yScale12 = d3.scaleLinear()
  const yScale13 = d3.scaleLinear()

 

  helper.setCanvasSize(svgSize.width, svgSize.height) 
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
      const dataG11 = preprocess.summarizeLinesG11(datas)
      const dataG12 = preprocess.summarizeLinesG12(datas)
      const dataG13 = preprocess.summarizeLinesG13(datas)


      const graph2 = helper.generateG2(svgSize.width, svgSize.height, margin)
      const graph1 = helper.generateG1(svgSize.width, svgSize.height, margin)

      helper.appendAxes(graph2, graph1)
      helper.appendAxesLabels()
      helper.positionLabels(svgSize.width - margin.left - margin.bottom,  svgSize.height - margin.top - margin.bottom)
    

      const color2 = helper.defineColorScale(barColors2,Attributs2)
      const color1 = helper.defineColorScale(barColors1,Attributs1)

      legend.draw(Attributs2,Attributs1, color2, color1)

      viz.updateGroupXScale(xScale, xScale11,xScale12,xScale13, data, dataG11, dataG12, dataG13, svgSize.width - margin.left - margin.bottom)

      helper.updateXSubgroupScale(xSubgroupScale, xSubgroupScale1, xSubgroupScale2, xSubgroupScale3, Attributs2, Attributs1, xScale, xScale11, xScale12, xScale13)
      viz.updateYScale(yScale21, yScale22, yScale23, yScale11, yScale12, yScale13, data, dataG11, dataG12, dataG13, svgSize.height - margin.top - margin.bottom)

      helper.drawXAxis(xScale, xScale11,xScale12, xScale13, svgSize.height - margin.top - margin.bottom)
      helper.drawYAxis(yScale21, yScale22, yScale23, yScale11, yScale12, yScale13)



      viz.createGroups(data, dataG11, dataG12, dataG13, xScale, xScale11, xScale12, xScale13)
      viz.drawBars(yScale21, yScale22, yScale23, yScale11, yScale12, yScale13, xSubgroupScale, xSubgroupScale1, xSubgroupScale2, xSubgroupScale3, Attributs2, svgSize.height - margin.top - margin.bottom, color2, color1, tip1, tip2, tip3, tip4)
    })
  }

  
    // construct the graph 3
    let svgSizeV3
    let graphSizeV3
    const marginV3 = { top: 35, right: 200, bottom: 35, left: 200 }
    const xScaleV3 = d3.scaleBand().padding(0.05)
    const yScaleV3 = d3.scaleBand().padding(0.2)
    const colorScaleV3 = d3.scaleSequential(d3Chromatic.interpolateYlGnBu)
    const players = ['Mbappe', 'Benzema', 'Mane']
    const aspects = ['Tkl', 'Ast', 'Gls', 'Succ','Int']

    d3.csv('./data.csv', d3.autoType).then(function (data) {
    data = preprocess.summarizeLinesV3(data)
    data = preprocess.arrangeV3(data)

    viz.setColorScaleDomainV3(colorScaleV3, data)

    legend.initGradientV3(colorScaleV3)
    legend.initLegendBarV3()
    legend.initLegendAxisV3()

    const g = helper.generateGV3(marginV3)

    helper.appendAxesV3(g)
    viz.appendRectsV3(data)

    setSizingV3()
    buildV3()

    /**
     *   This function handles the graph 3's sizing.
     */
    function setSizingV3 () {

      svgSizeV3 = {
        width: 800,
        height: 550
      }

      graphSizeV3 = {
        width: svgSizeV3.width - marginV3.right - marginV3.left,
        height: svgSizeV3.height - marginV3.bottom - marginV3.top
      }

      helper.setCanvasSizeV3(svgSizeV3.width, svgSizeV3.height)
    }

    /**
     *   This function builds the graph 3.
     */
    function buildV3 () {
      viz.updateXScaleV3(xScaleV3, players, graphSizeV3.width)
      viz.updateYScaleV3(yScaleV3, aspects, graphSizeV3.height)

      viz.drawXAxisV3(xScaleV3)
      viz.drawYAxisV3(yScaleV3, graphSizeV3.width)

      viz.rotateXTicksV3()

      viz.updateRectsV3(xScaleV3, yScaleV3, colorScaleV3)

      hover.setRectHandlerV3(xScaleV3, yScaleV3, hover.rectSelectedV3, hover.rectUnselectedV3, hover.selectTicksV3, hover.unselectTicksV3)

      legend.drawV3(marginV3.left / 2, marginV3.top + 5, graphSizeV3.height - 10, 15, 'url(#gradient)', colorScaleV3)
    }

    window.addEventListener('resize', () => {
      setSizingV3()
      buildV3()
    })
    })


})(d3)



