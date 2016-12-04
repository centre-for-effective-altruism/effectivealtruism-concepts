var $ = require('jquery')

var conceptsHierarchy = $('.concepts-hierarchy-list')
if (conceptsHierarchy.length) {
  // collapse all non-apex nodes
  conceptsHierarchy.find('ul.concepts-list').addClass('collapse')
  var concepts = conceptsHierarchy.find('.concepts-hierarchy-concept.has-children')
  concepts.addClass('children-hidden')

  var toggleButtons = conceptsHierarchy.find('.concepts-hierarchy-concept-toggle-children')
  toggleButtons.click(function (event) {
    event.preventDefault()
    var el = $(this)
    // toggle view state on parent
    var parent = el.parent('.concepts-hierarchy-concept')
    parent
      .toggleClass('children-hidden')
      .toggleClass('children-shown')
    parent.children('.concepts-list')
      .toggleClass('in')
  })
}

