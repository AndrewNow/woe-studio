import { $ as $$Logotype, a as $$Image, g as getProjectPageData, b as getSiteSettings, c as getNextProject, d as $$PageTransition, e as $$Layout, f as getStillsPageData, h as getNextStills } from './404_DiO4OqmZ.mjs';
import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, k as renderSlot, i as renderComponent, h as addAttribute, j as Fragment, n as defineScriptVars } from '../astro_RgHMKGuC.mjs';
import 'kleur/colors';
import 'html-escaper';
import '@astrojs/internal-helpers/path';
import 'clsx';
/* empty css                           */
import { isPortableTextToolkitList, isPortableTextListItemBlock, isPortableTextToolkitSpan, isPortableTextBlock, isPortableTextToolkitTextNode, nestLists, LIST_NEST_MODE_HTML, buildMarksTree } from '@portabletext/toolkit';
/* empty css                          */
/* empty css                           */
/* empty css                           */

function isComponent(it) {
  return typeof it === "function";
}
function mergeComponents(components, overrides) {
  const cmps = { ...components };
  for (const [key, override] of Object.entries(overrides)) {
    const current = components[key];
    const value = !current || isComponent(override) || isComponent(current) ? override : {
      ...current,
      ...override
    };
    cmps[key] = value;
  }
  return cmps;
}

const getTemplate = (prop, type) => `PortableText [components.${prop}] is missing "${type}"`;
const unknownTypeWarning = (type) => getTemplate("type", type);
const unknownMarkWarning = (markType) => getTemplate("mark", markType);
const unknownBlockWarning = (style) => getTemplate("block", style);
const unknownListWarning = (listItem) => getTemplate("list", listItem);
const unknownListItemWarning = (listStyle) => getTemplate("listItem", listStyle);
const getWarningMessage = (nodeType, type) => {
  const fncs = {
    block: unknownBlockWarning,
    list: unknownListWarning,
    listItem: unknownListItemWarning,
    mark: unknownMarkWarning,
    type: unknownTypeWarning
  };
  return fncs[nodeType](type);
};
function printWarning(message) {
  console.warn(message);
}

const key = Symbol("astro-portabletext");
function useContext(node) {
  if (!(key in globalThis)) {
    throw new Error(`PortableText "context" has not been initialised`);
  }
  return globalThis[key](node);
}

