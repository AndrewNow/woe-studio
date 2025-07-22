import { a as $$Image, i as getPreviewClips, j as getAboutData, b as getSiteSettings, d as $$PageTransition, e as $$Layout } from './404_DiO4OqmZ.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute, i as renderComponent, n as defineScriptVars, j as Fragment } from '../astro_RgHMKGuC.mjs';
import 'kleur/colors';
import 'html-escaper';
import '@astrojs/internal-helpers/path';
/* empty css                          */
/* empty css                          */
import { $ as $$Footer } from './__BYuoq-zb.mjs';

const $$Astro$3 = createAstro();
const $$Team = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Team;
  const { data, expertiseData, logoVideo, email } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="team__wrapper" data-astro-cid-q4iuncus> <div class="team__container" data-astro-cid-q4iuncus> ${data.map((member, i) => {
    return renderTemplate`<div class="team-entry" id="team-entry"${addAttribute(i, "data-index")} data-astro-cid-q4iuncus> <div class="member-name" data-astro-cid-q4iuncus> <p data-astro-cid-q4iuncus>${member.name}</p> </div> <div class="member-title" data-astro-cid-q4iuncus> <p data-astro-cid-q4iuncus>${member.title}</p> </div> <div class="member-image__wrapper" data-astro-cid-q4iuncus> ${renderComponent($$result, "Image", $$Image, { "class": "member-image", "src": member.portrait, "width": "270", "height": "130", "quality": "100", "alt": `Portrait image of ${member.name}`, "data-astro-cid-q4iuncus": true })} </div> </div>`;
  })} <a${addAttribute(`mailto:${email}`, "href")} class="team-entry mobile-team-entry" id="team-entry" data-astro-cid-q4iuncus> <div class="member-name" data-astro-cid-q4iuncus> <p data-astro-cid-q4iuncus>Work with WOE</p> </div> <div class="member-title" data-astro-cid-q4iuncus> <p data-astro-cid-q4iuncus>${email}</p> </div> </a> </div> <div class="team-expertise" data-astro-cid-q4iuncus> <p data-astro-cid-q4iuncus>Expertise</p> <ul class="expertise-list" data-astro-cid-q4iuncus> ${expertiseData.map((item) => renderTemplate`<li data-astro-cid-q4iuncus>${item}</li>`)} </ul> </div> <!-- <div class="blend-wrapper">
    <video class="blend-video" playsinline muted autoplay loop src={logoVideo}>
    </video>
  </div> --> </div> `;
}, "/Users/anj/Coding/woestudio/web/src/components/team.astro", void 0);

const $$Astro$2 = createAstro();
const $$Marquee = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Marquee;
  const { logoData } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="marquee-content" id="marquee" data-astro-cid-onjcr3pu> ${logoData.map((logo) => renderTemplate`<span class="marquee-item" data-astro-cid-onjcr3pu> ${renderComponent($$result, "Image", $$Image, { "src": logo.imageSrc, "alt": `${logo.alt} logo`, "widths": [60, 100], "sizes": `(max-width: 768px) 60px, 100px`, "width": "100", "height": "100", "quality": "10", "data-astro-cid-onjcr3pu": true })} </span>`)} </div>  `;
}, "/Users/anj/Coding/woestudio/web/src/components/marquee.astro", void 0);

