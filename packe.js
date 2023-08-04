/*
    PackE.JS
    MIT License(mit-license.org)
    なんでもないや
    Moris 2023
*/

'use strict'

import { Colors } from '/default-color.js'
const colorList = Object.keys(Colors)
const valueList = [100, 200, 300, 400, 500, 600, 700, 800, 900]

const getColor = (color, value) => {
    if (colorList.includes(color) && valueList.includes(value)) {
        return Colors[color][value]
    }
}

const colorCSS = (color, value) => `color: ${getColor(color, value)};`
const backgroundColorCSS = (color, value) => `background-color: ${getColor(color, value)};`
const borderCSS = (color, value, width) => `border: 0.${width}em solid ${getColor(color, value)};`
const borderBottomCSS = (color, value, width) => `border-bottom: 0.${width}em solid ${getColor(color, value)};`
const transitionAll = sec => `transition: all ${sec}s;`

// Disabled
const disabled_bg = 'background-color: #ccc;'
const disabled_bg_hover = 'background-color: #ddd;'

// Shadow
const shadow_default = 'box-shadow:0 0 4px 0 #0002;'
const shadow_default_hover = 'box-shadow:0 0 6px 0 #0004;'

// Border
const border_normal = 'border: 0.1em solid #ddd;'
const border_transparent = 'border: 0.1em solid transparent;'

// Tools
const repeatStr = (template, arr) => {
    let result = ''
    for (let a = 0; a < arr[0].length; a++) {
        let str = template
        for (let b = 0; b < arr.length; b++) {
            str = str.replaceAll(`{{${b}}}`, arr[b][a])
        }
        result += str
    }
    return result
}

const arrInOut = (fn, arg) => {
    const arr = []
    for (let i = 0; i < arg.length; i++) {
        if (Array.isArray(arg[i])) arr.push(fn(...arg[i]))
        else arr.push(fn(arg[i]))
    }
    return arr
}