const $$Astro$d = createAstro();
const $$Block = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Block;
  const props = Astro2.props;
  const { node, index, isInline, ...attrs } = props;
  const styleIs = (style) => style === node.style;
  const { getUnknownComponent } = useContext(node);
  const UnknownStyle = getUnknownComponent();
  return renderTemplate`${styleIs("h1") ? renderTemplate`${maybeRenderHead()}<h1${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h1>` : styleIs("h2") ? renderTemplate`<h2${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h2>` : styleIs("h3") ? renderTemplate`<h3${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h3>` : styleIs("h4") ? renderTemplate`<h4${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h4>` : styleIs("h5") ? renderTemplate`<h5${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h5>` : styleIs("h6") ? renderTemplate`<h6${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</h6>` : styleIs("blockquote") ? renderTemplate`<blockquote${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</blockquote>` : styleIs("normal") ? renderTemplate`<p${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</p>` : renderTemplate`${renderComponent($$result, "UnknownStyle", UnknownStyle, { ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/Block.astro", void 0);

const $$HardBreak = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<br>`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/HardBreak.astro", void 0);

const $$Astro$c = createAstro();
const $$List = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$List;
  const { node, index, isInline, ...attrs } = Astro2.props;
  const listItemIs = (listItem) => listItem === node.listItem;
  return renderTemplate`${listItemIs("menu") ? renderTemplate`${maybeRenderHead()}<menu${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</menu>` : listItemIs("number") ? renderTemplate`<ol${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ol>` : renderTemplate`<ul${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</ul>`}`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/List.astro", void 0);

const $$Astro$b = createAstro();
const $$ListItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ListItem;
  const { node, index, isInline, ...attrs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<li${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/ListItem.astro", void 0);

const $$Astro$a = createAstro();
const $$Mark = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Mark;
  const props = Astro2.props;
  const { node, index, isInline, ...attrs } = props;
  const markTypeIs = (markType) => markType === node.markType;
  const { getUnknownComponent } = useContext(node);
  const UnknownMarkType = getUnknownComponent();
  return renderTemplate`${markTypeIs("code") ? renderTemplate`${maybeRenderHead()}<code${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</code>` : markTypeIs("em") ? renderTemplate`<em${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</em>` : markTypeIs("link") ? renderTemplate`<a${addAttribute(node.markDef.href, "href")}${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</a>` : markTypeIs("strike-through") ? renderTemplate`<del${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</del>` : markTypeIs("strong") ? renderTemplate`<strong${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</strong>` : markTypeIs("underline") ? renderTemplate`<span style="text-decoration: underline;"${spreadAttributes(attrs)}>${renderSlot($$result, $$slots["default"])}</span>` : renderTemplate`${renderComponent($$result, "UnknownMarkType", UnknownMarkType, { ...props }, { "default": ($$result2) => renderTemplate`${renderSlot($$result2, $$slots["default"])}` })}`}`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/Mark.astro", void 0);

const $$UnknownBlock = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<p data-portabletext-unknown="block">${renderSlot($$result, $$slots["default"])}</p>`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/UnknownBlock.astro", void 0);

const $$UnknownList = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<ul data-portabletext-unknown="list">${renderSlot($$result, $$slots["default"])}</ul>`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/UnknownList.astro", void 0);

const $$UnknownListItem = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<li data-portabletext-unknown="listitem">${renderSlot($$result, $$slots["default"])}</li>`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/UnknownListItem.astro", void 0);

const $$UnknownMark = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<span data-portabletext-unknown="mark">${renderSlot($$result, $$slots["default"])}</span>`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/UnknownMark.astro", void 0);

const $$Astro$9 = createAstro();
const $$UnknownType = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$UnknownType;
  const { node, isInline } = Astro2.props;
  const warning = getWarningMessage("type", node._type);
  return renderTemplate`${isInline ? renderTemplate`${maybeRenderHead()}<span style="display:none" data-portabletext-unknown="type">${warning}</span>` : renderTemplate`<div style="display:none" data-portabletext-unknown="type">${warning}</div>`}`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/UnknownType.astro", void 0);

const $$Astro$8 = createAstro();
const $$PortableText$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$PortableText$1;
  const {
    value,
    components: componentOverrides = {},
    listNestingMode = LIST_NEST_MODE_HTML,
    onMissingComponent = true
  } = Astro2.props;
  const components = mergeComponents(
    {
      type: {},
      unknownType: $$UnknownType,
      block: {
        h1: $$Block,
        h2: $$Block,
        h3: $$Block,
        h4: $$Block,
        h5: $$Block,
        h6: $$Block,
        blockquote: $$Block,
        normal: $$Block
      },
      unknownBlock: $$UnknownBlock,
      list: {
        bullet: $$List,
        number: $$List,
        menu: $$List
      },
      unknownList: $$UnknownList,
      listItem: {
        bullet: $$ListItem,
        number: $$ListItem,
        menu: $$ListItem
      },
      unknownListItem: $$UnknownListItem,
      mark: {
        code: $$Mark,
        em: $$Mark,
        link: $$Mark,
        "strike-through": $$Mark,
        strong: $$Mark,
        underline: $$Mark
      },
      unknownMark: $$UnknownMark,
      hardBreak: $$HardBreak
    },
    componentOverrides
  );
  const noop = () => {
  };
  const missingComponentHandler = ((handler) => {
    if (typeof handler === "function") {
      return handler;
    }
    return !handler ? noop : printWarning;
  })(onMissingComponent);
  const serializeNode = (isInline) => (node, index = 0) => asComponentProps(node, index, isInline);
  const serializeChildren = (node, isInline) => node.children.map(serializeNode(isInline));
  const serializeMarksTree = (node) => buildMarksTree(node).map(serializeNode(true));
  const asComponentProps = (node, index, isInline) => ({
    node,
    index,
    isInline
  });
  const provideComponent = (nodeType, type) => {
    const component = components[nodeType];
    return isComponent(component) ? component : component[type] ?? missingComponentHandler(getWarningMessage(nodeType, type), {
      nodeType,
      type
    });
  };
  const prepareForRender = (props) => {
    const { node } = props;
    return isPortableTextToolkitList(node) ? [
      provideComponent("list", node.listItem) ?? components.unknownList,
      serializeChildren(node, false)
    ] : isPortableTextListItemBlock(node) ? [
      provideComponent("listItem", node.listItem) ?? components.unknownListItem,
      serializeMarksTree(node).map((children) => {
        if (node.style !== "normal") {
          const { listItem, ...blockNode } = node;
          children = serializeNode(false)(blockNode, 0);
        }
        return children;
      })
    ] : isPortableTextToolkitSpan(node) ? [
      provideComponent("mark", node.markType) ?? components.unknownMark,
      serializeChildren(node, true)
    ] : isPortableTextBlock(node) ? [
      provideComponent(
        "block",
        node.style ?? (node.style = "normal")
        /* Make sure style has been set */
      ) ?? components.unknownBlock,
      serializeMarksTree(node)
    ] : isPortableTextToolkitTextNode(node) ? [
      "\n" === node.text && isComponent(components.hardBreak) ? components.hardBreak : node.text,
      []
    ] : [
      provideComponent("type", node._type) ?? components.unknownType,
      []
    ];
  };
  globalThis[key] = (node) => {
    return {
      getDefaultComponent: provideDefaultComponent.bind(null, node),
      getUnknownComponent: provideUnknownComponent.bind(null, node)
    };
  };
  const provideDefaultComponent = (node) => {
    return isPortableTextToolkitList(node) ? $$List : isPortableTextListItemBlock(node) ? $$ListItem : isPortableTextToolkitSpan(node) ? $$Mark : isPortableTextBlock(node) ? $$Block : isPortableTextToolkitTextNode(node) ? $$HardBreak : $$UnknownType;
  };
  const provideUnknownComponent = (node) => {
    return isPortableTextToolkitList(node) ? components.unknownList : isPortableTextListItemBlock(node) ? components.unknownListItem : isPortableTextToolkitSpan(node) ? components.unknownMark : isPortableTextBlock(node) ? components.unknownBlock : !isPortableTextToolkitTextNode(node) ? components.unknownType : (() => {
      throw new Error(
        `[PortableText getUnknownComponent] Unable to provide component with node type ${node._type}`
      );
    })();
  };
  const blocks = Array.isArray(value) ? value : [value];
  function* renderBlocks() {
    let index = 0;
    for (const it of nestLists(blocks, listNestingMode)) {
      yield asComponentProps(it, index++, false);
    }
  }
  return renderTemplate`${[...renderBlocks()].map(function render(props) {
    const [Cmp, children] = prepareForRender(props);
    return !isComponent(Cmp) ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${Cmp}` })}` : renderTemplate`${renderComponent($$result, "Cmp", Cmp, { ...props }, { "default": ($$result2) => renderTemplate`${children.map(render)}` })}`;
  })}`;
}, "/Users/anj/Coding/woestudio/web/node_modules/astro-portabletext/components/PortableText.astro", void 0);

const $$Astro$7 = createAstro();
const $$PortableText = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$PortableText;
  const { data } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="styled-markdown"> ${renderComponent($$result, "PortableText", $$PortableText$1, { "value": data })} </div> `;
}, "/Users/anj/Coding/woestudio/web/src/components/utils/portableText.astro", void 0);

const $$Astro$6 = createAstro();
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Footer;
  const { data } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<footer class="footer__wrapper" data-astro-cid-k2f5zb5c> <div class="footer-content" data-astro-cid-k2f5zb5c> <div class="footer-content-title" data-astro-cid-k2f5zb5c> <div class="footer__flex wrap-contact" data-astro-cid-k2f5zb5c> <div class="footer-contact" data-astro-cid-k2f5zb5c> ${data.email && renderTemplate`<div class="footer-contact-email" data-astro-cid-k2f5zb5c> <h4 data-astro-cid-k2f5zb5c>Work with WOE</h4> <a${addAttribute(`mailto:${data.email}`, "href")} class="footer-link email"${addAttribute(data.email, "data-content")} data-astro-cid-k2f5zb5c> <h4 data-astro-cid-k2f5zb5c>${data.email}</h4> </a> </div>`} ${data.instagram && renderTemplate`<div class="footer-contact-item" data-astro-cid-k2f5zb5c> <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-k2f5zb5c> <path d="M1 0V13.2191H18" stroke="#EFEDED" data-astro-cid-k2f5zb5c></path> <path d="M14.9082 9.44238L17.9991 13.2212L14.9082 17.0001" stroke="#EFEDED" data-astro-cid-k2f5zb5c></path> </svg> <a${addAttribute(data.instagram, "href")} class="footer-link" target="_blank" rel="noreferrer" data-content="Instagram" data-astro-cid-k2f5zb5c> <h4 data-astro-cid-k2f5zb5c>Instagram</h4> </a> </div>`} ${data.tiktok && renderTemplate`<div class="footer-contact-item" data-astro-cid-k2f5zb5c> <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-k2f5zb5c> <path d="M1 0V13.2191H18" stroke="#EFEDED" data-astro-cid-k2f5zb5c></path> <path d="M14.9082 9.44238L17.9991 13.2212L14.9082 17.0001" stroke="#EFEDED" data-astro-cid-k2f5zb5c></path> </svg> <a${addAttribute(data.tiktok, "href")} class="footer-link" target="_blank" rel="noreferrer" data-content="Tik Tok" data-astro-cid-k2f5zb5c> <h4 data-astro-cid-k2f5zb5c>Tik Tok</h4> </a> </div>`} </div> </div> <div class="footer__flex" data-astro-cid-k2f5zb5c> <div class="footer-contact location" data-astro-cid-k2f5zb5c> ${data.address && renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-k2f5zb5c": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PortableText", $$PortableText, { "data": data.address, "data-astro-cid-k2f5zb5c": true })} <h4 class="legal" data-astro-cid-k2f5zb5c>© 2O24 legal</h4> ` })}`} </div> </div> </div> <div class="footer-logo" data-astro-cid-k2f5zb5c>${renderComponent($$result, "Logotype", $$Logotype, { "data-astro-cid-k2f5zb5c": true })}</div> </div> <div class="footer-bg-video" data-astro-cid-k2f5zb5c> <video preload="metadata" autoplay="true" loop="true" muted="true" playsinline data-astro-cid-k2f5zb5c> <source src="https://woe-branding-assets.s3.us-east-2.amazonaws.com/Colour+Clover+-+Mobile.mp4" type="video/mp4" media="(max-width: 992px)" data-astro-cid-k2f5zb5c> <source src="https://woe-branding-assets.s3.us-east-2.amazonaws.com/30fps+-+Spinning+Clove+Icon+-Cropped.mp4" type="video/mp4" data-astro-cid-k2f5zb5c>
Your browser does not support the video tag.
</video> </div> </footer> `;
}, "/Users/anj/Coding/woestudio/web/src/components/footer.astro", void 0);

const $$CornerTopLeft = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg class="corner corner-top-left" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M50.22 0C44.93 0 39.84 2.11 36.1 5.85L5.84 36.1C2.09 39.85 0 44.93 0 50.22V0H50.22Z" fill="var(--black)"></path> </svg>`;
}, "/Users/anj/Coding/woestudio/web/src/components/cornerPieces/cornerTopLeft.astro", void 0);

const $$CornerTopRight = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg class="corner corner-top-right" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M50.22 0C44.93 0 39.84 2.11 36.1 5.85L5.84 36.1C2.09 39.85 0 44.93 0 50.22V0H50.22Z" fill="var(--black)"></path> </svg>`;
}, "/Users/anj/Coding/woestudio/web/src/components/cornerPieces/cornerTopRight.astro", void 0);

const $$CornerBottomLeft = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg class="corner corner-bottom-left" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M50.22 0C44.93 0 39.84 2.11 36.1 5.85L5.84 36.1C2.09 39.85 0 44.93 0 50.22V0H50.22Z" fill="var(--black)"></path> </svg>`;
}, "/Users/anj/Coding/woestudio/web/src/components/cornerPieces/cornerBottomLeft.astro", void 0);

const $$CornerBottomRight = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg class="corner corner-bottom-right" width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M50.22 0C44.93 0 39.84 2.11 36.1 5.85L5.84 36.1C2.09 39.85 0 44.93 0 50.22V0H50.22Z" fill="var(--black)"></path> </svg>`;
}, "/Users/anj/Coding/woestudio/web/src/components/cornerPieces/cornerBottomRight.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$5 = createAstro();
const $$EpisodePlayer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$EpisodePlayer;
  const { episodeData } = Astro2.props;
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<div class="video-player" id="episodePlayer" data-astro-cid-rec2xo34> <div class="video-container" data-astro-cid-rec2xo34> ', ' <video class="episode-video" data-hover-text="Play video" id="episodeVideo"', "", "", " data-astro-cid-rec2xo34> <source", ' type="video/mp4" data-astro-cid-rec2xo34> </video> </div> ', " ", " </div> <script>(function(){", `
  const episodeSelect = document.getElementById("episode-select");
  const video = document.getElementById("episodeVideo");
  const subTitle = document.getElementById("episodeSubtitle");
  const title = document.getElementById("episodeTitle");
  const caret = document.getElementById("custom-select-caret");
  const episodeHeaderElements = document.querySelectorAll("#episodeHeader");
  const hoverAreaDiv = document.getElementById("hoverAreaDiv");

  let isOpen = false;
  let lastMouseMoveTime = 0;
  let isMouseMoving = false;
  let animationFrame;
  let isVideoPlaying = false;

  hoverAreaDiv.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior
    if (video.paused) {
      video.style.filter = "brightness(.5)";
      video.focus();
      video.play().catch((error) => console.error("Play failed:", error));
      video.play();
    } else {
      video.pause();
    }
    video.style.filter = "brightness(1)";
    video.setAttribute("controls", "controls");
    hoverAreaDiv.style.display = "none";
  });

  // Function to show headers
  const showHeaders = () => {
    episodeHeaderElements.forEach((el) => {
      el.style.opacity = "1";
      el.style.transition = "opacity 0.5s ease";
    });
  };

  // Function to hide headers
  const hideHeaders = () => {
    episodeHeaderElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transition = "opacity 0.5s ease";
    });
  };

  // Function to check mouse movement and update headers' visibility
  const checkMouseMovement = () => {
    if (!isVideoPlaying) {
      showHeaders();
      return;
    }

    if (isMouseMoving) {
      showHeaders();
      isMouseMoving = false;
    } else {
      const currentTime = Date.now();
      if (currentTime - lastMouseMoveTime > 1000) {
        hideHeaders();
      }
    }

    animationFrame = requestAnimationFrame(checkMouseMovement);
  };

  // Mouse movement handler
  const handleMouseMove = () => {
    lastMouseMoveTime = Date.now();
    isMouseMoving = true;
  };

  // Video play event listener
  video.addEventListener("play", () => {
    isVideoPlaying = true;
    hideHeaders();
    document.addEventListener("mousemove", handleMouseMove);
    animationFrame = requestAnimationFrame(checkMouseMovement);
  });

  // Video pause event listener
  video.addEventListener("pause", () => {
    isVideoPlaying = false;
    showHeaders();
    document.removeEventListener("mousemove", handleMouseMove);
    cancelAnimationFrame(animationFrame);
  });

  // Initial state when the page loads
  showHeaders();

  episodeSelect.addEventListener("change", (e) => {
    const selectedEpisode = episodeData[e.target.value];
    subTitle.innerText = selectedEpisode.episodeSubtitle;
    title.innerText = selectedEpisode.episodeTitle;
    video.src = selectedEpisode.episodeVideo;
    video.poster = selectedEpisode.thumbnail;
    video.load();
    video.focus();
    video.play(c);
  });

  // logic for custom select (dropdown) element
  document.addEventListener("DOMContentLoaded", function () {
    const customSelectWrapper = document.querySelector(
      ".custom-select-wrapper"
    );
    const customSelectDisplay = customSelectWrapper.querySelector(
      ".custom-select-display"
    );
    const customSelectOptions = customSelectWrapper.querySelector(
      ".custom-select-options"
    );
    const customSelect = customSelectWrapper.querySelector(".select-hidden");

    customSelectDisplay.addEventListener("click", function () {
      isOpen = !isOpen;
      caret.style.transform = isOpen ? "scaleY(-1)" : "scaleY(1)";

      if (isOpen) {
        // animate in
        customSelectOptions.style.clipPath = "inset(0% 0% 0% 0%)";
        customSelectOptions.style.opacity = "1";
      } else if (!isOpen) {
        // animate out
        customSelectOptions.style.clipPath = "inset(0% 0% 100% 0%)";
        customSelectOptions.style.opacity = "0";
      }
    });

    customSelectOptions.addEventListener("click", function (event) {
      if (event.target.tagName === "LI") {
        const value = event.target.getAttribute("data-value");
        customSelect.value = value;
        customSelectOptions.style.clipPath = "inset(0% 0% 100% 0%)";
        customSelectOptions.style.opacity = "0";

        isOpen = false; // Reset rotation state when an option is selected
        caret.style.transform = "scaleY(1)";
        customSelect.dispatchEvent(new Event("change")); // Trigger change event
      }
    });

    // hide the custom select when a user clicks anywhere else
    document.addEventListener("click", function (event) {
      if (!customSelectWrapper.contains(event.target)) {
        customSelectOptions.style.clipPath = "inset(0% 0% 100% 0%)";
        customSelectOptions.style.opacity = "0";
      }
    });
  });
})();<\/script> `])), maybeRenderHead(), episodeData.length >= 2 && renderTemplate`<div class="hover-area" id="hoverAreaDiv" data-astro-cid-rec2xo34></div>`, addAttribute(episodeData[0].thumbnail, "poster"), addAttribute(episodeData.length >= 2, "autoplay"), addAttribute(episodeData.length >= 2, "muted"), addAttribute(episodeData[0].episodeVideo, "src"), episodeData.length > 1 && renderTemplate`<div class="title" id="episodeHeader" data-astro-cid-rec2xo34> <h5 id="episodeSubtitle" data-astro-cid-rec2xo34>${episodeData[0].episodeSubtitle}</h5> <h3 id="episodeTitle" data-astro-cid-rec2xo34>${episodeData[0].episodeTitle}</h3> </div>`, episodeData.length > 1 && renderTemplate`<div class="custom-select-wrapper" id="episodeHeader" data-astro-cid-rec2xo34> <select class="select-hidden" id="episode-select" data-astro-cid-rec2xo34> ${episodeData.map((episode, i) => {
    return renderTemplate`<option${addAttribute(i, "value")} data-astro-cid-rec2xo34>${episode.episodeTitle}</option>`;
  })} </select> <div class="custom-select-display" data-astro-cid-rec2xo34> <p data-astro-cid-rec2xo34>View catalog</p> <svg id="custom-select-caret" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-rec2xo34> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7.06066L4.06066 6L9.53033 11.4697L15 6L16.0607 7.06066L9.53033 13.591L3 7.06066Z" fill="#EFEDED" data-astro-cid-rec2xo34></path> </svg> </div> <ul class="custom-select-options" data-astro-cid-rec2xo34> ${episodeData.map((episode, i) => {
    return renderTemplate`<li${addAttribute(i, "data-value")} data-astro-cid-rec2xo34> ${renderComponent($$result, "Image", $$Image, { "class": "custom-select-image", "src": episode.thumbnail, "alt": "", "width": "255", "height": "145", "quality": "70", "data-astro-cid-rec2xo34": true })} <small data-astro-cid-rec2xo34>${episode.episodeSubtitle}</small> <p data-astro-cid-rec2xo34>${episode.episodeTitle}</p> </li>`;
  })} </ul> </div>`, defineScriptVars({ episodeData }));
}, "/Users/anj/Coding/woestudio/web/src/components/projects/episodePlayer.astro", void 0);

const $$Astro$4 = createAstro();
const $$ProjectMedia = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$ProjectMedia;
  const { mediaArray } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div> ${mediaArray.map((entry) => {
    if (entry.nestedMediaArray.length > 1) {
      return renderTemplate`<section class="embla"> <div class="embla__viewport"> <div class="embla__container"> ${entry.nestedMediaArray.map((item) => {
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${(item.imageSrc || item.nestedVideo) !== null && renderTemplate`<div class="project-media-item__wrapper embla__slide"> ${item.imageSrc !== null ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "project-media-image", "src": item.imageSrc, "height": "1200", "width": "1920", "widths": [390, 720, 1080, item.imageSrc.width], "sizes": `(max-width: 576px) 390px, (max-width: 720px) 720px, (max-width: 1080px) 1080px, 1920px`, "quality": "80", "alt": "" })}` : renderTemplate`<video preload="metadata" autoplay="true" loop="true" muted="true" playsinline> <source type="video/mp4"${addAttribute(item.nestedVideo, "src")}> </video>`} </div>`}` })}`;
      })} </div> </div> <button class="embla__button embla__button--prev"></button> <button class="embla__button embla__button--next"></button> <div class="embla__controls"> <div class="embla__dots"></div> </div> </section>`;
    } else {
      return entry.nestedMediaArray.map((item, i) => {
        return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${(item.imageSrc || item.nestedVideo) !== null && renderTemplate`<div class="project-media-item__wrapper"> ${item.imageSrc !== null ? renderTemplate`${renderComponent($$result2, "Image", $$Image, { "class": "project-media-image", "src": item.imageSrc, "height": "1200", "width": "1920", "widths": [390, 720, 1080, item.imageSrc.width], "sizes": `(max-width: 576px) 390px, (max-width: 720px) 720px, (max-width: 1080px) 1080px, 1920px`, "quality": "100", "alt": "" })}` : renderTemplate`<video preload="metadata" autoplay="true" loop="true" muted="true" playsinline> <source type="video/mp4"${addAttribute(item.nestedVideo, "src")}> </video>`} </div>`}` })}`;
      });
    }
  })} </div>  `;
}, "/Users/anj/Coding/woestudio/web/src/components/projects/projectMedia.astro", void 0);

const $$Astro$3 = createAstro();
const $$NextProject = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$NextProject;
  const { nextProjectData } = Astro2.props;
  const data = nextProjectData.projects;
  return renderTemplate`${maybeRenderHead()}<a class="next-project-video__wrapper"${addAttribute(`/projects/${data.slug}`, "href")} data-astro-cid-g75eewat> <div class="sticky-gradient" data-astro-cid-g75eewat></div> <div class="project-video__inner" data-astro-cid-g75eewat> <div class="next-project-title" data-astro-cid-g75eewat> <p data-astro-cid-g75eewat>Next Project</p> <div class="project-title" data-astro-cid-g75eewat> <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-g75eewat> <path d="M1 0V13.2191H18" stroke="#EFEDED" data-astro-cid-g75eewat></path> <path d="M14.9082 9.44238L17.9991 13.2212L14.9082 17.0001" stroke="#EFEDED" data-astro-cid-g75eewat></path> </svg><h3 class="title-text" data-astro-cid-g75eewat>${data.title}</h3> </div> </div> <video class="next-project-media hover-area" data-hover-text="View project" preload="metadata" loop="true" muted="true" autoplay="true" playsinline data-astro-cid-g75eewat> <source${addAttribute(data.previewUrl, "src")} type="video/mp4" data-astro-cid-g75eewat>
