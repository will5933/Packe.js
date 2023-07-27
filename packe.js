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
      :host {position:relative;display:block;width:14em;height:2.2em;margin:4px;}
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


export class Packebutton extends HTMLElement {
  constructor() {
    super()
    this.themecolorList = ['green', 'gray', 'red', 'cyan', 'violet', 'yellow']
    this.themecolor = this.themecolorList[1]
    const shadow = this.attachShadow({ mode: 'closed' })
    this.styles = document.createElement('style')
    this.button = document.createElement('div')
    shadow.appendChild(this.styles)
    shadow.appendChild(this.button)
  }
  connectedCallback() {
    this.styles.innerHTML = `
      :host {position:relative;display:block;width:fit-content;height:2.2em;margin:4px;}
      div {position:relative;padding:0.5em;border-radius:0.5em;
        font-size:1em;font-weight:800;width:fit-content;height:calc(100% - 1em);user-select:none;
        transform:translateZ(0);text-wrap:nowrap;
        transition:color 0.3s,background 0.3s,transform 0.1s ease,box-shadow 0.1s ease;
      }
      div.green {color:#006600;background:#b3e6b3;box-shadow:0 1px 1px 1px #00660044;}
      div.green:hover {color:#005500;background:#9fdf9f;box-shadow:0 1px 2px 1px #00660066;}
      div.gray {color:#666;background:#eee;box-shadow:0 1px 1px 1px #0002;}
      div.gray:hover {color:#222;background:#ddd;box-shadow:0 1px 2px 1px #0004;}
      div.red {color:#661100;background:#e6bbb3;box-shadow:0 1px 1px 1px #66110044;}
      div.red:hover {color:#330900;background:#dfaa9f;box-shadow:0 1px 2px 1px #66110066;}
      div.cyan {color:#006666;background:#b3e5e6;box-shadow:0 1px 1px 1px #00666644;}
      div.cyan:hover {color:#003333;background:#9fdfdf;box-shadow:0 1px 2px 1px #00666666;}
      div.violet {color:#440066;background:#d5b3e6;box-shadow:0 1px 1px 1px #44006644;}
      div.violet:hover {color:#220033;background:#ca9fdf;box-shadow:0 1px 2px 1px #44006666;}
      div.yellow {color:#666000;background:#e6e2b3;box-shadow:0 1px 1px 1px #66600044;}
      div.yellow:hover {color:#333000;background:#dfda9f;box-shadow:0 1px 2px 1px #66600066;}
      div.click {transform:scale(0.94);box-shadow:none !important;}
    `
    this.changeThc(this.themecolor)
    if (!this.getAttribute('value')) this.button.innerText = 'Button'

    this.button.addEventListener('click', () => {
      this.button.classList.add('click')
      setTimeout(() => { this.button.classList.remove('click') }, 100);
    })
  }
  static get observedAttributes() { return ['thc', 'value'] }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'thc') this.changeThc(newValue)
    else if (name === 'value') this.button.innerText = newValue
  }
  changeThc(v) {
    if (this.themecolorList.includes(v)) {
      this.themecolor = v
      this.button.className = v
    }
  }
  set thc(v) { this.changeThc(v) }
  get thc() { return this.themecolor }
  set value(v) { this.button.innerText = v }
  get value() { return this.button.innerText }
}


export class PackeCheckbox extends HTMLElement {
  constructor() {
    super()
    this.themecolorList = ['green', 'cyan', 'violet', 'red', 'yellow']
    this.themecolor = this.themecolorList[0]
    const shadow = this.attachShadow({ mode: 'closed' })
    this.styles = document.createElement('style')
    this.checkbox = document.createElement('div')
    this.svgbox = document.createElement('div')
    this.svgbox.id = 'svgbox'
    this.checkbox.id = 'checkbox'
    this.checkbox.className = 'unchecked'
    this.text = document.createElement('span')
    this.checkbox.appendChild(this.svgbox)
    this.checkbox.appendChild(this.text)
    shadow.appendChild(this.styles)
    shadow.appendChild(this.checkbox)
  }
  connectedCallback() {
    this.styles.innerHTML = `
      :host {position:relative;display:block;width:fit-content;height:2.2em;margin:4px;}
      #checkbox {position:relative;padding:0.5em;border-radius:0.5em;
        font-size:1em;font-weight:800;width:max-content;height:100%;user-select:none;
        transform:translateZ(0);transition:all 0.3s;
        display:flex;align-items:center;box-sizing:border-box;}
      #checkbox.green {color:#006600;background:#00660044;border:2px solid #00660044;}
      #checkbox.cyan {color:#006666;background:#00666644;border:2px solid #00666644;}
      #checkbox.yellow {color:#666000;background:#66600044;border:2px solid #66600044;}
      #checkbox.red {color:#661100;background:#66110044;border:2px solid #66110044;}
      #checkbox.violet {color:#440066;background:#44006644;border:2px solid #44006644;}
      #checkbox.unchecked {color:#666;border:2px solid #ddd;}
      #svgbox {position:absolute;left:0.5em;width:1em;height:1em;visibility:hidden;opacity:0;
        transition:opacity 0.3s;}
      #checkbox.unchecked #checked {display:none;}
      #checkbox.checked #unchecked {display:none;}
      path#checked {stroke:currentcolor;}
      span {transition:margin 0.3s ease;}
      #checkbox:hover>span {margin:0 0 0 1.4em;}
      #checkbox:hover>#svgbox {visibility:visible;opacity:1;}
      #checkbox.checked>span {margin:0 0 0 1.4em;}
      #checkbox.checked>#svgbox {visibility:visible;opacity:1;}
    `
    this.svgbox.innerHTML = `
      <svg viewBox="0 0 100 100">
        <path id="checked" d="M 10 45 L 40 75 M 40 75 L 90 25" stroke-width="16" stroke-linecap="round" fill="none"></path>
        <path id="unchecked" stroke="#bbb" d="M 35.5 50 m -22.5 0 a 22.5 22.5 0 1 0 75 0 a 22.5 22.5 0 1 0 -75 0" stroke-width="16" stroke-linecap="round" fill="none"></path>
      </svg>
    `
    this.checkbox.addEventListener('click', () => this.changeState())
  }
  static get observedAttributes() { return ['checked', 'value', 'thc'] }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked') this.changeState()
    else if (name === 'value') this.text.innerText = newValue
    else if (this.themecolorList.includes(newValue)) {
      this.themecolor = newValue
      this.changeState('notoggle')
    }
  }
  changeState(themecolor) {
    if (!themecolor) this.checked = this.checked ? false : true
    this.checkbox.className = this.checked ? `checked ${this.themecolor}` : 'unchecked'
  }
  set thc(v) {
    if (this.themecolorList.includes(v)) {
      this.themecolor = v
      this.changeState('notoggle')
    }
  }
  get thc() { return this.themecolor }
  set value(v) { this.text.innerText = v }
  get value() { return this.text.innerText }
}


// Defination
customElements.define('packe-input', PackeInput)
customElements.define('packe-button', Packebutton)
customElements.define('packe-checkbox', PackeCheckbox)