/**
 * Sets up an event handler for when the mouse enters and leaves the squares
 * in the heatmap. When the square is hovered, it enters the "selected" state.
 *
 * The tick labels for the year and neighborhood corresponding to the square appear
 * in bold.
 *
 * @param {*} xScale The xScale to be used when placing the text in the square
 * @param {*} yScale The yScale to be used when placing the text in the square
 * @param {Function} rectSelected The function to call to set the mode to "selected" on the square
 * @param {Function} rectUnselected The function to call to remove "selected" mode from the square
 * @param {Function} selectTicks The function to call to set the mode to "selected" on the ticks
 * @param {Function} unselectTicks The function to call to remove "selected" mode from the ticks
 */
 export function setRectHandlerV3 (xScale, yScale, rectSelected, rectUnselected, selectTicks, unselectTicks) {
    // TODO : Select the squares and set their event handlers
    d3.selectAll('.element')
      .on('mouseenter', function(elt) {
        rectSelected(this, xScale, yScale)
        selectTicks(elt["Aspects"], elt["Players"]) // name and aspect
      })
      .on('mouseleave', function(elem){
        rectUnselected(this)
        unselectTicks()
      })
  }
  
  /**
   * The function to be called when one or many rectangles are in "selected" state,
   * meaning they are being hovered
   *
   * The text representing the number of trees associated to the rectangle
   * is displayed in the center of the rectangle and their opacity is lowered to 75%.
   *
   * @param {*} element The selection of rectangles in "selected" state
   * @param {*} xScale The xScale to be used when placing the text in the square
   * @param {*} yScale The yScale to be used when placing the text in the square
   */
  export function rectSelectedV3 (element, xScale, yScale) {
   
    d3.select(element)
      .append('text')
      .text((elt) => elt["Counts"])
      .attr('fill', (elt) => (elt["Counts"] < 100) ? 'black' : 'white')
      .attr('opacity', 0.75)
      .attr('x', (elt) => {
        return (xScale.bandwidth() - 10*elt["Counts"].toString().length)/2
      })
      .attr('y', (elt) => {return (yScale.bandwidth() + 10)/2});
  }
  
  /**
   * The function to be called when the rectangle or group
   * of rectangles is no longer in "selected state".
   *
   * The text indicating the number of trees is removed and
   * the opacity returns to 100%.
   *
   * @param {*} element The selection of rectangles in "selected" state
   */
  export function rectUnselectedV3 (element) {
    d3.select(element)
      .attr('opacity', 1.0)
      .select('text').remove();
  }
  
  /**
   * Makes the font weight of the ticks texts with the given name and year bold.
   *
   * @param {string} name The name of the neighborhood associated with the tick text to make bold
   * @param {number} year The year associated with the tick text to make bold
   */
  export function selectTicksV3 (name, year) { 
    d3.selectAll('.tick')
      .filter((content) => (content == name || content == year))
      .attr('font-weight', 'bolder');
  }
  
  /**
   * Returns the font weight of all ticks to normal.
   */
  export function unselectTicksV3 () {
    d3.selectAll('.tick').attr('font-weight', 'normal');
  }
  