Your browser does not support the video tag.
</video> <div class="view-project-background" data-astro-cid-g75eewat></div> </div> </a> `;
}, "/Users/anj/Coding/woestudio/web/src/components/projects/nextProject.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$2 = createAstro();
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$$1;
  const pages = await getProjectPageData();
  const settingsData = await getSiteSettings();
  const { slug } = Astro2.params;
  const page = pages.find((page2) => page2.slug === slug);
  if (!page)
    return Astro2.redirect("/404");
  const {
    title,
    awardArray,
    awardImageArray,
    clientArray,
    creditsArray,
    servicesArray,
    description,
    secondaryDescription,
    thumbnail,
    previewUrl,
    previewUrlMobile,
    video,
    episodeArray,
    mediaArray
  } = page;
  const currentProjectTitle = title;
  const nextProjectData = await getNextProject(currentProjectTitle);
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", " <script>(function(){", '\n  document.addEventListener("DOMContentLoaded", () => {\n    const shortVideo = document.getElementById("shortVideo");\n    const fullVideoExists = shortVideo.getAttribute(\n      "data-has-full-length-video"\n    );\n\n    // Function to toggle playsinline attribute\n    function togglePlaysinline() {\n      const isMobile =\n        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(\n          navigator.userAgent\n        );\n\n      if (isMobile) {\n        shortVideo.setAttribute("playsinline", "");\n      } else {\n        shortVideo.removeAttribute("playsinline");\n      }\n    }\n\n    // Call the function to set initial state\n    togglePlaysinline();\n\n    // Add resize listener to handle orientation changes\n    window.addEventListener("resize", togglePlaysinline);\n\n    // Detect Safari\n    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);\n\n    const windowWidth = window.innerWidth;\n\n    // Function to set the correct video source\n    function updateVideoSource() {\n      if (window.innerWidth != windowWidth) {\n        windowWidth = window.innerWidth;\n        if (isSafari) {\n          const isDesktop = window.innerWidth >= 992;\n          const source = document.createElement("source");\n          source.type = "video/mp4";\n          source.src = isDesktop ? previewUrl : previewUrlMobile || previewUrl;\n\n          // Remove existing sources\n          while (shortVideo.firstChild) {\n            shortVideo.removeChild(shortVideo.firstChild);\n          }\n\n          shortVideo.appendChild(source);\n          shortVideo.load();\n        }\n      }\n    }\n\n    // Call the function to set the initial source\n    updateVideoSource();\n\n    // Add resize listener to handle screen size changes\n    window.addEventListener("resize", updateVideoSource);\n\n    if (fullVideoExists !== "false") {\n      const fullVideo = document.getElementById("fullVideo");\n      shortVideo.addEventListener("click", () => {\n        // Hide the short video\n        shortVideo.style.display = "none";\n        // Show the full video\n        fullVideo.style.display = "block";\n        // Start playing the full video\n        fullVideo.play();\n      });\n\n      const playBtn = document.querySelector(".wrap-mobile-play-btn");\n      playBtn.addEventListener("click", () => {\n        fullVideo.play();\n      });\n    }\n  });\n})();<\/script> '])), renderComponent($$result, "Layout", $$Layout, { "data": settingsData, "data-astro-cid-jopjcynq": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTransition", $$PageTransition, { "data-astro-cid-jopjcynq": true })} ${maybeRenderHead()}<article class="page__wrapper" data-astro-cid-jopjcynq> <section class="main-video__wrapper" data-astro-cid-jopjcynq> <video${addAttribute(`main-video ${video && "hover-area"}`, "class")} data-hover-text="Play video" id="shortVideo" autoplay muted loop playsinline preload="auto"${addAttribute(`${video != null}`, "data-has-full-length-video")} data-astro-cid-jopjcynq> <source${addAttribute(previewUrl, "src")} type="video/mp4" media="(min-width: 992px)" data-astro-cid-jopjcynq> <source${addAttribute(previewUrlMobile || previewUrl, "src")} type="video/mp4" data-astro-cid-jopjcynq>
Your browser does not support the video tag.
</video> ${video && renderTemplate`<video class="main-video" id="fullVideo" controls data-astro-cid-jopjcynq> <source${addAttribute(video, "src")} type="video/mp4" data-astro-cid-jopjcynq>
Your browser does not support the video tag.
</video>`} <div class="main-video__mobile-title-wrapper" data-astro-cid-jopjcynq> <div class="main-video__mobile-title" data-astro-cid-jopjcynq> <h1 data-astro-cid-jopjcynq> ${title} </h1> ${clientArray != null && clientArray.reverse().map((client) => {
    return renderTemplate`<small data-astro-cid-jopjcynq>${client}</small>`;
  })} </div> ${video && renderTemplate`<div class="wrap-mobile-play-btn" data-astro-cid-jopjcynq> <div class="mobile-play-btn-invert" data-astro-cid-jopjcynq></div> <div class="mobile-play-btn" data-astro-cid-jopjcynq> <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-jopjcynq> <path d="M6 20.8783V3.73703C6 2.13964 7.78029 1.18686 9.1094 2.07294L21.9654 10.6436C23.1529 11.4352 23.1529 13.1802 21.9654 13.9718L9.1094 22.5425C7.78029 23.4285 6 22.4757 6 20.8783Z" fill="#EFEDED" data-astro-cid-jopjcynq></path> </svg> </div> </div>`} <!-- <svg
          class="arrow-svg"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="25" r="24" stroke="#EFEDED"></circle>
          <path
            d="M25 20V30.3333M25 30.3333L21 26.3333M25 30.3333L29 26.3333"
            stroke="#EFEDED"></path>
        </svg> --> </div> </section> <section class="project-details__wrapper" data-astro-cid-jopjcynq> <div class="project-details__flex" data-astro-cid-jopjcynq> <div class="project-details-left" data-astro-cid-jopjcynq> <div data-astro-cid-jopjcynq> <h1 data-astro-cid-jopjcynq>${title}</h1> ${clientArray != null && renderTemplate`<div class="project-details-item clients-item" data-astro-cid-jopjcynq> <p class="item-title item-small" data-astro-cid-jopjcynq> ${clientArray.length > 1 ? "Clients" : "Client"} </p> ${clientArray.reverse().map((client) => {
    return renderTemplate`<p class="item-small" data-astro-cid-jopjcynq>${client}</p>`;
  })} </div>`} </div> <div class="project-details-left-bottom" data-astro-cid-jopjcynq> ${awardArray != null && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-jopjcynq": true }, { "default": ($$result3) => renderTemplate` <p class="item-title item-small" data-astro-cid-jopjcynq>
