import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'filterCategory',
  title: 'Filter category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Label',
      description: 'Button label shown on the Motion or Stills filter bar.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Stable id used for filtering (e.g. commercials, music-videos).',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      description: 'Which page this filter appears on.',
      type: 'string',
      options: {
        list: [
          {title: 'Motion', value: 'motion'},
          {title: 'Stills', value: 'stills'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      section: 'section',
      slug: 'slug.current',
    },
    prepare({title, section, slug}) {
      return {
        title,
        subtitle: `${section || 'unassigned'}${slug ? ` · ${slug}` : ''}`,
      }
    },
  },
})
