# Kem Enon — Portfolio

Static rebuild of the Framer site (kemenon.framer.website), hosted on GitHub Pages.

## Structure
- `index.html` — home (hero, selected works, process, contact, about, footer)
- `portfolio/index.html` — all projects
- `portfolio/<project>/index.html` — case studies
- `assets/css/style.css` — all styles (colors and fonts are at the top as CSS variables)
- `assets/js/main.js` — mobile menu, scroll reveal, hero parallax, contact form
- `assets/img/` — images (`work/` holds project images, `icons/` the skill icons)

## Editing
Open any `.html` file in a text editor, change the text, commit and push. GitHub Pages republishes in about a minute.
To add a project, copy one folder in `portfolio/`, swap its text and images, and add a card to `index.html` and `portfolio/index.html`.

## Contact form
The form sends through FormSubmit (formsubmit.co) to kem.malon@gmail.com. The first submission triggers a one-time confirmation email; click the link in it to activate the form.