Awards & Recognitions
 </p> <div class="project-details-item item-two-col" data-astro-cid-jopjcynq> ${awardArray.map((award) => {
    return renderTemplate`<p class="item-small" data-astro-cid-jopjcynq>${award}</p>`;
  })} </div> ` })}`} ${awardImageArray != null && renderTemplate`<div class="project-details-awards-images" data-astro-cid-jopjcynq> ${awardImageArray.map((award) => {
    return renderTemplate`${renderComponent($$result2, "Image", $$Image, { "quality": 25, "inferSize": true, "src": award.imageSrc, "alt": "Image of an award badge", "class": "award-image", "data-astro-cid-jopjcynq": true })}`;
  })} </div>`} </div> </div> <div class="project-details-right" data-astro-cid-jopjcynq> ${description != null && renderTemplate`<div class="project-details-overview" data-astro-cid-jopjcynq> <h5 data-astro-cid-jopjcynq>Project Overview</h5> <p class="project-details-overview-text" data-astro-cid-jopjcynq> ${renderComponent($$result2, "PortableText", $$PortableText, { "data": description, "data-astro-cid-jopjcynq": true })} </p> </div>`} <div class="project-details-credits" data-astro-cid-jopjcynq> ${servicesArray != null && renderTemplate`<div class="project-details-item" data-astro-cid-jopjcynq> <p class="item-title item-small" data-astro-cid-jopjcynq>Services</p> ${servicesArray.map((service) => {
    return renderTemplate`<p class="item-small" data-astro-cid-jopjcynq>${service}</p>`;
  })} </div>`} ${creditsArray != null && renderTemplate`<div class="project-details-item" data-astro-cid-jopjcynq> <p class="item-title item-small" data-astro-cid-jopjcynq>Credits</p> ${creditsArray.map((credit) => {
    return renderTemplate`<p class="item-small" data-astro-cid-jopjcynq>${credit}</p>`;
  })} </div>`} </div> <div class="project-details-mobile-awards" data-astro-cid-jopjcynq> ${awardArray != null && renderTemplate`<div class="project-details-mobile-awards-wrapper" data-astro-cid-jopjcynq> <p class="item-title item-small" data-astro-cid-jopjcynq>
Awards & Recognitions
 </p> <div class="project-details-item item-two-col" data-astro-cid-jopjcynq> ${awardArray.map((award) => {
    return renderTemplate`<p class="item-small" data-astro-cid-jopjcynq>${award}</p>`;
  })} </div> </div>`} ${awardImageArray != null && renderTemplate`<div class="project-details-awards-images" data-astro-cid-jopjcynq> ${awardImageArray.map((award) => {
    return renderTemplate`${renderComponent($$result2, "Image", $$Image, { "quality": 25, "inferSize": true, "src": award.imageSrc, "alt": "Image of an award badge", "class": "award-image", "data-astro-cid-jopjcynq": true })}`;
  })} </div>`} </div> </div> </div> </section> ${episodeArray != null && renderTemplate`<section class="episode__wrapper" data-astro-cid-jopjcynq> ${renderComponent($$result2, "EpisodePlayer", $$EpisodePlayer, { "episodeData": episodeArray, "data-astro-cid-jopjcynq": true })} </section>`} ${secondaryDescription != null && renderTemplate`<section class="project-overview__wrapper" data-astro-cid-jopjcynq> <div class="project-overview-text" data-astro-cid-jopjcynq> ${renderComponent($$result2, "PortableText", $$PortableText, { "data": secondaryDescription, "data-astro-cid-jopjcynq": true })} </div> </section>`} ${mediaArray !== null && renderTemplate`<section class="project-media__wrapper" data-astro-cid-jopjcynq> ${renderComponent($$result2, "CornerTopLeft", $$CornerTopLeft, { "data-astro-cid-jopjcynq": true })} ${renderComponent($$result2, "CornerTopRight", $$CornerTopRight, { "data-astro-cid-jopjcynq": true })} ${renderComponent($$result2, "CornerBottomLeft", $$CornerBottomLeft, { "data-astro-cid-jopjcynq": true })} ${renderComponent($$result2, "CornerBottomRight", $$CornerBottomRight, { "data-astro-cid-jopjcynq": true })} ${renderComponent($$result2, "ProjectMedia", $$ProjectMedia, { "mediaArray": mediaArray, "data-astro-cid-jopjcynq": true })} </section>`} <div class="woe-monogram__wrapper" data-astro-cid-jopjcynq> <video class="blend-video" playsinline muted autoplay loop${addAttribute(settingsData.logoVideo, "src")} data-astro-cid-jopjcynq></video> </div> ${nextProjectData !== null && renderTemplate`<section class="next-project" data-astro-cid-jopjcynq> ${renderComponent($$result2, "NextProject", $$NextProject, { "nextProjectData": nextProjectData, "data-astro-cid-jopjcynq": true })} </section>`} </article> ${renderComponent($$result2, "Footer", $$Footer, { "data": settingsData, "data-astro-cid-jopjcynq": true })} ` }), defineScriptVars({ previewUrl, previewUrlMobile }));
}, "/Users/anj/Coding/woestudio/web/src/pages/motion/[...slug].astro", void 0);

const $$file$1 = "/Users/anj/Coding/woestudio/web/src/pages/motion/[...slug].astro";
const $$url$1 = "/motion/[...slug]";

const ____slug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$$1,
  file: $$file$1,
  url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro();
const $$NextStills = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$NextStills;
  const { nextProjectData } = Astro2.props;
  const data = nextProjectData.stills;
  return renderTemplate`${maybeRenderHead()}<a class="next-project-video__wrapper"${addAttribute(`/stills/${data.slug}`, "href")} data-astro-cid-dz56qpt4> <div class="sticky-gradient" data-astro-cid-dz56qpt4></div> <div class="project-video__inner" data-astro-cid-dz56qpt4> <div class="next-project-title" data-astro-cid-dz56qpt4> <p data-astro-cid-dz56qpt4>Next Project</p> <div class="project-title" data-astro-cid-dz56qpt4> <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-dz56qpt4> <path d="M1 0V13.2191H18" stroke="#EFEDED" data-astro-cid-dz56qpt4></path> <path d="M14.9082 9.44238L17.9991 13.2212L14.9082 17.0001" stroke="#EFEDED" data-astro-cid-dz56qpt4></path> </svg><h3 class="title-text" data-astro-cid-dz56qpt4>${data.title}</h3> </div> </div> <video class="next-project-media hover-area" data-hover-text="View project" preload="metadata" loop="true" muted="true" autoplay="true" playsinline data-astro-cid-dz56qpt4> <source${addAttribute(data.previewUrl, "src")} type="video/mp4" data-astro-cid-dz56qpt4>
