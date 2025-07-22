// note: this is the motion project schema

import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Motion',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Motion project title',
      description: 'Enter motion project title here.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Project description',
      description: 'Enter project description here.',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryDescription',
      title: 'Secondary description (optional)',
      description:
        'If filled, this will appear before the image gallery, but underneath the primary description content section of the project page.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      title: 'Clients',
      description: 'Add a list of clients associated to this project.',
      name: 'clientArray',
      type: 'array',
      of: [
        {
          type: 'string',
          name: 'client',
          title: 'Client name',
        },
      ],
    }),
    defineField({
      title: 'Award titles',
      description: 'Add a list of awards associated to this project.',
      name: 'awardArray',
      type: 'array',
      of: [
        {
          type: 'string',
          name: 'award',
          title: 'Award name',
        },
      ],
    }),
    defineField({
      title: 'Award logos',
      description:
        'Add a list of award logos associated to this project. Images should be PNG, with a white color fill and a transparent background.',
      name: 'awardImageArray',
      type: 'array',
      of: [
        {
          type: 'image',
          name: 'award',
          title: 'Award logo image',
        },
      ],
    }),
    defineField({
      title: 'Services',
      description:
        "Add a list of services associated to this project, ex: 'Content Creation'. Services should be written in title case.",
      name: 'servicesArray',
      type: 'array',
      of: [
        {
          type: 'string',
          name: 'service',
          title: 'Service',
        },
      ],
    }),
    defineField({
      title: 'Credits',
      description:
        "Add credits for members associated to this project, ex: 'CD & Graphics - Chris Yue'.",
      name: 'creditsArray',
      type: 'array',
      of: [
        {
          type: 'string',
          name: 'credit',
          title: 'Credit',
        },
      ],
    }),
    defineField({
      name: 'previewUrl',
      title: 'Preview-length clip',
      description: "Preview clips are shown on the homepage timer and on the 'All Projects' page",
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewOnHomepage',
      title: 'Display preview clip on homepage & about?',
      description:
        'If enabled, this field will add this project to the project preview timer component (on homepage + about)',
      type: 'boolean',
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Project video thumbnail',
      description: "This will be displayed before a user clicks on the 'Play' button.",
      type: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'video',
      title: 'Full-length video file',
      description: 'The primary video for this project.',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'episodeArray',
      title: 'Episodes',
      description: 'Upload episodes here, if applicable.',
      type: 'array',
      of: [
        {
          name: 'episode',
          type: 'object',
          title: 'Episode details',
          fields: [
            {
              name: 'episodeThumbnail',
              title: 'Episode thumbnail',
              description: 'Thumbnails should be in 16:9.',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'episodeTitle',
              title: 'Episode title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'episodeSubtitle',
              title: 'Episode subtitle',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'episodeVideo',
              title: 'Episode video',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      title: 'Media',
      description: 'Upload media relating to the project here.',
      name: 'mediaArray',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mediaEntry',
          title: 'Media entry',
          fields: [
            {
              name: 'nestedMediaArray',
              title: 'Nested media array',
              description:
                'Upload one media item for a single-item media presentation, or multiple files for a carousel of media. If an item has both a video AND an image, the video will be displayed and the image will be discarded. Please only upload one media type per entry.',
              type: 'array',
              of: [
                {
                  name: 'nestedMedia',
                  title: 'Media upload',
                  description: 'IMPORTANT: Only enter EITHER a video, or an image.',
                  type: 'object',
                  fields: [
                    {
                      name: 'nestedImage',
                      title: 'Image upload',
                      type: 'image',
                    },
                    {
                      name: 'nestedVideo',
                      title: 'Video upload',
                      type: 'url',
                    },
                  ],
                  preview: {
                    select: {
                      video: 'nestedVideo',
                      media: 'nestedImage',
                    },
                    prepare(selection) {
                      const {media, video} = selection
                      const hasVideo = video ? 'Video' : 'Image'
                      return {
                        title: hasVideo,
                        media: media,
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              nestedMediaArray: 'nestedMediaArray',
              firstImage: 'nestedMediaArray',
            },
            prepare(selection) {
              const {nestedMediaArray, firstImage} = selection
              const array = Object.values(nestedMediaArray)
              const length = array.length
              const image = firstImage[0].nestedImage.asset
              return {
                title: `Media group`,
                subtitle: `Contains ${length} ${length > 1 ? 'items' : 'item'}`,
                media: image,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      thumbnail: 'thumbnail',
    },
    prepare(selection) {
      const {title, thumbnail} = selection

      return {
        title,
        media: thumbnail,
      }
    },
  },
})
