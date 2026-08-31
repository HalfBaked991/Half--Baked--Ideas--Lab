# Half Baked Ideas Lab — GitHub Pages Starter

This is the first working static-app build for Half Baked Ideas Lab.

## Included
- Neon dark/pink/cyan/yellow visual system based on the supplied logo
- Home screen with the logo front and center
- How It Works
- Exact five-part Ideas Recipe flow:
  1. IDEA — What are we cooking?
  2. THE WHY — Why does this idea matter?
  3. WHO'S HUNGRY — Who might actually want this?
  4. THE GOOD STUFF — What's already working?
  5. THE SOGGY PARTS — What needs work?
- Review-before-submit screen
- 3–7 business-day messaging
- Customer review form
- Cash App / PayPal buttons ready for your real links
- Contact / text screen
- EmailJS hooks for Ideas Recipes, reviews, and contact messages
- Mobile-first layout

## GitHub Pages
1. Create a GitHub repository.
2. Upload all files/folders in this project.
3. In GitHub, open Settings → Pages.
4. Choose "Deploy from a branch".
5. Select the main branch and the root folder.
6. Save.
7. GitHub will provide the site's `github.io` address.

## EmailJS
The browser SDK is already included in `index.html`.

Open `config.js` and replace:
- YOUR_PUBLIC_KEY
- YOUR_SERVICE_ID
- YOUR_IDEAS_RECIPE_TEMPLATE_ID
- YOUR_REVIEW_TEMPLATE_ID
- YOUR_CONTACT_TEMPLATE_ID

EmailJS supports browser initialization and `emailjs.send()` / `sendForm()` for sending form data without a custom backend.

Recommended Ideas Recipe template variables:
- form_type
- customer_name
- customer_email
- idea
- why
- hungry
- good_stuff
- soggy_parts
- submitted_at

Recommended Review template variables:
- form_type
- customer_name
- rating
- review
- submitted_at

Recommended Contact template variables:
- form_type
- customer_name
- customer_email
- message
- submitted_at

## Donations
Open `config.js` and add:
- CASH_APP_URL
- PAYPAL_URL

Do not put private payment credentials in this file.

## Business contact
Email: Halfbakedideaslab@gmail.com
Text only: (575) 707-2480
