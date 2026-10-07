# mikelwashington.com

Static rebuild of the WordPress portfolio, hosted on Cloudflare Pages and edited with Pages CMS.

- Build: `npm run build` (output in `_site/`). Cloudflare Pages settings: build command `npm run build`, output directory `_site`.
- Edit content: sign in at https://app.pagescms.org with GitHub and open this repository. Settings live in `.pages.yml`.
- Old WordPress addresses are kept: projects keep their `/work/YYYY/MM/DD/slug/` addresses and images keep their `/work/wp-content/uploads/...` paths. `src/static/_redirects` sends `/` to `/work/`.
- `npm run fetch-images` copies images from the old site once, before HostGator is cancelled.
- No passwords or API keys belong in this repository.
