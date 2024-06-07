import { sanityClient } from 'sanity:client'

export async function getProjectsInOrder() {
  const data = await sanityClient.fetch(
    `*[_type == 'projectsInOrder'][0] {
      "projects": projects[]->{
        title,
        video,
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
          'thumbnail': episodeThumbnail.asset->url,
          episodeVideo, 
        },  
        mediaArray[]{
          nestedMediaArray[]{
            "imageSrc": asset->url
          },  
        }  
      }  
    `  
  )  
  return data
}  

export async function getNextProject(currentProjectTitle) {
  try {
    // Step 1: Retrieve the Current Project's Position
    const currentPositionQuery = `
      *[_type == 'projectsInOrder'][0] {
        "projects":projects[]->{
          _id,
          _key,
          title
        }
      }
    `;
    const orderData = await sanityClient.fetch(currentPositionQuery);
    const projects = orderData.projects;
    const currentIndex = orderData.projects.findIndex(project => project.title === currentProjectTitle);

    if (currentIndex === -1) {
      console.error(`Project with title "${currentProjectTitle}" not found in projectsInOrder.`);
      return null;
    }

    const nextIndex = (currentIndex + 1) % projects.length;

    // Step 2: Retrieve the Next Project Based on Position
    const nextProjectQuery = `
     *[_type == 'projectsInOrder'][0] {
      projects[${nextIndex}]->{
        title,
        video,
        "slug": slug.current,
      }
    }
    `;
    const nextProjectData = await sanityClient.fetch(nextProjectQuery);

    return nextProjectData;
  } catch (error) {
    console.error('Error fetching next project:', error);
    return null;
  }
}
