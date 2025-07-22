export { renderers } from '../renderers.mjs';

const page = () => import('./pages/index_Cxn_MASU.mjs').then(n => n.a);

export { page };
