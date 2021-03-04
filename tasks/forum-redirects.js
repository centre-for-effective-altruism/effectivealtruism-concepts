require("dotenv").load({ silent: true });
const Contentful = require("contentful");
const { get } = require("needle");

const { CONTENTFUL_DELIVERY_ACCESS_TOKEN, CONTENTFUL_SPACE } = process.env;

const REDIRECT_ROOT_ID = "1W1choWRBime4aIiOIieG6";

const contentful = Contentful.createClient({
  accessToken: CONTENTFUL_DELIVERY_ACCESS_TOKEN,
  space: CONTENTFUL_SPACE,
});

function buildPath(concept, concepts) {}

function buildConceptMap(concepts) {
  const map = {};
  for (const concept of concepts) {
    if (concept.fields.parent) {
      // add parent to the map
      if (!map[concept.fields.parent.sys.id]) {
        map[concept.fields.parent.sys.id] = {
          concept: concept.fields.parent,
          parentId:
            concept.fields.parent.fields.parent &&
            concept.fields.parent.fields.parent.sys.id,
          children: [concept.sys.id],
        };
      } else {
        map[concept.fields.parent.sys.id].children.push(concept.sys.id);
      }
      // add self to map
      if (!map[concept.sys.id]) {
        map[concept.sys.id] = {
          concept,
          parentId: concept.fields.parent.sys.id,
          children: [],
        };
      }
    }
  }
  return map;
}

function getRootIds(map) {
  return Object.entries(map)
    .filter(([key, val]) => !val.parentId)
    .map(([key, val]) => key);
}

function getChildrenOfRoot(rootId, map) {
  const children = [];
  children.push(...map[rootId].children);
  for (const childId of map[rootId].children) {
    children.push(...getChildrenOfRoot(childId, map));
  }
  return children;
}

async function run() {
  const result = await contentful.getEntries({
    content_type: "concept",
    order: "sys.createdAt",
    include: 5,
    limit: 1000,
  });

  const concepts = result.items;

  const map = buildConceptMap(concepts);
  // const rootIds = getRootIds(map);
  // for (const id of rootIds) {
  //   const children = getChildrenOfRoot(id, map);
  //   console.log(id, children.length);
  // }

  const children = getChildrenOfRoot(REDIRECT_ROOT_ID, map);
  const paths = [];
  for (const childId of children) {
    const { concept } = map[childId];
    paths.push(`/concepts/${concept.fields.slug}`);
  }
  for (const path of paths) {
    console.log(path);
  }
}

run();
