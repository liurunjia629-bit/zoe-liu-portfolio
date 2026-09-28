# Zoe Liu — Design Portfolio

Five projects: CONNECT, HUIQIAO, FutureVision, Food Pantone, The Waiting Room.

Static website files are in `dist/`. Internal links and asset URLs use relative paths.
GitHub Pages is deployed by `.github/workflows/deploy-pages.yml` on pushes to `main`.
Set Settings → Pages → Build and deployment → Source to **GitHub Actions**.

For later changes, edit the files in `dist/`, commit and push to `main`.

The original FutureVision PPTX is larger than GitHub's individual Git file limit.
It is stored losslessly in `large-assets/xpeng-source/part-*`; the workflow restores
it at the original download URL and validates its SHA-256 before publication.
Do not remove the parts or rename the original download path.

Interactive pages are portfolio prototypes. They do not connect to real delivery,
recruitment, payment or health services. Waiting Room records remain in local storage.
