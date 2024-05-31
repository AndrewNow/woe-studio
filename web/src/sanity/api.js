import { sanityClient } from 'sanity:client'

export async function getProjectPageData() {
  const data = await sanityClient.fetch(
    `*[_type == "projects"][]{
        title,
        "slug": slug.current,
        description,
        secondaryDescription,
        clientArray[],        
        awardArray[],
        awardImageArray[]{
          'imageSrc': asset->url,
        },
        servicesArray[],
        creditsArray[],
        previewUrl,
        "thumbnail": thumbnail.asset->url,
        video,
        episodeArray[]{
          episodeTitle,
          episodeSubtitle,
          'thumbnail': episodeThumbnail.asset->url
        },
        imageArray[]{
          nestedImageArray[]{
            "imageSrc": asset->url
          },
        }
      }
    `
  )
  return data
}

export async function getProjectsInOrder() {
  const data = await sanityClient.fetch(
    `*[_type == 'projectsInOrder'][0] {
      "projects": projects[]->{
        title,
        "slug": slug.current,
        clientArray[],        
        awardArray[],
        awardImageArray[]{
          'imageSrc': asset->url,
        },
        servicesArray[],
        creditsArray[],
        previewUrl,
      }
    }
    `
  )
  return data
}

