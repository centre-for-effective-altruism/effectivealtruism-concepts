var $ = require('jquery')

// function to toggle state of child elements
$.fn.toggleState = function () {
  return this.each(function (index, element) {
    var el = $(element)
    // toggle view state on parent
    el
      .toggleClass('children-hidden')
      .toggleClass('children-shown')
    el.children('.concepts-list')
      .toggleClass('in')
  })
}
$(document).ready(function () {
  // run the script on any concepts lists found on the page
  var conceptsHierarchy = $('.concepts-hierarchy-list')
  if (conceptsHierarchy.length) {
    // collapse all non-apex nodes
    conceptsHierarchy.find('ul.concepts-list').addClass('collapse')
    var concepts = conceptsHierarchy.find('.concepts-hierarchy-concept.has-children')
    concepts.addClass('children-hidden')

    // uncollapse 'current concept' nodes
    var currentConcept = $('.current-concept')
    if (currentConcept.length) {
      currentConcept.parents('.concepts-hierarchy-concept').toggleState()
      currentConcept.toggleState()
    }
    // click handler for toggle buttons
    var toggleButtons = conceptsHierarchy.find('.concepts-hierarchy-concept-toggle-children')
    toggleButtons.click(function (event) {
      event.preventDefault()
      $(this).parent('.concepts-hierarchy-concept').toggleState()
    })
  }
})