const logo = new Proxy({"src":"/_astro/woe-full.DhG9PGUx.png","width":511,"height":25,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "/Users/anj/Coding/woestudio/web/src/assets/woe-full.png";
							}
							
							return target[name];
						}
					});

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$VideoTimer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$VideoTimer;
  const { data } = Astro2.props;
  const isIndexPage = Astro2.url.pathname == "/";
  const timerWrapperClass = isIndexPage ? "timer__wrapper" : "timer__wrapper mobile-about";
  return renderTemplate(_a || (_a = __template(["", '<div class="timer__parent"> <div class="timer__container"> ', " ", " </div> </div>  <script>(function(){", `
  const timerWrapper = document.querySelector(".timer__wrapper");

  // only show 6 projects, generally
  let desktopData = data.slice(0, 6);
  let mobileData = desktopData;

  // if on /about page, only render 3 projects
  if (!isIndexPage && window.innerWidth < 992) {
    mobileData = data.slice(0, 3);
  }

  const timerData = isIndexPage ? desktopData : mobileData;

  timerWrapper.innerHTML = timerData
    .map(
      (video) => \`
          <a class="timer-item" href="/projects/\${video.slug}">
            <p>\${video.title}</p>
            <p>\${video.clientArray ? video.clientArray : ""}</p>
            <div class="timer-countdown">
              <div class="timer-countdown__progress"></div>
            </div>
          </a>\`
    )
    .join("");

  const resetProgressBars = () => {
    const progressBars = document.querySelectorAll(
      ".timer-countdown__progress"
    );
    progressBars.forEach((bar) => {
      bar.style.transform = "scaleX(0)";
      bar.style.transitionDuration = "0s"; // Ensure no transition during reset
      bar.offsetHeight; // Trigger a reflow to apply the styles immediately
      bar.style.transitionDuration = "5s"; // Reapply transition for the animation
    });
  };

  // run the video timer
  const runTimer = () => {
    const timerItems = document.querySelectorAll(".timer-item");
    const timerVideoParentArr = document.querySelectorAll(
      "#timer-video-parent"
    );

    const duration = 5000; // Duration of each video in milliseconds
    let currentIndex = 0;
    let timerInterval;

    const updateTimer = () => {
      const resetAllVideos = () => {
        timerVideoParentArr.forEach((parent, i) => {
          const childVideo = parent.querySelector("video");
          childVideo.pause();
          childVideo.currentTime = 0;
          childVideo.load(); // Reload the video
          parent.style.display = "none";
          parent.style.opacity = "0";
        });
      };

      if (currentIndex >= timerItems.length) {
        resetAllVideos();
        currentIndex = 0;

        // Preload the first video
        const firstVideo = timerVideoParentArr[0].querySelector("video");
        firstVideo.load();

        // Add a small delay before restarting the loop
        setTimeout(() => {
          updateTimer();
        }, 100);
        return;
      }

      timerVideoParentArr.forEach((parent, i) => {
        const childVideo = parent.querySelector("video");

        if (i == currentIndex) {
          parent.style.display = "block";
          parent.style.opacity = "1";

          // Ensure video is ready before playing
          if (childVideo.readyState >= 3) {
            childVideo
              .play()
              .catch((e) => console.error("Error playing video:", e));
          } else {
            childVideo.addEventListener(
              "canplay",
              () => {
                childVideo
                  .play()
                  .catch((e) => console.error("Error playing video:", e));
              },
              { once: true }
            );
          }
        } else {
          parent.style.opacity = "0";
          setTimeout(() => {
            parent.style.display = "none";
            childVideo.pause();
            childVideo.currentTime = 0;
          }, 510);
        }
      });

      // Reset the previous element's progress bar state
      if (currentIndex < timerItems.length) {
        const currentProgress = timerItems[currentIndex].querySelector(
          ".timer-countdown__progress"
        );
        currentProgress.style.transform = "scaleX(1) translateY(0px)";

        timerItems.forEach((item, i) => {
          const currentTextElements = item.querySelectorAll("p");
          if (i === currentIndex) {
            currentTextElements[0].style.opacity = "1";
            currentTextElements[1].style.opacity = ".75";
          } else {
            currentTextElements.forEach((el) => {
              el.style.opacity = "0.5";
            });
          }
        });

        const prevIndex =
          currentIndex === 0 ? timerItems.length - 1 : currentIndex - 1;
        const prevProgress = timerItems[prevIndex].querySelector(
          ".timer-countdown__progress"
        );
        prevProgress.style.transform = "scaleX(0)";
        prevProgress.style.transitionDuration = "0s";
        prevProgress.offsetHeight;
        prevProgress.style.transitionDuration = "5s";
      }

      currentIndex++;
    };

    const startTimer = () => {
      resetProgressBars(); // Reset progress bars before starting the timer
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(updateTimer, duration);
      updateTimer(); // Run the timer immediately
    };

    // Check if we're on the homepage
    if (isIndexPage) {
      const loaderWrapper = document.getElementById("loaderWrapper");
      const userHasVisited = sessionStorage.getItem("visited");

      if (userHasVisited || !loaderWrapper) {
        // If user has visited before or there's no loader, start the timer immediately
        startTimer();
      } else {
        // If it's the user's first visit and there's a loader, wait for the loader to finish
        setTimeout(() => {
          // Start the timer when the loader video ends
          startTimer();
        }, 3400); // make sure this matches the duration of the loader video on index.astro
      }
    } else {
      // If not on homepage, start the timer immediately
      startTimer();
    }
  };

  // Call the function to initialize the timer setup
  runTimer();
})();<\/script>`], ["", '<div class="timer__parent"> <div class="timer__container"> ', " ", " </div> </div>  <script>(function(){", `
  const timerWrapper = document.querySelector(".timer__wrapper");

  // only show 6 projects, generally
  let desktopData = data.slice(0, 6);
  let mobileData = desktopData;

  // if on /about page, only render 3 projects
  if (!isIndexPage && window.innerWidth < 992) {
    mobileData = data.slice(0, 3);
  }

  const timerData = isIndexPage ? desktopData : mobileData;

  timerWrapper.innerHTML = timerData
    .map(
      (video) => \\\`
          <a class="timer-item" href="/projects/\\\${video.slug}">
            <p>\\\${video.title}</p>
            <p>\\\${video.clientArray ? video.clientArray : ""}</p>
            <div class="timer-countdown">
              <div class="timer-countdown__progress"></div>
            </div>
          </a>\\\`
    )
    .join("");

  const resetProgressBars = () => {
    const progressBars = document.querySelectorAll(
      ".timer-countdown__progress"
    );
    progressBars.forEach((bar) => {
      bar.style.transform = "scaleX(0)";
      bar.style.transitionDuration = "0s"; // Ensure no transition during reset
      bar.offsetHeight; // Trigger a reflow to apply the styles immediately
      bar.style.transitionDuration = "5s"; // Reapply transition for the animation
    });
  };

  // run the video timer
  const runTimer = () => {
    const timerItems = document.querySelectorAll(".timer-item");
    const timerVideoParentArr = document.querySelectorAll(
      "#timer-video-parent"
    );

    const duration = 5000; // Duration of each video in milliseconds
    let currentIndex = 0;
    let timerInterval;

    const updateTimer = () => {
      const resetAllVideos = () => {
        timerVideoParentArr.forEach((parent, i) => {
          const childVideo = parent.querySelector("video");
          childVideo.pause();
          childVideo.currentTime = 0;
          childVideo.load(); // Reload the video
          parent.style.display = "none";
          parent.style.opacity = "0";
        });
      };

      if (currentIndex >= timerItems.length) {
        resetAllVideos();
        currentIndex = 0;

        // Preload the first video
        const firstVideo = timerVideoParentArr[0].querySelector("video");
        firstVideo.load();

        // Add a small delay before restarting the loop
        setTimeout(() => {
          updateTimer();
        }, 100);
        return;
      }

      timerVideoParentArr.forEach((parent, i) => {
        const childVideo = parent.querySelector("video");

        if (i == currentIndex) {
          parent.style.display = "block";
          parent.style.opacity = "1";

          // Ensure video is ready before playing
          if (childVideo.readyState >= 3) {
            childVideo
              .play()
              .catch((e) => console.error("Error playing video:", e));
          } else {
            childVideo.addEventListener(
              "canplay",
              () => {
                childVideo
                  .play()
                  .catch((e) => console.error("Error playing video:", e));
              },
              { once: true }
            );
          }
        } else {
          parent.style.opacity = "0";
          setTimeout(() => {
            parent.style.display = "none";
            childVideo.pause();
            childVideo.currentTime = 0;
          }, 510);
        }
      });

      // Reset the previous element's progress bar state
      if (currentIndex < timerItems.length) {
        const currentProgress = timerItems[currentIndex].querySelector(
          ".timer-countdown__progress"
        );
        currentProgress.style.transform = "scaleX(1) translateY(0px)";

        timerItems.forEach((item, i) => {
          const currentTextElements = item.querySelectorAll("p");
          if (i === currentIndex) {
            currentTextElements[0].style.opacity = "1";
            currentTextElements[1].style.opacity = ".75";
          } else {
            currentTextElements.forEach((el) => {
              el.style.opacity = "0.5";
            });
          }
        });

        const prevIndex =
          currentIndex === 0 ? timerItems.length - 1 : currentIndex - 1;
        const prevProgress = timerItems[prevIndex].querySelector(
          ".timer-countdown__progress"
        );
        prevProgress.style.transform = "scaleX(0)";
        prevProgress.style.transitionDuration = "0s";
        prevProgress.offsetHeight;
        prevProgress.style.transitionDuration = "5s";
      }

      currentIndex++;
    };

    const startTimer = () => {
      resetProgressBars(); // Reset progress bars before starting the timer
      if (timerInterval) clearInterval(timerInterval);
      timerInterval = setInterval(updateTimer, duration);
      updateTimer(); // Run the timer immediately
    };

    // Check if we're on the homepage
    if (isIndexPage) {
      const loaderWrapper = document.getElementById("loaderWrapper");
      const userHasVisited = sessionStorage.getItem("visited");

      if (userHasVisited || !loaderWrapper) {
        // If user has visited before or there's no loader, start the timer immediately
        startTimer();
      } else {
        // If it's the user's first visit and there's a loader, wait for the loader to finish
        setTimeout(() => {
          // Start the timer when the loader video ends
          startTimer();
        }, 3400); // make sure this matches the duration of the loader video on index.astro
      }
    } else {
      // If not on homepage, start the timer immediately
      startTimer();
    }
  };

  // Call the function to initialize the timer setup
  runTimer();
})();<\/script>`])), maybeRenderHead(), isIndexPage && renderTemplate`${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "WOE Studio logo", "width": "575", "height": "28", "quality": "95", "loading": "eager", "class": "video-timer-woe-logo" })}`, data && renderTemplate`<div${addAttribute(`${timerWrapperClass}`, "class")}></div>`, defineScriptVars({ isIndexPage, data }));
}, "/Users/anj/Coding/woestudio/web/src/components/videoTimer.astro", void 0);

