import { m as getMotionProjectsInOrder, b as getSiteSettings, d as $$PageTransition, e as $$Layout, n as getStillsProjectsInOrder, o as $$Nav, p as $$BaseLayout, i as getPreviewClips } from './404_DiO4OqmZ.mjs';
import { f as createComponent, r as renderTemplate, i as renderComponent, m as maybeRenderHead, h as addAttribute, e as createAstro, k as renderSlot } from '../astro_RgHMKGuC.mjs';
import 'kleur/colors';
import 'html-escaper';
import { a as $$CornerTopLeft, b as $$CornerTopRight, c as $$CornerBottomLeft, d as $$CornerBottomRight, $ as $$Footer } from './__BYuoq-zb.mjs';
/* empty css                          */
/* empty css                          */
import { $ as $$VideoTimer } from './about_Ddjsf-nY.mjs';
/* empty css                          */

const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const allProjectData = await getMotionProjectsInOrder();
  const settingsData = await getSiteSettings();
  const data = allProjectData.projects;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects | WOE Studio", "data": settingsData, "description": "Explore the Projects page of WOE (What On Earth). Discover our portfolio showcasing select projects from captivating commercials to compelling documentaries, see how our unique approach transforms ideas into impactful visuals.", "data-astro-cid-vjeh6qce": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTransition", $$PageTransition, { "data-astro-cid-vjeh6qce": true })} ${maybeRenderHead()}<div class="project-grid__container" data-astro-cid-vjeh6qce> <div class="project-entries-container" data-astro-cid-vjeh6qce> ${data.map((data2, i) => {
    const mobileThumbnail = data2.thumbnail;
    const itemSpansTwoCols = i % 5 === 0;
    const className = itemSpansTwoCols ? "project-entry__double-column" : "project-entry__wrapper";
    const mobileImageSizes = {
      width: itemSpansTwoCols ? 412 : 204,
      height: itemSpansTwoCols ? 210 : 300
    };
    const tabletImageSizes = {
      width: itemSpansTwoCols ? 976 : 486,
      height: itemSpansTwoCols ? 440 : 694
    };
    const thumbnail = `${mobileThumbnail}?w=${mobileImageSizes.width * 2}&h=${mobileImageSizes.height * 2}&fit=crop&fm=webp`;
    const tabletThumbnail = `${mobileThumbnail}?w=${tabletImageSizes.width}&h=${tabletImageSizes.height}&fit=crop&fm=webp`;
    return renderTemplate`<a${addAttribute(`project-entry ${className}`, "class")}${addAttribute({ color: "white" }, "style")}${addAttribute(`/projects/${data2.slug}`, "href")} data-astro-cid-vjeh6qce> <div class="loader" data-astro-cid-vjeh6qce> <div class="lottie-container" data-astro-cid-vjeh6qce></div> </div> <div class="video-container hover-area" data-hover-text="View project" data-astro-cid-vjeh6qce> <video class="project-video-media" preload="metadata" loop muted playsinline data-astro-cid-vjeh6qce> <source${addAttribute(data2.previewUrl, "data-src")} type="video/mp4" data-astro-cid-vjeh6qce>
Your browser does not support the video tag.
</video> </div>  <img${addAttribute(thumbnail, "src")} alt=""${addAttribute(mobileImageSizes.width, "width")}${addAttribute(mobileImageSizes.height, "height")} loading="lazy" class="project-image-media__mobile hidden mobile-thumbnail" data-astro-cid-vjeh6qce> <img${addAttribute(tabletThumbnail, "src")} alt=""${addAttribute(tabletImageSizes.width, "width")}${addAttribute(tabletImageSizes.height, "height")} loading="lazy" class="project-image-media__tablet hidden tablet-thumbnail" data-astro-cid-vjeh6qce> <div class="project-text" data-astro-cid-vjeh6qce> <span class="project-titleset" data-astro-cid-vjeh6qce> ${data2.clientArray !== null && renderTemplate`<p data-astro-cid-vjeh6qce>${data2.clientArray[0]}</p>`} <p data-astro-cid-vjeh6qce>${data2.title}</p> </span> <span class="project-titleset titleset-services" data-astro-cid-vjeh6qce> <p data-astro-cid-vjeh6qce>${data2.servicesArray ? data2.servicesArray[0] : null}</p> </span> </div> </a>`;
  })} </div> ${renderComponent($$result2, "CornerTopLeft", $$CornerTopLeft, { "data-astro-cid-vjeh6qce": true })} ${renderComponent($$result2, "CornerTopRight", $$CornerTopRight, { "data-astro-cid-vjeh6qce": true })} ${renderComponent($$result2, "CornerBottomLeft", $$CornerBottomLeft, { "data-astro-cid-vjeh6qce": true })} ${renderComponent($$result2, "CornerBottomRight", $$CornerBottomRight, { "data-astro-cid-vjeh6qce": true })} </div> ${renderComponent($$result2, "Footer", $$Footer, { "data": settingsData, "data-astro-cid-vjeh6qce": true })} ` })}  `;
}, "/Users/anj/Coding/woestudio/web/src/pages/motion/index.astro", void 0);

