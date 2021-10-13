# Atomix Website

**Authors:**

Mauro Colella - mauro.ludovico.colella@gmail.com

**First created:**

Wed Jan 20, 2021

## Table of Contents

* [Project Goals](#project-goals)

  * [Motivation](#motivation)

* [CMS (Storyblok)](#cms-(storyblok))

  * [Website](#website)
  * [Company](#company)
  * [Product](#product)
  * [Features](#features)
  * [Pricing](#pricing)
  * [Limitations](#limitations)

  * [Alternatives](#alternatives)
  * [Additional Considerations](#additional-considerations)

* [Integration (Next.js)](#integration-(next.js))
* [Features](#features-1)
  * [Deployment](#deployment)
  * [Structure](#structure)
  * [Notes](#notes)
  * [Considerations](#considerations)



## Project Goals

The project's goal is to develop a custom integration of Next.JS with the Storyblok headless CMS.

The dependencies are:

* to select a modern CMS that is easy to use, and has near feature-parity with WordPress.
* to create content types, custom inputs and tooling that make it possible to quickly deploy new solutions using the CMS of choice.
* to create a performant, standards-compliant front-end using a Jamstack framework, in order to integrate with the CMS.

### Motivation

WordPress has established the template for flexible content management on the internet. It is widely used and has a rich and vibrant ecosystem. Custom solutions using WordPress, however, may require significant maintenance. Security and scalability could also become bottlenecks, and they might require additional planning, or frequent intervention.

For this project, we set out to select a headless CMS that can help us offset these concerns; while offering a solid foundation on par with, or close to the core functionality of WordPress.

With a managed headless CMS, it is assumed that the vendor will take responsibility for the security, scalability, performance and maintenance of the system's back-end. The only responsibilities kept within the internal team are with the development and the maintenance of any desired front-end, or interactive solution.

Initial tradeoffs of this approach could include:

* a smaller plugin ecosystem. 
* more limited options for customization.

However, some of the options we've reviewed still offer a number of avenues for customization, such as custom input fields via plugins, and apps to enable integration with third party providers and solutions.

In order to select a platform that would cover our requirements as well as those of our clients, we've conducted a hands-on review of some of the prominent actors of the headless CMS marketspace.

As of this writing, we've selected Storyblok as our headless, managed CMS solution.



## CMS (Storyblok)

### Website

https://www.storyblok.com/

### Company

Storyblok is a headless CMS company headquartered in Europe, Austria. Their content management platform uses an infrastructure based on AWS, which makes apparent and prominent use of Vue.js for the front-end.

More information about the company can be found at:

* https://at.linkedin.com/company/storyblok
* https://craft.co/storyblok

### Product

Storyblok, as a product, is a managed headless CMS which combines flexible features, accessible pricing, a marketplace of extensions, and rich documentation. With also a thriving community, and several open channels for interaction with the team, such as feature requests or bug reports.

### Features

* **Visual Editor.** Content can be edited online with instant preview.
* **Preview urls.** Multiple preview urls can be configured for content editing, for example local, development, and staging.
* **Flexible content.** Customizable content "bloks" can be used as templates for content sections (cards, asides), content types (pages, posts), or flexible content modules (page sections).
* **Custom input fields**
* **Content workflows (content staging)*** (Available within the premium tier)
* **Internationalization*** (Some restrictions with the free and basic tiers)
* **Unlimited content versioning and rollback**
* **Activity logs**
* **Per-field access control (ACLs)*** (Some restrictions with the free and basic tiers)
* **Content delivery API:**
  * With GraphQL
  * With the Storyblok client
* **Management API.** Using REST.
* **Optional backups (s3)* **(Available with the advanced and premium tiers)
* **Image resizing**
* **Content and component migrations** via CLI.
* **Support for multiple languages and frameworks**

### Pricing

As of this writing, Storyblok comes in four tiers, at zero, seven, twelve and twenty-one dollars per month and per seat. Most features are available within the free and basic tiers, with 1TB of fair-use traffic per month available across all tiers. 

https://www.storyblok.com/pricing

### Limitations

* The API enforces some strict but comfortable limits. See [summary of API limits.](https://www.storyblok.com/docs/technical-limits)
* It isn't possible, as of this writing, to automate the creation of plugins using the management api. The code for private plugins must be copied and pasted manually from a local source. Once a plugin has been registered with an organization, however, it becomes available across all the content spaces associated with the organization.

### Alternatives

| Platform       | Website                     | Notes                                                        |
| -------------- | --------------------------- | ------------------------------------------------------------ |
| **Strapi**     | https://strapi.io/          | On the paper, Strapi appears promising. <br />Early testing however has showed some instabilities, <br />and other reviewers have also noted issues. |
| **Sanity**     | https://www.sanity.io/      | Sanity is known for its versatility and extensibility<br />at the cost of an increased maintenance workload.<br />A development toolkit more than a CMS, Sanity could prove<br />impractical for small to middle-size projects. |
| **Prismic**    | https://prismic.io/         | Prismic appears to have near feature-parity with Storyblok. However:<br />* Support was moderately responsive during early testing.<br />* At the time of this writing, custom input fields are not supported at all.<br />* No ETA was given for the implementation of custom input fields.<br />* Technical issues were encountered during testing. |
| **Contentful** | https://www.contentful.com/ | Contentful seems robust and well-rounded, with enterprise-grade<br />features that are reported to match or exceed those offered by Storyblok.<br />Costs however quickly escalate to reach $489 per month for two seats<br />within the medium feature tier.<br /> |

An in-depth comparison of managed CMS solutions is also available as an article from developer Bejamas.

See [10 Headless CMS Options for your Jamstack Website.](https://bejamas.io/blog/headless-cms/)


### Additional Considerations

The headless CMS space is young. Contentful was founded in 2013 with prominent Jamstack framework Gatsby emerging in 2015, followed by Next.JS in 2016. Storyblok was released in August of the same year, and many related companies are still evolving at startup speeds today, with some having secured initial investor funding as recently as 2019 - two years ago.

This indicates that interest in, and adoption of both headless CMS's and Jamstack methods is growing. As of 2021, there is significant room for evolution in the functionality and pricing of relevant platforms, and it is therefore advised to keep monitoring the progress of prominent providers in the marketspace.

For this reason care should be taken to design solutions that are as agnostic as they can be in regard to each specific provider. 

One should identify common, foundational features, and implement flexible support for differing APIs inside of their front-end solutions. Such features include content retrieval, with differing clients whose output should be adapted to routing expectations, or content rendering, where each platform exposes something akin to flexible content modules, but the shapes of the modules differ.

With this considered, within the scope of this project we've focused exclusively on Storyblok, while leaving the door open for future transitions.



## Integration (Next.js)

### Features

* Universal "Isomorphic" App (renders on the server and on the client).
* Flexible components (content slices).
* Integration with [Storybook.](https://storybook.js.org/docs/react/get-started/introduction)
* Uses [SASS](https://sass-lang.com/documentation) / BEM
  * Find out more [about BEM.](http://getbem.com/introduction/)
* Jamstack (Next) with [Incremental Static Regeneration.](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration)
* Code-splitting w/lazy loading (`next/dynamic`)
* Dynamic image resizing (`next/image`)
* Configurable pub/sub for global browser events:
  * Custom middleware.
  * Uses Redux with dynamic reducer injection (boilerplate kept to a minimum)
* High-resolution timing.
* Dynamic routing.
* Support for the Storyblok [Visual Editor.](https://www.storyblok.com/docs/the-editor)

### Deployment

#### CMS

* Create an account with Storyblok.
* Join an existing Storyblok space or create one.
* Underneath the dashboard title on Storyblok (arrow), choose "plugins" and make sure to manually register the `curve-editor` plugin for your organization:
  * Create the private plugin and name it `curve-editor`
  * The source code of the plugin can be found inside the project folder in `.storyblok/plugins/curve-editor/curve-editor.js`
  * Copy/paste the source code inside the plugin editor to the plugin editor on the Storyblok dashboard.
  * Adjust other plugin settings. Make sure to make it available to all the content spaces where you plan to use this project starter.
  * Click `Save` and `Publish`.
* On your computer, install the [storyblok cli.](https://github.com/storyblok/storyblok)
* Perform first-time login: on the command-line type `storyblok login `, and provide your username and password when prompted.
* Upload your content types to the content space: `storyblok push-components ./.storyblok/components.101327.json --space <SPACE_ID>`
* In `package.json`, make sure to update the `sync-components` script with your `<SPACE_ID>` instead of the default. **_* (see notes)_**

#### Front-end

Deploy the example using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/vercel/next.js/tree/canary/examples/with-typescript)

### Structure

The source code follows the general structure of a Next.js project, with some specificities:

* `.next` - Next.js build assets. Auto-generated.
* `.storyblok` - Storyblok-specific assets. Custom bloks (slice) snapshots, source code of the `curve-editor`, and component definitions in json. See [deployment notes.](#deployment)
* `.storybook` - Storybook configuration. See `package.json` (scripts section).
* `components` - Statics react blocks, icons and layouts.
* `lib` - Redux initialization and helpers, Storyblok service, and **_pub/sub change dispatcher with middlewares (important)._**
* `pages` - Global page/site templates. Next.js-specific.
* `public` - Local static assets. Used for testing (w/ Storybook).
* `slices` - The actual `flexible content modules` for use with Storybook. 
  * Always register new modules inside `pages/[slug].js`, to be loaded dynamically. 
  * Make sure to follow the established code structure for slices, ie. slice content passed as a **prop**, in order to maintain the integration with the **Visual Editor** on Storyblok.
* `styles` - Style framework using BEM and SASS. Contains grid and color helpers.

### Notes

***** By default, Storyblok component definitions are pulled from the reference space with each commit using **git-hooks.** This is to make sure changes made online are versioned and preserved along with the code.

### Considerations

As of this writing, the project aims to remove a lot of the boilerplate needed to run a Jamstack platform based on Storyblok. As discussed in project goals, the intended target is near feature-parity with WordPress, both from the technical perspective, and in terms of ease of use.

As of this writing however, programmable, configurable "slugs" present one of the known limitations of the solution.

Storyblok has:

* Folders.
* Slugs.
* Path overrides, ie. manual overrides to the paths otherwise constructed from the `content folder` and the `slug.`

On the front-end, content and paths are retrieved at build-time, and contents are then refreshed per-path with incremental static regeneration. 

However, _Next.js doesn't currently support dynamic server-side redirects._ These are enabled during development, but will raise an error at build time, and halt the build.

As a result, the only server-side redirect that can be guaranteed to work is from `/` to `/home` (default homepage slug, static), and complex redirects are otherwise entirely dependent on the availability of Javascript on the front-end.

Hence, by default the starter project doesn't implement dynamic redirects. It is recommended that custom redirection logic be implemented on a per-project basis, and a use case is being submitted to the Next.js team for the future inclusion of dynamic server redirection logic.