// Schema for Concepts
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
    sort: 'title',
    reverse: false
  },
  createPage: true
}