Your browser does not support the video tag.
</video> <div class="view-project-background" data-astro-cid-dz56qpt4></div> </div> </a> `;
}, "/Users/anj/Coding/woestudio/web/src/components/projects/nextStills.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const pages = await getStillsPageData();
  const settingsData = await getSiteSettings();
  const { slug } = Astro2.params;
  const page = pages.find((page2) => page2.slug === slug);
  if (!page)
    return Astro2.redirect("/404");
  const {
    title,
    awardArray,
    awardImageArray,
    clientArray,
    creditsArray,
    servicesArray,
    description,
    secondaryDescription,
    thumbnail,
    previewUrl,
    previewUrlMobile,
    video,
    episodeArray,
    mediaArray
  } = page;
  const currentStillsTitle = title;
  const nextProjectData = await getNextStills(currentStillsTitle);
  return renderTemplate(_a || (_a = __template(["", " <script>(function(){", '\n  document.addEventListener("DOMContentLoaded", () => {\n    const shortVideo = document.getElementById("shortVideo");\n    const fullVideoExists = shortVideo.getAttribute(\n      "data-has-full-length-video"\n    );\n\n    // Function to toggle playsinline attribute\n    function togglePlaysinline() {\n      const isMobile =\n        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(\n          navigator.userAgent\n        );\n\n      if (isMobile) {\n        shortVideo.setAttribute("playsinline", "");\n      } else {\n        shortVideo.removeAttribute("playsinline");\n      }\n    }\n\n    // Call the function to set initial state\n    togglePlaysinline();\n\n    // Add resize listener to handle orientation changes\n    window.addEventListener("resize", togglePlaysinline);\n\n    // Detect Safari\n    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);\n\n    const windowWidth = window.innerWidth;\n\n    // Function to set the correct video source\n    function updateVideoSource() {\n      if (window.innerWidth != windowWidth) {\n        windowWidth = window.innerWidth;\n        if (isSafari) {\n          const isDesktop = window.innerWidth >= 992;\n          const source = document.createElement("source");\n          source.type = "video/mp4";\n          source.src = isDesktop ? previewUrl : previewUrlMobile || previewUrl;\n\n          // Remove existing sources\n          while (shortVideo.firstChild) {\n            shortVideo.removeChild(shortVideo.firstChild);\n          }\n\n          shortVideo.appendChild(source);\n          shortVideo.load();\n        }\n      }\n    }\n\n    // Call the function to set the initial source\n    updateVideoSource();\n\n    // Add resize listener to handle screen size changes\n    window.addEventListener("resize", updateVideoSource);\n\n    if (fullVideoExists !== "false") {\n      const fullVideo = document.getElementById("fullVideo");\n      shortVideo.addEventListener("click", () => {\n        // Hide the short video\n        shortVideo.style.display = "none";\n        // Show the full video\n        fullVideo.style.display = "block";\n        // Start playing the full video\n        fullVideo.play();\n      });\n\n      const playBtn = document.querySelector(".wrap-mobile-play-btn");\n      playBtn.addEventListener("click", () => {\n        fullVideo.play();\n      });\n    }\n  });\n})();<\/script> '])), renderComponent($$result, "Layout", $$Layout, { "data": settingsData, "data-astro-cid-74pcsjqr": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "PageTransition", $$PageTransition, { "data-astro-cid-74pcsjqr": true })} ${maybeRenderHead()}<article class="page__wrapper" data-astro-cid-74pcsjqr> <section class="main-video__wrapper" data-astro-cid-74pcsjqr> <video${addAttribute(`main-video ${video && "hover-area"}`, "class")} data-hover-text="Play video" id="shortVideo" autoplay muted loop playsinline preload="auto"${addAttribute(`${video != null}`, "data-has-full-length-video")} data-astro-cid-74pcsjqr> <source${addAttribute(previewUrl, "src")} type="video/mp4" media="(min-width: 992px)" data-astro-cid-74pcsjqr> <source${addAttribute(previewUrlMobile || previewUrl, "src")} type="video/mp4" data-astro-cid-74pcsjqr>
Your browser does not support the video tag.
</video> ${video && renderTemplate`<video class="main-video" id="fullVideo" controls data-astro-cid-74pcsjqr> <source${addAttribute(video, "src")} type="video/mp4" data-astro-cid-74pcsjqr>
Your browser does not support the video tag.
</video>`} <div class="main-video__mobile-title-wrapper" data-astro-cid-74pcsjqr> <div class="main-video__mobile-title" data-astro-cid-74pcsjqr> <h1 data-astro-cid-74pcsjqr> ${title} </h1> ${clientArray != null && clientArray.reverse().map((client) => {
    return renderTemplate`<small data-astro-cid-74pcsjqr>${client}</small>`;
  })} </div> ${video && renderTemplate`<div class="wrap-mobile-play-btn" data-astro-cid-74pcsjqr> <div class="mobile-play-btn-invert" data-astro-cid-74pcsjqr></div> <div class="mobile-play-btn" data-astro-cid-74pcsjqr> <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" data-astro-cid-74pcsjqr> <path d="M6 20.8783V3.73703C6 2.13964 7.78029 1.18686 9.1094 2.07294L21.9654 10.6436C23.1529 11.4352 23.1529 13.1802 21.9654 13.9718L9.1094 22.5425C7.78029 23.4285 6 22.4757 6 20.8783Z" fill="#EFEDED" data-astro-cid-74pcsjqr></path> </svg> </div> </div>`} <!-- <svg
          class="arrow-svg"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="25" cy="25" r="24" stroke="#EFEDED"></circle>
          <path
            d="M25 20V30.3333M25 30.3333L21 26.3333M25 30.3333L29 26.3333"
            stroke="#EFEDED"></path>
        </svg> --> </div> </section> <section class="project-details__wrapper" data-astro-cid-74pcsjqr> <div class="project-details__flex" data-astro-cid-74pcsjqr> <div class="project-details-left" data-astro-cid-74pcsjqr> <div data-astro-cid-74pcsjqr> <h1 data-astro-cid-74pcsjqr>${title}</h1> ${clientArray != null && renderTemplate`<div class="project-details-item clients-item" data-astro-cid-74pcsjqr> <p class="item-title item-small" data-astro-cid-74pcsjqr> ${clientArray.length > 1 ? "Clients" : "Client"} </p> ${clientArray.reverse().map((client) => {
    return renderTemplate`<p class="item-small" data-astro-cid-74pcsjqr>${client}</p>`;
  })} </div>`} </div> <div class="project-details-left-bottom" data-astro-cid-74pcsjqr> ${awardArray != null && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-74pcsjqr": true }, { "default": ($$result3) => renderTemplate` <p class="item-title item-small" data-astro-cid-74pcsjqr>
Awards & Recognitions
 </p> <div class="project-details-item item-two-col" data-astro-cid-74pcsjqr> ${awardArray.map((award) => {
    return renderTemplate`<p class="item-small" data-astro-cid-74pcsjqr>${award}</p>`;
  })} </div> ` })}`} ${awardImageArray != null && renderTemplate`<div class="project-details-awards-images" data-astro-cid-74pcsjqr> ${awardImageArray.map((award) => {
    return renderTemplate`${renderComponent($$result2, "Image", $$Image, { "quality": 25, "inferSize": true, "src": award.imageSrc, "alt": "Image of an award badge", "class": "award-image", "data-astro-cid-74pcsjqr": true })}`;
  })} </div>`} </div> </div> <div class="project-details-right" data-astro-cid-74pcsjqr> ${description != null && renderTemplate`<div class="project-details-overview" data-astro-cid-74pcsjqr> <h5 data-astro-cid-74pcsjqr>Project Overview</h5> <p class="project-details-overview-text" data-astro-cid-74pcsjqr> ${renderComponent($$result2, "PortableText", $$PortableText, { "data": description, "data-astro-cid-74pcsjqr": true })} </p> </div>`} <div class="project-details-credits" data-astro-cid-74pcsjqr> ${servicesArray != null && renderTemplate`<div class="project-details-item" data-astro-cid-74pcsjqr> <p class="item-title item-small" data-astro-cid-74pcsjqr>Services</p> ${servicesArray.map((service) => {
    return renderTemplate`<p class="item-small" data-astro-cid-74pcsjqr>${service}</p>`;
  })} </div>`} ${creditsArray != null && renderTemplate`<div class="project-details-item" data-astro-cid-74pcsjqr> <p class="item-title item-small" data-astro-cid-74pcsjqr>Credits</p> ${creditsArray.map((credit) => {
    return renderTemplate`<p class="item-small" data-astro-cid-74pcsjqr>${credit}</p>`;
  })} </div>`} </div> <div class="project-details-mobile-awards" data-astro-cid-74pcsjqr> ${awardArray != null && renderTemplate`<div class="project-details-mobile-awards-wrapper" data-astro-cid-74pcsjqr> <p class="item-title item-small" data-astro-cid-74pcsjqr>
Awards & Recognitions
 </p> <div class="project-details-item item-two-col" data-astro-cid-74pcsjqr> ${awardArray.map((award) => {
    return renderTemplate`<p class="item-small" data-astro-cid-74pcsjqr>${award}</p>`;
  })} </div> </div>`} ${awardImageArray != null && renderTemplate`<div class="project-details-awards-images" data-astro-cid-74pcsjqr> ${awardImageArray.map((award) => {
    return renderTemplate`${renderComponent($$result2, "Image", $$Image, { "quality": 25, "inferSize": true, "src": award.imageSrc, "alt": "Image of an award badge", "class": "award-image", "data-astro-cid-74pcsjqr": true })}`;
  })} </div>`} </div> </div> </div> </section> ${episodeArray != null && renderTemplate`<section class="episode__wrapper" data-astro-cid-74pcsjqr> ${renderComponent($$result2, "EpisodePlayer", $$EpisodePlayer, { "episodeData": episodeArray, "data-astro-cid-74pcsjqr": true })} </section>`} ${secondaryDescription != null && renderTemplate`<section class="project-overview__wrapper" data-astro-cid-74pcsjqr> <div class="project-overview-text" data-astro-cid-74pcsjqr> ${renderComponent($$result2, "PortableText", $$PortableText, { "data": secondaryDescription, "data-astro-cid-74pcsjqr": true })} </div> </section>`} ${mediaArray !== null && renderTemplate`<section class="project-media__wrapper" data-astro-cid-74pcsjqr> ${renderComponent($$result2, "CornerTopLeft", $$CornerTopLeft, { "data-astro-cid-74pcsjqr": true })} ${renderComponent($$result2, "CornerTopRight", $$CornerTopRight, { "data-astro-cid-74pcsjqr": true })} ${renderComponent($$result2, "CornerBottomLeft", $$CornerBottomLeft, { "data-astro-cid-74pcsjqr": true })} ${renderComponent($$result2, "CornerBottomRight", $$CornerBottomRight, { "data-astro-cid-74pcsjqr": true })} ${renderComponent($$result2, "ProjectMedia", $$ProjectMedia, { "mediaArray": mediaArray, "data-astro-cid-74pcsjqr": true })} </section>`} <div class="woe-monogram__wrapper" data-astro-cid-74pcsjqr> <video class="blend-video" playsinline muted autoplay loop${addAttribute(settingsData.logoVideo, "src")} data-astro-cid-74pcsjqr></video> </div> ${nextProjectData !== null && renderTemplate`<section class="next-project" data-astro-cid-74pcsjqr> ${renderComponent($$result2, "NextStills", $$NextStills, { "nextProjectData": nextProjectData, "data-astro-cid-74pcsjqr": true })} </section>`} </article> ${renderComponent($$result2, "Footer", $$Footer, { "data": settingsData, "data-astro-cid-74pcsjqr": true })} ` }), defineScriptVars({ previewUrl, previewUrlMobile }));
}, "/Users/anj/Coding/woestudio/web/src/pages/stills/[...slug].astro", void 0);

const $$file = "/Users/anj/Coding/woestudio/web/src/pages/stills/[...slug].astro";
const $$url = "/stills/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Footer as $, ____slug_$1 as _, $$CornerTopLeft as a, $$CornerTopRight as b, $$CornerBottomLeft as c, $$CornerBottomRight as d, ____slug_ as e };
