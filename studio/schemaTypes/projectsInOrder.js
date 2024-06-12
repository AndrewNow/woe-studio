import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectsInOrder',
  title: 'Projects (in order)',
  type: 'document',
  fields: [
    defineField({
      name: 'projects',
      title: 'Project',
      description: "Projects will appear in order from top to bottom.",
      type: 'array', 
      of: [{ name: 'projectReference', title: "Project reference", type: 'reference', to: [{ type: "projects" }] }],
      validation: Rule => Rule.required()
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Upload projects"
      };
    },
  },
});