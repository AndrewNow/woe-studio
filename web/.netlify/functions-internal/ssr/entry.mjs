import { renderers } from './renderers.mjs';
import { manifest } from './manifest_CashYVgy.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DzZr3ELy.mjs');
const _page1 = () => import('./chunks/404_D6PPnlVg.mjs');
const _page2 = () => import('./chunks/about_VV2in0oI.mjs');
const _page3 = () => import('./chunks/index_DF0fz27I.mjs');
const _page4 = () => import('./chunks/_.._Sdgq0R8C.mjs');
const _page5 = () => import('./chunks/index_D5cIgBQX.mjs');
const _page6 = () => import('./chunks/_.._BuwkWBM1.mjs');
const _page7 = () => import('./chunks/index_Dfxleqf_.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/motion/index.astro", _page3],
    ["src/pages/motion/[...slug].astro", _page4],
    ["src/pages/stills/index.astro", _page5],
    ["src/pages/stills/[...slug].astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "a3be7da2-a0f6-4c31-b03a-cbb9ebd8c43e"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
