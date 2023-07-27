# Packe.js

> This is a module witch provides delicate elements based on `Custom Element`  
> Author: **Moris**

### Example: [Cloudflare pages: https://packejs.pages.dev/](https://packejs.pages.dev/)

## Provided Elements

```HTML
<packe-input></packe-input>
<packe-input placeholder="--" value="---"></packe-input>
<!-- Provided property: placeholder/value -->
<!-- Provided event: input -->

<packe-button thc="yellow" value="警告"></packe-button>
<!-- Provided property: thc/value -->
<!-- Provided event: click -->

<packe-checkbox thc="violet" checked="true" value="Grape"></packe-checkbox>
<!-- Provided property: thc/checked/value -->
```

## Use
### Set/Get provided property
```javascript
// set
document.querySelector('packe- ... ').thc/value ... = ...
document.querySelector('packe- ... ')['thc'/'value' ...] = ...

// get
document.querySelector('packe- ... ').thc/value ... 
document.querySelector('packe- ... ')['thc'/'value' ...]
```

> #### Provided property
> `packe-input` placeholder/value  
> `packe-button` thc/value  
> `packe-checkbox` thc/checked/value  

### Listen events
```javascript
document.querySelector('packe-input').addEventListener('input', (e) => {
  // e.target === <packe-input>
  // e.target.value = ...
})

document.querySelector('packe-button').addEventListener('click', (e) => {
  // e.target === <packe-button>
  // e.target.value = ...
})
```