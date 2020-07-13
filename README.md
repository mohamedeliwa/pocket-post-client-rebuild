
# POCKET-POST-CLIENT

A frontend for the ***Pocket-Post*** project, which is a ***dynamic blog web application***, similar but not identical to [*Medium*](https://medium.com/).  
It's created using Reactjs ( **Nextjs** ), and contains pages which are statically built with client side fetching of data, also server-side rendered pages.

# TODO LIST
- Modify Home page style and structure.
- Install styled-components npm package ofr styling.
- Reposition side bar widget.
- Install and try [editor](https://editorjs.io/).

## static pages
- `index.js` *with (CSR)* as no need for seo for post cards, other components they are static already so no problem with seo
- `profile/[id]` *with (CSR)* as it's behind auth
- `profile/edit` *with (CSR)* as it's behind auth
- `posts/new` *with (CSR)* as it's behind auth
- `posts/search` *with (CSR)* as it's behind auth
## SSR
- `authors/[id]` needs better seo
- `posts/[id]` needs better seo

<br />

***

## FEATURES
- `Search` DB for specific posts (side bar widgets)
- `SWR` for fetching data on client side [Basic Example](https://github.com/zeit/swr/tree/master/examples/basic)
    > forget about `SWR` now, you can use it in other project
- why there is no client side rendered pages ? 