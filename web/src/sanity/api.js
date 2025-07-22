import { sanityClient } from "sanity:client";

export async function getAboutData() {
  const data = await sanityClient.fetch(
    `*[_type == "about"][0]{
        description,
        clientLogoImageArray[]{
          'imageSrc': asset->url,
          alt
        },
        heroImageArray[]{
          'imageSrc': asset->url,
          alt
        },
        teamArray[]{
          name, 
          title, 
          "portrait": portrait.asset->url,
        },  
        expertiseArray[]
      }  
    `
  );
  return data;
}

export async function getPreviewClips() {
  const data = await sanityClient.fetch(`
    *[_type == 'homepageInOrder'][0] {
      "projects": projects[]-> { 
        title, 
        previewUrl,
        clientArray[0],
        "slug": slug.current
      }
    }
  `);
  return data;
}

export async function getMotionProjectsInOrder() {
  const data = await sanityClient.fetch(
    `*[_type == 'projectsInOrder'][0] {
      "projects": projects[]->{
        title,
        video,
        "thumbnail": thumbnail.asset->url,
        "slug": slug.current,
        clientArray[],        
        awardArray[],
        awardImageArray[]{
          'imageSrc': asset->url,
        },
        servicesArray[],
        creditsArray[],
        previewUrl,
        previewUrlMobile
      }
    }
    `
  );
  return data;
}

export async function getStillsProjectsInOrder() {
  const data = await sanityClient.fetch(
    `*[_type == 'stillsInOrder'][0] {
      "stills": stills[]->{
        title,
        video,
        "thumbnail": thumbnail.asset->url,
        "slug": slug.current,
        clientArray[],        
        awardArray[],
        awardImageArray[]{
          'imageSrc': asset->url,
        },
        servicesArray[],
        creditsArray[],
        previewUrl,
        previewUrlMobile
      }
    }
    `
  );
  return data;
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
        previewUrlMobile,
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
            "imageSrc": nestedImage.asset->url,
            nestedVideo
          },  
        }  
      }  
    `
  );
  return data;
}

export async function getStillsPageData() {
  const data = await sanityClient.fetch(
    `*[_type == "stills"][]{
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
        previewUrlMobile,
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
            "imageSrc": nestedImage.asset->url,
            nestedVideo
          },  
        }  
      }  
    `
  );
  return data;
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
    const currentIndex = orderData.projects.findIndex(
      (project) => project.title === currentProjectTitle
    );

    if (currentIndex === -1) {
      console.error(
        `Project with title "${currentProjectTitle}" not found in projectsInOrder.`
      );
      return null;
    }

    const nextIndex = (currentIndex + 1) % projects.length;

    // Step 2: Retrieve the Next Project Based on Position
    const nextProjectQuery = `
     *[_type == 'projectsInOrder'][0] {
      projects[${nextIndex}]->{
        title,
        previewUrl,
        "slug": slug.current,
      }
    }
    `;
    const nextProjectData = await sanityClient.fetch(nextProjectQuery);

    return nextProjectData;
  } catch (error) {
    console.error("Error fetching next project:", error);
    return null;
  }
}

export async function getNextStills(currentStillsTitle) {
  try {
    // Step 1: Retrieve the Current Stills Position
    const currentPositionQuery = `
      *[_type == 'stillsInOrder'][0] {
        "stills":stills[]->{
          _id,
          _key,
          title
        }
      }
    `;
    const orderData = await sanityClient.fetch(currentPositionQuery);
    const stills = orderData.stills;
    const currentIndex = orderData.stills.findIndex(
      (stills) => stills.title === currentStillsTitle
    );

    if (currentIndex === -1) {
      console.error(
        `Stills with title "${currentStillsTitle}" not found in stillsInOrder.`
      );
      return null;
    }

    const nextIndex = (currentIndex + 1) % stills.length;

    // Step 2: Retrieve the Next Stills Based on Position
    const nextStillsQuery = `
     *[_type == 'stillsInOrder'][0] {
      stills[${nextIndex}]->{
        title,
        previewUrl,
        "slug": slug.current,
      }
    }
    `;
    const nextStillsData = await sanityClient.fetch(nextStillsQuery);

    return nextStillsData;
  } catch (error) {
    console.error("Error fetching next stills:", error);
    return null;
  }
}

export async function getSiteSettings() {
  const data = await sanityClient.fetch(
    `*[_type == "generalSettings"][0]{
        logoVideo,
        address,
        instagram,
        tiktok,
        email,
      }  
    `
  );
  return data;
}
