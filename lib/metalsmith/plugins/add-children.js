const minimatch = require('minimatch')
const debug = require('debug')('add-children')  // DEBUG=add-children

/**
 * Add Children (Metalsmith plugin)
 *
 * Finds files with a `parent` set, and adds them to the `parent` file under the `children` key
 *
 * @param {Object}          opts - plugin options
 * @param {(Object|string)} opts.filter - a glob pattern (passed to minimatch) or a filter function compatible with Array.filter() (will be passed Metalsmith filenames)
 *
 */
function addChildrenPlugin (opts) {
  const defaults = {
    // set some default options here
    filter: '**/*.html'
  }
  const options = Object.assign(defaults, opts)
  const filter = typeof options.filter === 'string' ? minimatch.filter(options.filter) : filter
  // main plugin returned to Metalsmith
  return function addChildren (files, metalsmith, done) {
    // plugin code goes here
    const contentfulIDMap = metalsmith.metadata().contentfulIDMap
    let processFiles = false
    if (options.collection) {
      processFiles = metalsmith.metadata()[options.collection]
    } else if (options.filter) {
      processFiles = Object.keys(files).filter(filter).map(file => files[file])
    }
    processFiles.forEach((file) => {
      debug('Checking file %s', file.title || file.id)
      if (!file.parent) return
      debug('%s has a parent', file)
      const parentFile = contentfulIDMap[file.parent.sys.id]
      debug('Parent title is', parentFile.title)
      debug('Adding child to parent file', parentFile.title)
      parentFile.children = parentFile.children || []
      parentFile.children.push(file)
    })
    // tell Metalsmith that we're done
    done()
  }
}

module.exports = addChildrenPlugin
// require this plugin in ./tasks/metalsmith using:
// const addChildren = require(paths.lib('metalsmith/plugins/add-children.js'))
