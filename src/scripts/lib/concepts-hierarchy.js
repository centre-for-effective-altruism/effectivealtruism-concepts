var $ = require('jquery')

// function to toggle state of child elements
$.fn.toggleState = function () {
  return this.each(function (index, element) {
    var el = $(element)
    if (!el.hasClass('has-children')) return
    // toggle view state on parent
    el
      .toggleClass('children-hidden')
      .toggleClass('children-shown')
    el.children('.concepts-list')
      .toggleClass('in')
  })
}
$.fn.setState = function (state) {
  state = state === 'expand' ? 'expand' : 'collapse'
  return this.each(function (index, element) {
    var el = $(element)
    if (!el.hasClass('has-children')) return
    // set view state on parent
    if (state === 'expand') {
      el
        .removeClass('children-hidden')
        .addClass('children-shown')
      el.children('.concepts-list')
        .addClass('in')
    } else {
      el
        .addClass('children-hidden')
        .removeClass('children-shown')
      el.children('.concepts-list')
        .removeClass('in')
    }
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

    var currentConcept = $('.current-concept')
    if (currentConcept.length) {
      // uncollapse 'current concept' nodes
      currentConcept.parents('.concepts-hierarchy-concept')
        .toggleState()
        .children('.concepts-hierarchy-concept-toggle-children')
          .remove()
      currentConcept.toggleState()
    } else {
      // otherwise, uncollapse the first three levels
      concepts.each(function (index, element) {
        var el = $(this)
        if (!el.hasClass('concepts-hierarcy-concept-apex-concept')) return
        el.toggleState()
      })
    }
    // click handler for toggle buttons
    var toggleButtons = conceptsHierarchy.find('.concepts-hierarchy-concept-toggle-children')
    toggleButtons.click(function (event) {
      event.preventDefault()
      $(this).parent('.concepts-hierarchy-concept').toggleState()
    })
    // click handler for expand/collapse all
    $('.concepts-hierarchy-expand-all').click(function (event) {
      console.log('Expand all...')
      event.preventDefault()
      concepts.setState('expand')
    })
    $('.concepts-hierarchy-collapse-all').click(function (event) {
      console.log('Collapse all...')
      event.preventDefault()
      concepts.setState('collapse')
    })
  }
})

