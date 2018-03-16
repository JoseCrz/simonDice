const levels = 15

let keys

function generateKeys (levels) {
    return new Array(levels).fill(0).map(generateRandomKey)
}

function generateRandomKey() {
    const min = 65
    const max = 90
    return Math.round(Math.random() * (max-min) + min)
}

function getElementByKeyCode (keyCode) {
    return document.querySelector(`[data-key="${keyCode}"]`)
}

function activate (keyCode, opts = {}) {
    const el = getElementByKeyCode(keyCode)
    el.classList.add('active')

    if (opts.success) {
        el.classList.add('success')
    } else if (opts.fail) {
        el.classList.add('fail')
    }

    setTimeout(() => deactivate(el), 500)
}

function deactivate (el) {
    el.className = 'key'
}