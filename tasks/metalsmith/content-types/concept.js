// Schema for Concepts
const DEFAULT_ORDER = 5
module.exports = {
  name: {
    singular: 'Concept',
    plural: 'Concepts'
  },
  slug: {
    singular: 'concept',
    plural: 'concepts'
  },
  contentfulId: 'concept',
  contentfulFilenameField: 'fields.slug',
  collection: {
    sort: (a, b) => {
      // first sort by order field
      const aOrder = a.order || DEFAULT_ORDER
      const bOrder = b.order || DEFAULT_ORDER
      if (aOrder !== bOrder) return aOrder - bOrder
      // if the order is the same, sort by title instead
      return a.title.localeCompare(b.title, 'en', {'sensitivity': 'base'})
    }
  },
  createPage: true
}