class PackeInput extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'closed' })
        this.styles = document.createElement('style')
        this.input = document.createElement('input')
        this.styles.innerHTML = `
            :host {position:relative;display:block;width:14em;height:2.2em;margin:4px;}
            input {outline:none;padding:0.5em;width:100%;height:100%;box-sizing:border-box;
                border-radius:0.5em;font-size:1em;font-weight:600;caret-color:currentColor;
                ${transitionAll(0.3) + colorCSS('primary', 900)}
            }
            input.blur {${borderCSS('primary', 100, 1) + backgroundColorCSS('primary', 100)}}
            input.focus {${borderCSS('primary', 400, 1) + backgroundColorCSS('primary', 100)}}
            input::placeholder {${colorCSS('primary', 600)}}
            input::selection {color:#000;${backgroundColorCSS('primary', 300)}}
            input::-moz-selection {color:#000;${backgroundColorCSS('primary', 300)}}
        `
        this.input.placeholder = 'Get started!!!'
        this.input.classList.add('blur')
        shadow.appendChild(this.styles)
        shadow.appendChild(this.input)
    }
    connectedCallback() {
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





class PackeSwitch extends HTMLElement {
    constructor() {
        super()
        this.$thc = colorList[0]
        const shadow = this.attachShadow({ mode: 'closed' })
        this.$state = 'off'
        this.styles = document.createElement('style')
        this.switch = document.createElement('div')
        this.point = document.createElement('div')
        this.switch.id = 'switch'
        this.switch.className = 'on'
        this.point.id = 'point'
        this.styles.innerHTML = `
            :host {position:relative;display:block;width:3.2em;height:1.6em;margin:4px;}
            div#switch {position:relative;border-radius:1.6em;width:100%;height:100%;
              user-select:none;transform:translateZ(0);text-wrap:nowrap;transition:all 0.3s ease;
              ${border_normal}
            }
            div#point {position:absolute;width:1.2em;height:1.2em;top:0.2em;background:#fff;border-radius:100%;
              transition:all 0.15s;${shadow_default}}
            div#switch:hover>div#point {${shadow_default_hover}}
            div#switch.on {${border_transparent}}
            div#switch.on>div#point {left:calc(100% - 1.4em);}
            div#switch.off>div#point {left:0.2em;}
            div#switch.off {color:#666;${disabled_bg}}
            div#switch.off:hover {color:#222;${disabled_bg_hover}}
        ${repeatStr('div#switch.{{0}} {{{1}}{{2}}}', [
            [...colorList, ...colorList.map(e => e + ':hover')],
            [...arrInOut(backgroundColorCSS, colorList.map(e => [e, 400])), ...arrInOut(backgroundColorCSS, colorList.map(e => [e, 300]))]
        ])}
        `
        shadow.appendChild(this.styles)
        this.switch.appendChild(this.point)
        shadow.appendChild(this.switch)
    }
    connectedCallback() {
        this.changeThc(this.$thc)
        this.switch.addEventListener('click', () => { this.changeState(this.$state === 'on' ? 'off' : 'on') })
    }
    static get observedAttributes() { return ['thc', 'state'] }
    attributeChangedCallback(name, oldValue, v) {
        if (name === 'thc') this.changeThc(v)
        else if (name === 'state') this.changeState(v)
    }
    changeState(v) {
        if (['on', 'off'].includes(v)) {
            this.$state = v
            this.switch.className = v === 'on'
                ? `${this.$thc} ${v}`
                : 'off'
        }
    }
    changeThc(v) {
        if (colorList.includes(v)) {
            this.$thc = v
            this.switch.className = this.$state === 'on'
                ? `${this.$thc} on`
                : 'off'
        }
    }
    set thc(v) { this.changeThc(v) }
    get thc() { return this.$thc }
    set state(v) { this.changeState(v) }
    get state() { return this.$state }
}





class PackeButton extends HTMLElement {
    constructor() {
        super()
        this.$thc = colorList[0]
        const shadow = this.attachShadow({ mode: 'closed' })
        this.styles = document.createElement('style')
        this.button = document.createElement('div')
        this.styles.innerHTML = `
            :host {position:relative;display:block;width:fit-content;height:2.2em;margin:4px;}
            div {position:relative;padding:0.4em;border-radius:0.5em;font-size:1em;font-weight:800;
              width:fit-content;height:calc(100% - 1em);user-select:none;
              text-wrap:nowrap;transition:color 0.3s,background 0.3s,transform 0.1s ease,border 0.3s;
            }
        ${repeatStr('div.{{0}} {{{1}}{{2}}{{3}}}', [
            [...colorList, ...colorList.map(e => e + ':hover')],
            [...arrInOut(colorCSS, colorList.map(e => [e, 900])), ...arrInOut(colorCSS, colorList.map(e => [e, 800]))],
            [...arrInOut(borderCSS, colorList.map(e => [e, 200, 1])), ...arrInOut(borderCSS, colorList.map(e => [e, 400, 1]))],
            [...arrInOut(backgroundColorCSS, colorList.map(e => [e, 200])), ...arrInOut(backgroundColorCSS, colorList.map(e => [e, 200]))],
        ])}
            div.click {transform:scale(0.95);}
        `
        shadow.appendChild(this.styles)
        shadow.appendChild(this.button)
    }
    connectedCallback() {
        this.changeThc(this.$thc)
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
        if (colorList.includes(v)) {
            this.$thc = v
            this.button.className = v
        }
    }
    set thc(v) { this.changeThc(v) }
    get thc() { return this.$thc }
    set value(v) { this.button.innerText = v }
    get value() { return this.button.innerText }
}





class PackeCheckbox extends HTMLElement {
    constructor() {
        super()
        this.$thc = colorList[0]
        const shadow = this.attachShadow({ mode: 'closed' })
        this.$checked = false
        this.styles = document.createElement('style')
        this.checkbox = document.createElement('div')
        this.svgbox = document.createElement('div')
        this.svgbox.id = 'svgbox'
        this.checkbox.id = 'checkbox'
        this.checkbox.className = 'unchecked'
        this.text = document.createElement('span')
        this.checkbox.appendChild(this.svgbox)
        this.checkbox.appendChild(this.text)
        this.styles.innerHTML = `
            :host {position:relative;display:block;width:fit-content;height:2.2em;margin:4px;}
            #checkbox {position:relative;padding:0.5em;border-radius:0.5em;
              font-size:1em;font-weight:800;width:max-content;height:100%;user-select:none;
              transform:translateZ(0);transition:all 0.3s;
              display:flex;align-items:center;box-sizing:border-box;}
            ${repeatStr('#checkbox.checked-{{0}} { {{1}} {{2}} {{3}} }', [
                [...colorList],
                [...arrInOut(colorCSS, colorList.map(e => [e, 900]))],
                [...arrInOut(backgroundColorCSS, colorList.map(e => [e, 200]))],
                [...arrInOut(borderCSS, colorList.map(e => [e, 200, 1]))]
            ])}
            #checkbox.unchecked {${border_normal}color:#666;}
            #svgbox {position:absolute;left:0.5em;width:1em;height:1em;visibility:hidden;opacity:0;
              transition:opacity 0.6s ease-out;}
            path {stroke:currentcolor;}
            span {transition:margin 0.3s ease;}
            #checkbox.checked>span {margin:0 0 0 1.4em;}
            #checkbox.checked>#svgbox {visibility:visible;opacity:1;}
        `
        this.svgbox.innerHTML = `
            <svg viewBox="0 0 100 100">
              <path d="M 10 45 L 40 75 M 40 75 L 90 25" stroke-width="16" stroke-linecap="round" fill="none"></path>
            </svg>
        `
        shadow.appendChild(this.styles)
        shadow.appendChild(this.checkbox)
    }
    connectedCallback() {
        this.checkbox.addEventListener('click', () => this.toggleState(!this.$checked))
    }
    // disconnectedCallback() {}
    static get observedAttributes() { return ['checked', 'value', 'thc'] }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked') this.toggleState(newValue === 'true')
        else if (name === 'value') this.text.innerText = newValue
        else if (colorList.includes(newValue)) {
            this.$thc = newValue
            this.checkbox.className = this.$checked ? `checked checked-${this.$thc}` : `unchecked unchecked-${this.$thc}`
        }
    }
    toggleState(to) {
        this.$checked = to ? true : false
        this.checkbox.className = to ? `checked checked-${this.$thc}` : `unchecked unchecked-${this.$thc}`
    }
    set thc(v) {
        if (colorList.includes(v)) {
            this.$thc = v
            this.checkbox.className = this.$checked ? `checked checked-${this.$thc}` : `unchecked unchecked-${this.$thc}`
        }
    }
    get thc() { return this.$thc }
    set value(v) { this.text.innerText = v }
    get value() { return this.text.innerText }
    set checked(v) { this.toggleState(v) }
    get checked() { return this.$checked }
}





