/**
 * Favicon assets for Cloudflare Link Redirect & Analytics.
 * Incorporates the Chronicle pressmark symbol (§) with a directional edge redirect arrow.
 */

export const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#181B22"/>
      <stop offset="100%" stop-color="#121418"/>
    </linearGradient>
    <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#537791"/>
      <stop offset="100%" stop-color="#8AB4D6"/>
    </linearGradient>
  </defs>
  <style>
    @media (prefers-color-scheme: light) {
      .bg-rect { fill: url(#bgGrad); }
      .pressmark-char { fill: #FBF9F6; }
    }
    @media (prefers-color-scheme: dark) {
      .bg-rect { fill: #121418; }
      .pressmark-char { fill: #E8ECF1; }
    }
  </style>
  <rect class="bg-rect" width="64" height="64" rx="16" fill="url(#bgGrad)"/>
  <rect x="1" y="1" width="62" height="62" rx="15" fill="none" stroke="rgba(255,255,255,0.14)" stroke-width="1.5"/>
  <!-- Pressmark Section Symbol § -->
  <text class="pressmark-char" x="26" y="47" font-family="'Noto Serif SC', 'Songti SC', Georgia, 'Times New Roman', serif" font-size="44" font-weight="900" fill="#FBF9F6" text-anchor="middle">§</text>
  <!-- Sleek Redirect Arrow -->
  <path d="M41 24 L52 13 M52 13 H43 M52 13 V22" fill="none" stroke="url(#arrowGrad)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export const FAVICON_PNG_BASE64 = `iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAEvUlEQVRYhb2X+0+bVRjH31+cfwC2pZQCvdDL2763XqkKY+UyyabbxKmbKJsbZhPdom7CNOoyo4ZbAnHYrWAGiXH84IiGRURgLDPi4uUHdRGm2/CCcwN0yGVOnfmac4CXlrYUmoWTfEN6EvL5vs95nuech2EWrEybKHCiNyC5fYOC5JsWpCwIkjdc4rx40RND7ll5pkVH1qBNcAVMJjvPxFpGo/F2TnA3iw7ff/pMG9SpBqhSdFClZIRLPS+lOj26ktPCRP4vw2Alhm7aeGeQYdlVEXBJ8n1iZqVZqO6WwRWytFQmCwdedJ4JM8EJ3rdXAi6bMHOwcc6j8pmTsK8UXKGaETkOs5njGJJw5MyXA9ekGWLCfUVbsLvuOPa++T72HfkQlc3dePFYL8qr3oFWZ5ENZOjNsPPORkZy3Xl+KQlHfj9fcQCXLnyPf/++jpErl9HY+BY0WkOYgdKDQTzX9DEqW0/jpXf7cei9r/DGB9+i+uR3WL2hdNZAKlTqNAiSZ4ARHVlTS/nymppa/DU9gf0VlbDaRbS2tFIjZD807O6CB7D91WY8VX8iwsSa+3dQONEdqlRwomuSIXUeD072RkeuIBA4Ioe9s7OTGmg51hJx5qkGFqUHmyIikbtpmwwnsgtOMKSxxDvzdL2FwuobGuQzvzvHj/r6BtjsUgT84QMN2F1/AnsaO/DM0U7ZRM6Gx2R4dAPq2Nn+2+VhjI1ehcPli5ntGp0Z9+15HaWvtWJn9XGUvBxAbnGZHIm71peEG+AdIQbilFptbR2Nwo9DF5FfUBS11PIefRabXziMra8EUby/FloDC4szB3sbO7Av2AWb1z9vQKkJMaCOX+fZq/MwMf47NUGSsbqmFilafViNEwPFFQ1YV34IqTqrnHBmRzasrpww+LwB0RsXvsZfiD+vjeHcN1+jqakZN65PUiNn+z+F0cTKBtRaIyweP/0bmu1hmoVHGFAu0uGCwSb8c2MaZitPQ77u3k24dPEHaqKv7xSU6jS5wczVeTx4mAFlnPZaVVVNYVXVNXSffK3BZEVvTzfd37hx87LhsgFe9MTt7aLowfgfoxR2sqMDJoudmtiytYTuPVn+9LLhixtIjrxYHnzoEUxNXKPAoaELKHtiFw3/r8M/0yt2uXAiGy9FMbDIrZbrL8TgwDlqgujLLz6nfSEReJIyJYqB5PhXaobBgvb2dmpg+JefkEmqIAE4NcCFGljGfa7W6NB3qpeaqKurSwiepAg1kBwfvv3xnSgr2yVne37BPdRAT093QvAQA+64cI8vm/YBIq8vh4bczknUQFtbW0LwqAYUMcJuYQVMT45jbOQqJKcX/ry16Or6iO7lFxYlBJ8xIJK7wD25lDdc6bYdtOTmKuDsZ/1YW7Q+YXiSQk36wAR5EZ0nt+Fi8LBnlOimXTDRsM/BFSoNON45wJCJhQwN8eCJllo0OFG6LhM2u3iYIeMSeSKvJHwm/NJNvd7M0dmAjEu0na4Q3GiywmITAvOzGcuu4iXXGTKxrASc5aTTDMPcFj6dsuwqMi6R4yBDA0m4WwUnCUfOnIR99ssXwEMWGZfIxEKGBrvomiIvVyreEVPkUqHiFkqEjXNM8YJrgCScfOYh63/4KQHpnbm6ogAAAABJRU5ErkJggg==`;

let cachedBuffer: ArrayBuffer | null = null;

export function getFaviconPngBuffer(): ArrayBuffer {
  if (!cachedBuffer) {
    const binaryStr = atob(FAVICON_PNG_BASE64);
    const len = binaryStr.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }
    cachedBuffer = bytes.buffer as ArrayBuffer;
  }
  return cachedBuffer;
}

export function getFaviconPngBytes(): Uint8Array {
  return new Uint8Array(getFaviconPngBuffer());
}
