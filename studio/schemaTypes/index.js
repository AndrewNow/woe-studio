// Data schemas
import projects from './Data/projects'
import stills from './Data/stills'
import filterCategory from './Data/filterCategory'

// Ordering schemas
import projectsInOrder from './Ordering/projectsInOrder'
import stillsInOrder from './Ordering/stillsInOrder'

// Standalone schemas
import about from './about'

const dataSchemas = [projects, stills, filterCategory].map((schema) => ({
  ...schema,
  group: 'content',
}))

const orderingSchemas = [projectsInOrder, stillsInOrder].map((schema) => ({
  ...schema,
  group: 'ordering',
}))

export const schemaTypes = [...dataSchemas, ...orderingSchemas, about]
