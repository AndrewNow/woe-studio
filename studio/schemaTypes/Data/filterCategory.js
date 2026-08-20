import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'filterCategory',
  title: 'Filter category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      description:
        'Label on the filter bar. Rename it here once to update every project that uses it.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Appears on',
      description:
        'Which pages can use this filter. The site only shows the chip when at least one project on that page is tagged with it.',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Motion', value: 'motion'},
          {title: 'Stills', value: 'stills'},
        ],
        layout: 'grid',
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    // Legacy single-section field from earlier docs; kept so old data still matches queries.
    defineField({
      name: 'section',
      type: 'string',
      hidden: true,
    }),
    // Kept for older documents; not shown or required for new ones.
    defineField({
      name: 'slug',
      type: 'slug',
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections',
      section: 'section',
    },
    prepare({title, sections, section}) {
      const list = Array.isArray(sections) && sections.length
        ? sections
        : section
          ? [section]
          : []
      const labels = list.map((value) =>
        value === 'stills' ? 'Stills' : value === 'motion' ? 'Motion' : value,
      )
      return {
        title,
        subtitle: labels.length ? labels.join(' · ') : 'No pages selected',
      }
    },
  },
})
