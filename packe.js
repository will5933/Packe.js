/*
  PackE.JS
  MIT License(mit-license.org)
  Moris 2023
*/
'use strict'

export class PackeInput extends HTMLElement {
  constructor() {
    super()
    const default_bgcolor = '#eee',
      default_color = '#666',
      selection_bgcolor = '#bb93d5',
      selection_color = '#000',
      placeholder_color = '#aaa',
      placeholder = 'Type something here...'

    const shadow = this.attachShadow({ mode: 'closed' })
    shadow.innerHTML = `
      <style>
        :host {position:relative;display:block;width:14em;height:2.2em;margin:8px;}
        input {color:${default_color};background:${default_bgcolor};outline:none;border:none;padding:0.5em;
          border-radius:0.5em;font-size:1em;font-weight:600;caret-color:currentColor;
          width:calc(100% - 1em);height:calc(100% - 1em);}
        input.focus {animation: 0.3s ease focus forwards;}
        input.blur {animation: 0.3s ease blur forwards};
        input::placeholder {color:${placeholder_color};}
        input::selection {color:${selection_color};background-color:${selection_bgcolor};}
        input::-moz-selection {color:${selection_color};background-color:${selection_bgcolor};}
        @keyframes focus {50%{box-shadow:none;} 100%{box-shadow:0 1px 1px 1px #0002 inset;}}
        @keyframes blur {50%{box-shadow:none;} 100%{box-shadow:0 1px 1px 1px #0002;}}
      </style>
    `
    this.input = document.createElement('input')
    this.input.placeholder = placeholder
    this.input.classList.add('blur')
    this.input.addEventListener('focus', () => {
      this.input.classList.remove('blur')
      this.input.classList.add('focus')
    })
    this.input.addEventListener('blur', () => {
      this.input.classList.remove('focus')
      this.input.classList.add('blur')
    })
    shadow.appendChild(this.input)
  }
  static get observedAttributes() {
    return ['placeholder', 'background', 'color', 'value']
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (['value', 'placeholder'].includes(name))
      this.input[name] = newValue
    else (['color', 'background'].includes(name))
    this.input.style[name] = newValue
  }
}


export class PackeBtn extends HTMLElement {
  constructor() {
    super()
    this.typeList = ['confirm', 'cancel', 'delete', 'continue', 'finish']

    const shadow = this.attachShadow({ mode: 'closed' })
    shadow.innerHTML = `
      <style>
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
      </style>
    `
    this.btn = document.createElement('div')
    this.changeType()
    this.btn.addEventListener('click', () => {
      this.btn.classList.add('click')
      setTimeout(() => {
        this.btn.classList.remove('click')
      }, 100);
    })
    shadow.appendChild(this.btn)
  }
  static get observedAttributes() {
    return ['background', 'color', 'type', 'value']
  }
  connectedCallback() { }
  attributeChangedCallback(name, oldValue, newValue) {
    if ('type' === name)
      this.changeType(newValue)
    else if ('value' === name)
      if (newValue) this.btn.innerHTML = newValue
    else if (['color', 'background'].includes(name))
      this.btn.style[name] = newValue
  }
  changeType(v) {
    if (this.typeList.includes(v))
      this.btn.classList.add(v)
    switch (v) {
      case 'confirm': this.btn.innerHTML = 'Confirm'
        break
      case 'cancel': this.btn.innerHTML = 'Cancel'
        break
      case 'delete': this.btn.innerHTML = 'Delete'
        break
      case 'continue': this.btn.innerHTML = 'Continue'
        break
      case 'finish': this.btn.innerHTML = 'Finish'
        break
      default: this.btn.innerHTML = 'Button'
        break
    }
  }
}


// Define
customElements.define('packe-input', PackeInput)
customElements.define('packe-btn', PackeBtn)