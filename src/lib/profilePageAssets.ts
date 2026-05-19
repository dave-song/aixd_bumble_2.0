const PROFILE_PAGE_ASSETS = "/icons/profile_page_assets";

function assetPath(filename: string) {
  return `${PROFILE_PAGE_ASSETS}/${encodeURIComponent(filename)}`;
}

/** Full-bleed profile hero (includes overlays) — 820×756 */
export const USER_PROFILE_HERO_SRC = assetPath("user_profile_high_res.png");

/** Insight cards — 398×481 SVGs with baked-in shadows */
export const INSIGHT_CARD_REVEAL_SRC = assetPath("insights card reveal.svg");
export const INSIGHT_CARD_1_SRC = assetPath("insights card 1.svg");
export const INSIGHT_CARD_2_SRC = assetPath("insights card 2.svg");
export const INSIGHT_CARD_3_SRC = assetPath("insights card 3.svg");

/** Figma artboard: 374×457 visible card, 18px gap, 10px horizontal inset */
export const PROFILE_INSIGHT_CARD_WIDTH_PX = 374;
export const PROFILE_INSIGHT_CARD_HEIGHT_PX = 457;
export const PROFILE_INSIGHT_CARD_GAP_PX = 18;

/** SVG export size (includes drop-shadow padding) */
export const PROFILE_INSIGHT_SVG_WIDTH_PX = 398;
export const PROFILE_INSIGHT_SVG_HEIGHT_PX = 481;

/** Lock icon in “Between us only” row — SVG coords (emoji not reliable inside <img>) */
export const PROFILE_INSIGHT_LOCK_SVG_X = 42;
export const PROFILE_INSIGHT_LOCK_SVG_Y = 338;
export const PROFILE_INSIGHT_LOCK_SIZE_PX = 14;
