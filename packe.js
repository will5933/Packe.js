/*
  PackE.JS
  MIT License(mit-license.org)
  Moris 2023
*/

/*
  attribute (set only)
      ele.setAttribute(--, --)
  property (get & set)
      ele[--] = --
*/
'use strict'

export class PackeInput extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    this.styles = document.createElement('style')
    this.input = document.createElement('input')
    shadow.appendChild(this.styles)
    shadow.appendChild(this.input)
  }
  connectedCallback() {
    this.styles.innerHTML = `
      :host {position:relative;display:block;width:14em;height:2.2em;margin:8px;}
      input {color:#666;background:#eee;outline:none;border:none;padding:0.5em;
        border-radius:0.5em;font-size:1em;font-weight:600;caret-color:currentColor;
        width:calc(100% - 1em);height:calc(100% - 1em);}
      input.focus {animation: 0.3s ease focus forwards;}
      input.blur {animation: 0.3s ease blur forwards};
      input::placeholder {color:#aaa;}
      input::selection {color:'#000';background-color:#bb93d5;}
      input::-moz-selection {color:'#000';background-color:#bb93d5;}
      @keyframes focus {50%{box-shadow:none;} 100%{box-shadow:0 1px 1px 1px #0002 inset;}}
      @keyframes blur {50%{box-shadow:none;} 100%{box-shadow:0 1px 1px 1px #0002;}}
    `
    this.input.placeholder = 'Type something here...'
    this.input.classList.add('blur')

    this.input.addEventListener('focus', () => { this.input.classList.replace('blur', 'focus') })
    this.input.addEventListener('blur', () => { this.input.classList.replace('focus', 'blur') })
  }
  static get observedAttributes() { return ['placeholder', 'value'] }
  attributeChangedCallback(name, oldValue, newValue) {
    this.input[name] = newValue
  }
  set value(v) { this.input.value = v }
  get value() { return this.input.value }
  set placeholder(v) { this.input.placeholder = v }
  get placeholder() { return this.input.placeholder }
}


export class PackeBtn extends HTMLElement {
  constructor() {
    super()
    this.typeList = ['confirm', 'cancel', 'delete', 'continue', 'finish']
    const shadow = this.attachShadow({ mode: 'closed' })
    this.styles = document.createElement('style')
    this.btn = document.createElement('div')
    shadow.appendChild(this.styles)
    shadow.appendChild(this.btn)
  }
  connectedCallback() {
    this.styles.innerHTML = `
      :host {position:relative;display:block;width:fit-content;height:2.2em;margin:8px;}
      div {position:absolute;top:0;left:0;padding:0.5em;border-radius:0.5em;
        font-size:1em;font-weight:800;width:max-content;height:calc(100% - 1em);user-select:none;
        transform:translateZ(0);display:flex;justify-content:center;align-items:center;
        transition:color 0.3s,background 0.3s,transform 0.1s ease,box-shadow 0.1s ease;
      }
      div.confirm {color:#006600;background:#b3e6b3;box-shadow:0 1px 1px 1px #00660044;}
      div.confirm:hover {color:#005500;background:#9fdf9f;box-shadow:0 1px 2px 1px #00660066;}
      div.cancel {color:#666;background:#eee;box-shadow:0 1px 1px 1px #0002;}
      div.cancel:hover {color:#222;background:#ddd;box-shadow:0 1px 2px 1px #0004;}
      div.delete {color:#661100;background:#e6bbb3;box-shadow:0 1px 1px 1px #66110044;}
      div.delete:hover {color:#330900;background:#dfaa9f;box-shadow:0 1px 2px 1px #66110066;}
      div.continue {color:#006666;background:#b3e5e6;box-shadow:0 1px 1px 1px #00666644;}
      div.continue:hover {color:#003333;background:#9fdfdf;box-shadow:0 1px 2px 1px #00666666;}
      div.finish {color:#440066;background:#d5b3e6;box-shadow:0 1px 1px 1px #44006644;}
      div.finish:hover {color:#220033;background:#ca9fdf;box-shadow:0 1px 2px 1px #44006666;}
      div.click {transform:scale(0.94);box-shadow:none !important;}
    `
    if (!this.getAttribute('type'))
      this.setAttribute('type', this.typeList[1])
    if (!this.getAttribute('value'))
      this.btn.innerText = this.getAttribute('type')

    this.btn.addEventListener('click', () => {
      this.btn.classList.add('click')
      setTimeout(() => { this.btn.classList.remove('click') }, 100);
    })
  }
  static get observedAttributes() { return ['type', 'value'] }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type') this.changeType(newValue)
    else if (name === 'value') this.btn.innerText = newValue
  }
  changeType(v) {
    if (this.typeList.includes(v)) this.btn.className = v
  }
  set type(v) { this.changeType(v) }
  get type() { return this.btn.className }
  set value(v) { this.btn.innerText = v }
  get value() { return this.btn.innerText }
}


export class PackeCheckbox extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'closed' })
    this.styles = document.createElement('style')
    this.checkbox = document.createElement('div')
    this.svgbox = document.createElement('div')
    this.checkbox.id = 'checkbox'
    this.checkbox.className = 'unchecked'
    this.svgbox.id = 'svgbox'
    this.text = document.createElement('span')
    this.checkbox.appendChild(this.svgbox)
    this.checkbox.appendChild(this.text)
    shadow.appendChild(this.styles)
    shadow.appendChild(this.checkbox)
  }
  connectedCallback() {
    this.styles.innerHTML = `
      :host {position:relative;display:block;width:14em;height:2.2em;margin:8px;}
      #checkbox {position:absolute;top:0;left:0;padding:0.5em;border-radius:0.5em;
        font-size:1em;font-weight:800;width:max-content;height:100%;user-select:none;
        transform:translateZ(0);transition:all 0.3s;
        display:flex;align-items:center;box-sizing:border-box;}
      #checkbox.checked {color:#006600;background:#00660044;border:2px solid #00660044;}
      #checkbox.unchecked {color:#666;border:2px solid #ddd;}
      #svgbox {position:absolute;left:0.5em;width:1em;height:1em;visibility: hidden;opacity:0;
        transition:opacity 0.3s;}
      #checkbox.unchecked #checked {display:none;}
      #checkbox.checked #unchecked {display:none;}
      svg#checked {fill:#006600;}
      svg#unchecked {fill:#aaa;}
      span {transition:margin 0.3s ease;}
      #checkbox:hover>span {margin:0 0 0 1.4em;}
      #checkbox:hover>#svgbox {visibility: visible;opacity:1;}
    `
    this.svgbox.innerHTML = `
      <svg id="unchecked" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M256 512C397.385 512 512 397.385 512 256C512 114.615 397.385 0 256 0C114.615 0 0 114.615 0 256C0 397.385 114.615 512 256 512ZM256 437C355.964 437 437 355.964 437 256C437 156.036 355.964 75 256 75C156.036 75 75 156.036 75 256C75 355.964 156.036 437 256 437Z"/></svg>      
      <svg id="checked" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
    `
    this.checkbox.addEventListener('click', () => {
      this.changeState()
    })
  }
  static get observedAttributes() { return ['checked', 'value'] }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked') this.changeState()
    else this.text.innerText = newValue
  }
  changeState() {
    this.checked = this.checked ? false : true
    this.checkbox.className = this.checked ? 'checked' : 'unchecked'
  }
  set value(v) { this.text.innerText = v }
  get value() { return this.text.innerText }
}


// Defination
customElements.define('packe-input', PackeInput)
customElements.define('packe-btn', PackeBtn)
customElements.define('packe-checkbox', PackeCheckbox)