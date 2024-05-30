import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projects',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project title',
      description: "Enter project title here.",
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Project description',
      description: "Enter project description here.",
      type: 'array', 
      of: [{type: 'block'}],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'secondaryDescription',
      title: 'Secondary description (optional)',
      description: "If filled, this will appear before the image gallery, but underneath the primary description content section of the project page.",
      type: 'array', 
      of: [{type: 'block'}],
    }),
    defineField({
      title: "Clients",
      description: "Add a list of clients associated to this project.",
      name: "clientArray",
      type: "array",
      of: [{
        type: "string",
        name: "client",
        title: "Client name",
        },
      ]
    }),
    defineField({
      title: "Award titles",
      description: "Add a list of awards associated to this project.",
      name: "awardArray",
      type: "array",
      of: [{
        type: "string",
        name: "award",
        title: "Award name",
        },
      ]
    }),
    defineField({
      title: "Award logos",
      description: "Add a list of award logos associated to this project. Images should be PNG, with a white color fill and a transparent background.",
      name: "awardImageArray",
      type: "array",
      of: [{
        type: "image",
        name: "award",
        title: "Award logo image",
      },
      ]
    }),
    defineField({
      title: "Services",
      description: "Add a list of services associated to this project, ex: 'Content Creation'. Services should be written in title case.",
      name: "servicesArray",
      type: "array",
      of: [{
        type: "string",
        name: "service",
        title: "Service",
        },
      ]
    }),
    defineField({
      title: "Credits",
      description: "Add credits for members associated to this project, ex: 'CD & Graphics - Chris Yue'.",
      name: "creditsArray",
      type: "array",
      of: [{
        type: "string",
        name: "credit",
        title: "Credit",
        },
      ]
    }),
    defineField({
      name: 'previewUrl',
      title: 'Preview-length clip (optional)',
      description: "If entered, this field will add this project to the project preview timer (on homepage + about)",
      type: 'url',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Project video thumbnail',
      description: "This will be displayed before a user clicks on the 'Play' button.",
      type: 'image',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'video',
      title: 'Full-length video file (optional)',
      description: "The primary video for this project.",
      type: 'url',
    }),
    defineField({
      name: "episodeArray",
      title: "Episodes",
      description: "Upload episodes here, if applicable.",
      type: "array",
      of: [{
        name: "episode",
        type: "object",
        title: "Episode details",
        fields: [{
          name: 'episodeThumbnail',
          title: 'Episode thumbnail',
          type: 'image',
        },
        {
        name: 'episodeTitle',
        title: 'Episode title',
        type: 'string',
        },
        {
        name: 'episodeSubtitle',
        title: 'Episode subtitle',
        type: 'string',
        }],
      }]
    }),
    defineField({
      title: "Images",
      description: "Upload images relating to the project here.",
      name: "imageArray",
      type: "array",
      of: [{
        type: "object",
        name: "imageEntry",
        title: "Image",
        fields: [{
          name: 'nestedImageArray',
          title: 'Nested image array',
          description: "Upload one image for a single-image presentation, or multiple images for a carousel.",
          type: 'array',
          of: [{
            name: 'nestedImage',
            title: 'Image upload',
            type: 'image',
          }],
          preview: {
            select: {
              nestedImage: 'nestedImage',
            },
            prepare(selection) {
              const { nestedImage } = selection;
              return {
                media: nestedImage,
              };
            },
          },
        }],
        preview: {
          select: {
            nestedImageArray: "nestedImageArray",
            firstImage: "nestedImageArray.0.asset"
          },
          prepare(selection) {
            const { nestedImageArray, firstImage } = selection;
            const array = Object.values(nestedImageArray);
            const length = array.length;
            return {
              title: `Image group`,
              subtitle: `Contains ${length} ${length > 1 ? "images" : "image"}`,
              media: firstImage
            };
          },
        },
      }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      thumbnail: 'thumbnail',
    },
    prepare(selection) {
      const { title, thumbnail } = selection;

      return {
        title,
        media: thumbnail,
      };
    },
  },
});