# Packe.js

> This is a module witch provides delicate elements based on `Custom Element`  
> Author: **Moris**

### Example: [Cloudflare pages: https://packejs.pages.dev/](https://packejs.pages.dev/)

## Provided Elements

![](/img/packe-input.png)
![](/img/packe-button.png)
![](/img/packe-checkbox.png)
![](/img/packe-tab.png)

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

<packe-tab thc="cyan">
  <!-- Necessary structure -->
  <p-panel>
    <p-sheet p-title="😋longtitlelonglonglonglonglong">Title rule: length limited(20) 😋</p-sheet>
    <!-- p-title -rander-> title -->
    <p-sheet p-title="Sheet1">Title rule: length limited(20) 😋</p-sheet>
    <p-sheet>Title rule:↑ length limited(20) 😋</p-sheet>
  </p-panel>
</packe-tab>
<!-- Provided property: thc/sheetList/show -->
```

> `thc` means themecolor

## Use
### Set / Get provided property
```javascript
// set
document.querySelector('packe- ... ').thc/value ... = ...
document.querySelector('packe- ... ')['thc'/'value' ...] = ...

// get
document.querySelector('packe- ... ').thc/value ... 
document.querySelector('packe- ... ')['thc'/'value' ...]
```

> #### Provided property
> `<packe-input>`: *placeholder* / *value*  
> `<packe-button>`: *thc* / *value*  
> `<packe-checkbox>`: *thc* / *checked* / *value*  
> `<packe-tab>`: *thc* / *sheetList* / *show*

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