const $$file$2 = "/Users/anj/Coding/woestudio/web/src/pages/motion/index.astro";
const $$url$2 = "/motion";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$2,
  file: $$file$2,
  url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const allProjectData = await getStillsProjectsInOrder();
  const settingsData = await getSiteSettings();
  const data = allProjectData?.stills;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Stills | WOE Studio", "data": settingsData, "description": "Explore the Projects page of WOE (What On Earth). Discover our portfolio showcasing select projects from captivating commercials to compelling documentaries, see how our unique approach transforms ideas into impactful visuals.", "data-astro-cid-nwtdm7wq": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTransition", $$PageTransition, { "data-astro-cid-nwtdm7wq": true })} ${maybeRenderHead()}<div class="stills-grid__container" data-astro-cid-nwtdm7wq> <div class="stills-entries-container" data-astro-cid-nwtdm7wq> ${data.map((data2, i) => {
    const mobileThumbnail = data2.thumbnail;
    const itemSpansTwoCols = (i + 1) % 5 === 0;
    const className = itemSpansTwoCols ? "stills-entry__double-column" : "stills-entry__wrapper";
    const mobileImageSizes = {
      width: itemSpansTwoCols ? 412 : 204,
      height: itemSpansTwoCols ? 210 : 300
    };
    const tabletImageSizes = {
      width: itemSpansTwoCols ? 976 : 486,
      height: itemSpansTwoCols ? 440 : 694
    };
    const thumbnail = `${mobileThumbnail}?w=${mobileImageSizes.width * 2}&h=${mobileImageSizes.height * 2}&fit=crop&fm=webp`;
    const tabletThumbnail = `${mobileThumbnail}?w=${tabletImageSizes.width}&h=${tabletImageSizes.height}&fit=crop&fm=webp`;
    return renderTemplate`<a${addAttribute(`stills-entry ${className}`, "class")}${addAttribute({ color: "white" }, "style")}${addAttribute(`/stills/${data2.slug}`, "href")} data-astro-cid-nwtdm7wq> <div class="stills-loader" data-astro-cid-nwtdm7wq> <div class="stills-lottie-container" data-astro-cid-nwtdm7wq></div> </div> <div class="stills-video-container hover-area" data-hover-text="View still" data-astro-cid-nwtdm7wq> <video class="stills-video-media" preload="metadata" loop muted playsinline data-astro-cid-nwtdm7wq> <source${addAttribute(data2.previewUrl, "data-src")} type="video/mp4" data-astro-cid-nwtdm7wq>
Your browser does not support the video tag.
</video> </div>  <img${addAttribute(thumbnail, "src")} alt=""${addAttribute(mobileImageSizes.width, "width")}${addAttribute(mobileImageSizes.height, "height")} loading="lazy" class="stills-image-media__mobile hidden mobile-thumbnail" data-astro-cid-nwtdm7wq> <img${addAttribute(tabletThumbnail, "src")} alt=""${addAttribute(tabletImageSizes.width, "width")}${addAttribute(tabletImageSizes.height, "height")} loading="lazy" class="stills-image-media__tablet hidden tablet-thumbnail" data-astro-cid-nwtdm7wq> <div class="stills-text" data-astro-cid-nwtdm7wq> <span class="stills-titleset" data-astro-cid-nwtdm7wq> ${data2.clientArray !== null && renderTemplate`<p data-astro-cid-nwtdm7wq>${data2.clientArray[0]}</p>`} <p data-astro-cid-nwtdm7wq>${data2.title}</p> </span> <span class="stills-titleset titleset-services" data-astro-cid-nwtdm7wq> <p data-astro-cid-nwtdm7wq>${data2.servicesArray ? data2.servicesArray[0] : null}</p> </span> </div> </a>`;
  })} </div> ${renderComponent($$result2, "CornerTopLeft", $$CornerTopLeft, { "data-astro-cid-nwtdm7wq": true })} ${renderComponent($$result2, "CornerTopRight", $$CornerTopRight, { "data-astro-cid-nwtdm7wq": true })} ${renderComponent($$result2, "CornerBottomLeft", $$CornerBottomLeft, { "data-astro-cid-nwtdm7wq": true })} ${renderComponent($$result2, "CornerBottomRight", $$CornerBottomRight, { "data-astro-cid-nwtdm7wq": true })} </div> ${renderComponent($$result2, "Footer", $$Footer, { "data": settingsData, "data-astro-cid-nwtdm7wq": true })} ` })}  `;
}, "/Users/anj/Coding/woestudio/web/src/pages/stills/index.astro", void 0);

