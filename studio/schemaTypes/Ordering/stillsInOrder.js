import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'stillsInOrder',
  title: 'Stills (in order)',
  type: 'document',
  fields: [
    defineField({
      name: 'stills',
      title: 'Stills',
      description: 'Stills projects will appear in order from top to bottom.',
      type: 'array',
      of: [
        {
          name: 'stillsReference',
          title: 'Stills reference',
          type: 'reference',
          to: [{type: 'stills'}],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Upload projects (stills)',
      }
    },
  },
})
