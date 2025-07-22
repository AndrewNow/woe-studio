import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'woe studio',

  projectId: 'n8fc5ydg',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Project Content')
              .child(
                S.list()
                  .title('Content')
                  .items([S.documentTypeListItem('projects'), S.documentTypeListItem('stills')]),
              ),

            S.listItem()
              .title('Ordering')
              .child(
                S.list()
                  .title('Ordering')
                  .items([
                    S.documentTypeListItem('projectsInOrder'),
                    S.documentTypeListItem('stillsInOrder'),
                  ]),
              ),

            // About as a standalone item
            S.documentTypeListItem('about'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
