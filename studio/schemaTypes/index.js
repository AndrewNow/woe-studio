// Data schemas
import projects from './Data/projects'
import stills from './Data/stills'

// Ordering schemas
import projectsInOrder from './Ordering/projectsInOrder'
import stillsInOrder from './Ordering/stillsInOrder'

// Standalone schemas
import about from './about'

const dataSchemas = [projects, stills].map((schema) => ({
  ...schema,
  group: 'content',
}))

const orderingSchemas = [projectsInOrder, stillsInOrder].map((schema) => ({
  ...schema,
  group: 'ordering',
}))

export const schemaTypes = [...dataSchemas, ...orderingSchemas, about]