class PackeTab extends HTMLElement {
    constructor() {
        super()
        this.$thc = colorList[0]
        this.styles = document.createElement('style')
        this.titleBar = document.createElement('p-titlebar')
        this.panel = this.querySelector('p-panel')
        this.styles.innerHTML = `
            packe-tab {position:relative;display:block;min-width:20em;min-height:20em;width:20em;height:20em;margin:8px;
                box-shadow:0 2px 20px #0002;border-radius:8px;overflow:hidden;
                display:flex;flex-direction:column;}
            p-titlebar {position:relative;width:100%;height:2.2em;
                display:flex;overflow-x:auto;overflow-y:hidden;}
            p-titlebar>span {padding:0 1em;width:fit-content;max-width:18em;height:100%;align-items:center;
                user-select:none;font-weight:600;scroll-snap-align:start;
                display:inline-flex;white-space:nowrap;transition:all 0.3s;color:#666;
                box-sizing:border-box;border-bottom:0.1em solid #eee;}
            p-titlebar>span:hover {background:#eee;}
            ${repeatStr('p-titlebar>span.{{0}} {{{1}} {{2}} {{3}}}', [
                [...colorList],
                [...arrInOut(colorCSS, colorList.map(e => [e, 800]))],
                [...arrInOut(backgroundColorCSS, colorList.map(e => [e, 200]))],
                [...arrInOut(borderBottomCSS, colorList.map(e => [e, 600, 1]))]
            ])}
            p-panel {position:relative;width:100%;height:calc(100% - 2.2em);
                overflow-x:auto;overflow-y:hidden;display:grid;grid-auto-flow:column;
                grid-auto-columns:100%;scroll-snap-type:x mandatory;}
            p-sheet {width:100%;height:100%;scroll-snap-align:start;overflow-x:hidden;overflow-y:auto;
                overscroll-behavior-y:contain;padding:8px;box-sizing:border-box;}
            p-titlebar::-webkit-scrollbar,p-panel::-webkit-scrollbar {display:none;}
            p-sheet::-webkit-scrollbar {width:0.2em;background-color:transparent;}
            p-sheet::-webkit-scrollbar-thumb {background-color:transparent;}
            p-sheet:hover::-webkit-scrollbar-thumb {background-color:#0002;}
        `
        this.insertBefore(this.titleBar, this.panel)
        this.appendChild(this.styles)
    }
    connectedCallback() {
        this.panel = this.querySelector('p-panel')
        this.rander()
        for (const span of this.querySelectorAll('p-titlebar>span')) {
            span.addEventListener('click', (e) => {
                console.log(this.panel.children[e.target.getAttribute('index')].offsetLeft, this.panel.scrollLeft)
                this.panel.scroll({
                    top: 0,
                    left: this.panel.children[e.target.getAttribute('index')].offsetLeft,
                    behavior: 'smooth'
                })
            })
        }
        this.panel.addEventListener('scroll', () => {
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            this.timer = setTimeout(() => {
                console.log('scrolled')
                this.matchTitle()
                const showing = this.querySelector('p-titlebar>span.showing')
                this.titleBar.scroll({
                    top: 0,
                    left: showing.offsetLeft - (this.titleBar.offsetWidth - showing.offsetWidth) / 2,
                    behavior: 'smooth'
                })
                this.timer = null
            }, 50)
        })
    }
    rander(list) {
        for (const ele of this.querySelectorAll('p-panel>:not(p-sheet)')) { ele.remove() }
        if (list) this.panel.innerHTML = list
        const titleList = []
        let i = 0;
        for (const sheet of this.querySelectorAll('p-sheet')) {
            let title = sheet.getAttribute('p-title').replace(/[<>\\\/]/g, '')
            title = title.length > 20 ? title.substring(0, 20) + '...' : title
            titleList.push(`<span index="${i}">${title ? title : 'Untitled Sheet'}</span>`)
            i++
        }
        this.titleBar.innerHTML = titleList.join('')
        this.matchTitle()
    }
    matchTitle(index) {
        const i = index ? index : Math.floor(
            this.panel.scrollLeft / this.panel.scrollWidth
            * this.sheetList.length + 0.5
        )
        if (this.querySelector(`p-titlebar>span.showing`))
            this.querySelector(`p-titlebar>span.showing`).className = ''
        this.querySelector(`p-titlebar>span[index="${i}"]`).classList.add('showing', this.$thc)
    }
    static get observedAttributes() { return ['thc'] }
    attributeChangedCallback(name, oldValue, newValue) { this.applyThemecolor(newValue) }
    applyThemecolor(v) {
        if (colorList.includes(v)) {
            this.$thc = v
            if (this.querySelector(`p-titlebar>span.showing`))
                this.querySelector(`p-titlebar>span.showing`).className = 'showing ' + this.$thc
        }
    }
    set show(i) {
        if (i < this.sheetList.length) this.querySelector(`p-titlebar>span[index="${i}"]`).click()
    }
    get show() { return this.querySelector('p-titlebar>span.showing').getAttribute('index') }
    set sheetList(l) { this.rander(l) }
    get sheetList() { return this.querySelectorAll('p-sheet') }
    set thc(v) { this.applyThemecolor(v) }
    get thc() { return this.$thc }
}



// Defination
customElements.define('packe-input', PackeInput)
customElements.define('packe-button', PackeButton)
customElements.define('packe-checkbox', PackeCheckbox)
customElements.define('packe-tab', PackeTab)
customElements.define('packe-switch', PackeSwitch)