const $$Astro = createAstro();
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const previewClipData = await getPreviewClips();
  const data = await getAboutData();
  const settingsData = await getSiteSettings();
  const isIndexPage = Astro2.url.pathname == "/";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About | WOE Studio", "data": settingsData, "description": "Welcome to WOE (What On Earth). Our collaborative approach ensures that every project is infused with innovation and creativity, turning bold ideas into unforgettable visual experiences. Get to know the people behind WOE and see how our collective expertise transforms the ordinary into the extraordinary.\xA0", "data-astro-cid-kh7btl4r": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTransition", $$PageTransition, { "data-astro-cid-kh7btl4r": true })} ${maybeRenderHead()}<div class="wrap-header" data-astro-cid-kh7btl4r> <div class="canvas__wrapper" data-astro-cid-kh7btl4r> <div class="blur" data-astro-cid-kh7btl4r> <div class="circle circle-1" data-astro-cid-kh7btl4r></div> <div class="circle circle-2" data-astro-cid-kh7btl4r></div> <div class="circle circle-3" data-astro-cid-kh7btl4r></div> <!-- <canvas id="gradient-canvas" data-js-darken-top></canvas> --> </div> </div> <div class="about-hero" data-astro-cid-kh7btl4r> <div class="about-images__wrapper" data-astro-cid-kh7btl4r> <div class="mobile-about-marquee" id="aboutHeroMarquee" data-astro-cid-kh7btl4r> ${data.heroImageArray.map((img) => {
    return renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "about-hero-image", "src": img.imageSrc, "widths": [300, 430, 553], "sizes": `(max-width: 525px) 300px, (max-width: 768px) 430px, 553px`, "width": "553", "height": "287", "alt": img.alt != null ? img.alt : "", "data-astro-cid-kh7btl4r": true })}`;
  })} </div> <div class="about-images__col" id="about-col1" data-astro-cid-kh7btl4r> ${data.heroImageArray.slice(0, 3).map((img) => {
    return renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "about-hero-image", "src": img.imageSrc, "widths": [300, 430, 553], "sizes": `(max-width: 525px) 300px, (max-width: 768px) 430px, 553px`, "width": "553", "height": "287", "alt": img.alt != null ? img.alt : "", "data-astro-cid-kh7btl4r": true })}`;
  })} </div> <div class="about-images__col" id="about-col2" data-astro-cid-kh7btl4r> ${data.heroImageArray.slice(3, 6).map((img) => {
    return renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "about-hero-image", "src": img.imageSrc, "widths": [300, 430, 553], "sizes": `(max-width: 525px) 300px, (max-width: 768px) 430px, 553px`, "width": "553", "height": "287", "alt": img.alt != null ? img.alt : "", "data-astro-cid-kh7btl4r": true })}`;
  })} </div> <div class="about-images__col" id="about-col3" data-astro-cid-kh7btl4r> ${data.heroImageArray.slice(6, 9).map((img) => {
    return renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "about-hero-image", "src": img.imageSrc, "widths": [300, 430, 553], "sizes": `(max-width: 525px) 300px, (max-width: 768px) 430px, 553px`, "width": "553", "height": "287", "alt": img.alt != null ? img.alt : "", "data-astro-cid-kh7btl4r": true })}`;
  })} </div> </div> <h2 class="about-bio" data-astro-cid-kh7btl4r> ${data.description} </h2> </div> <div class="blend-wrapper-mobile" data-astro-cid-kh7btl4r> <video class="blend-video" playsinline muted autoplay loop${addAttribute(settingsData.logoVideo, "src")} data-astro-cid-kh7btl4r></video> </div> ${data.teamArray != null && data.expertiseArray != null && renderTemplate`${renderComponent($$result2, "Team", $$Team, { "data": data.teamArray, "expertiseData": data.expertiseArray, "logoVideo": settingsData.logoVideo, "email": settingsData.email, "data-astro-cid-kh7btl4r": true })}`} ${data.teamArray != null && renderTemplate`<div class="blend-wrapper" data-astro-cid-kh7btl4r> <video class="blend-video" playsinline muted autoplay loop${addAttribute(settingsData.logoVideo, "src")} data-astro-cid-kh7btl4r></video> </div>`} </div> ${data.clientLogoImageArray != null && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-kh7btl4r": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Marquee", $$Marquee, { "logoData": data.clientLogoImageArray, "data-astro-cid-kh7btl4r": true })} ` })}`}${!data.teamArray && renderTemplate`<div class="spacer" data-astro-cid-kh7btl4r></div>`}<div class="sticky__container" data-astro-cid-kh7btl4r> <div class="sticky-gradient" data-astro-cid-kh7btl4r></div> <div class="about-video__container" data-astro-cid-kh7btl4r> ${previewClipData.projects.map((video, i) => {
    return renderTemplate`<a${addAttribute(`/projects/${video.slug}`, "href")} class="hero-video hover-area" id="timer-video-parent" data-astro-cid-kh7btl4r> <video preload="metadata" autoplay="true" loop="true" muted="true" id="timer-video" playsinline data-astro-cid-kh7btl4r> <source${addAttribute(video.previewUrl, "src")} type="video/mp4" data-astro-cid-kh7btl4r>
Your browser does not support the video tag.
</video> </a>`;
  })} ${renderComponent($$result2, "VideoTimer", $$VideoTimer, { "data": previewClipData.projects, "data-astro-cid-kh7btl4r": true })} ${!isIndexPage && renderTemplate`<a href="/projects" class="link hero-projects-link" data-value="View all projects" data-content="View all projects" data-astro-cid-kh7btl4r> <p data-astro-cid-kh7btl4r>View all projects</p> </a>`} </div> </div> ${renderComponent($$result2, "Footer", $$Footer, { "data": settingsData, "data-astro-cid-kh7btl4r": true })} ` })}   `;
}, "/Users/anj/Coding/woestudio/web/src/pages/about.astro", void 0);

const $$file = "/Users/anj/Coding/woestudio/web/src/pages/about.astro";
const $$url = "/about";

const about = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$VideoTimer as $, about as a };
