import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({
      title: "Page hero images",
      description: "Must be exactly 9 images.",
      name: "heroImageArray",
      type: "array",
      validation: Rule => Rule.required().min(9).max(9).error('You must upload exactly 9 images.'),
      of: [{
        type: "image",
        name: "heroImage",
        title: "Hero image",
        fields: [{
          name: 'alt',
          type: "string",
          title: "Image title",
        }],
      }],
    }),
    defineField({
      name: 'description',
      title: 'Studio description',
      description: "This text will appear near the top, underneath the initial array of images.",
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      title: "Client logos",
      name: "clientLogoImageArray",
      description: "Images should be uploaded in square format, white fill on a transparent background.",
      type: "array",
      validation: Rule => Rule.required(),
      of: [{
        type: "image",
        name: "award",
        title: "Award logo image",
        fields: [{
          name: 'alt',
          type: "string",
          title: "Title"
        }],
      }],
    }),
    defineField({
      name: "teamArray",
      title: "Team",
      type: "array",
      of: [{
        name: "member",
        type: "object",
        title: "Team member",
        fields: [{
          name: 'portrait',
          title: 'Member portrait',
          description: "Portraits should be in 16:9.",
          type: 'image',
          validation: Rule => Rule.required(),
        },
        {
          name: 'name',
          title: 'Member name',
          type: 'string',
          validation: Rule => Rule.required(),
        },
        {
          name: 'title',
          title: 'Member title',
          description: "Ex: Co-Founder | Executive Producer",
          type: 'string',
          validation: Rule => Rule.required(),
        }],
        preview: {
          select: {
            title: "name",
            subtitle: "title",
            media: "portrait"
          },
        },
      }],
    }),
    defineField({
      title: "Expertise list",
      name: "expertiseArray",
      type: "array",
      validation: Rule => Rule.required(),
      of: [{
        type: "string",
        name: "expertise",
        title: "Expertise entry",
      },
      ]
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "About page data"
      };
    },
  },
});