const $$file$1 = "/Users/anj/Coding/woestudio/web/src/pages/stills/index.astro";
const $$url$1 = "/stills";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Hero;
  const { data } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="wrapper" data-astro-cid-zi4ldr3x> <div class="video-container" id="hero-video-container" data-astro-cid-zi4ldr3x> ${renderComponent($$result, "CornerTopLeft", $$CornerTopLeft, { "data-astro-cid-zi4ldr3x": true })} ${renderComponent($$result, "CornerTopRight", $$CornerTopRight, { "data-astro-cid-zi4ldr3x": true })} ${renderComponent($$result, "CornerBottomLeft", $$CornerBottomLeft, { "data-astro-cid-zi4ldr3x": true })} ${renderComponent($$result, "CornerBottomRight", $$CornerBottomRight, { "data-astro-cid-zi4ldr3x": true })} ${data.map((video, i) => {
    return renderTemplate`<a${addAttribute(`/projects/${video.slug}`, "href")} class="hero-video hover-area" id="timer-video-parent" data-astro-cid-zi4ldr3x> <video preload="metadata" autoplay loop muted id="timer-video" playsinline data-astro-cid-zi4ldr3x> <source${addAttribute(video.previewUrl, "src")} type="video/mp4" media="(min-width: 992px)" data-astro-cid-zi4ldr3x> <source${addAttribute(
      video.previewUrlMobile ? video.previewUrlMobile : video.previewUrl,
      "src"
    )} type="video/mp4" data-astro-cid-zi4ldr3x>
Your browser does not support the video tag.
</video> </a>`;
  })} <div id="animateTimerIn" data-astro-cid-zi4ldr3x> ${renderComponent($$result, "VideoTimer", $$VideoTimer, { "data": data, "data-astro-cid-zi4ldr3x": true })} </div> </div> </div> `;
}, "/Users/anj/Coding/woestudio/web/src/components/hero.astro", void 0);

const $$Astro = createAstro();
const $$HomepageLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HomepageLayout;
  const { title, data, description } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "data": data, "title": title, "description": description, "data-astro-cid-tishripp": true }, { "default": ($$result2) => renderTemplate`  ${renderSlot($$result2, $$slots["default"])} `, "nav": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="wrap-homepage-nav" data-astro-cid-tishripp> ${renderComponent($$result2, "Nav", $$Nav, { "data": data, "data-astro-cid-tishripp": true })} </div>` })} `;
}, "/Users/anj/Coding/woestudio/web/src/layouts/HomepageLayout.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const previewData = await getPreviewClips();
  const settingsData = await getSiteSettings();
  return renderTemplate`${renderComponent($$result, "HomepageLayout", $$HomepageLayout, { "homepageNav": true, "title": "WOE Studio", "data": settingsData, "description": "WOE (What On Earth) | Innovative Creative Studio Specializing in Video Production. We push the boundaries of conventional taste to deliver powerful, impactful visuals.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="landing-loader" id="loaderWrapper" data-astro-cid-j7pv25f6> <div class="lottie-container" data-astro-cid-j7pv25f6></div> </div> ${renderComponent($$result2, "Hero", $$Hero, { "data": previewData.projects, "data-astro-cid-j7pv25f6": true })} ` })}  `;
}, "/Users/anj/Coding/woestudio/web/src/pages/index.astro", void 0);

const $$file = "/Users/anj/Coding/woestudio/web/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { index$1 as a, index as b, index$2 as i };
