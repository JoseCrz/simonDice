const levels = 15

let keys = generateKeys(levels)

function nextLevel (currentLevel) {
    if (currentLevel == levels) {
        return alert('Ganaste')
    }

    alert (`Nivel actual: ${currentLevel + 1}`)

    for (let i = 0; i <= currentLevel; i++) {
        setTimeout(() => activate(keys[i]), 1000 * (i+1))
    }

    let i = 0
    let currentKey = keys[i]
    window.addEventListener('keydown', onKeydown)

    function onKeydown (ev) {
        if(ev.keyCode == currentKey) {
            activate(currentKey, { success: true })
            i++
            if (i > currentLevel) {
                window.removeEventListener('keydown', onKeydown)
                setTimeout(() => nextLevel(i), 1000)
            }

            currentKey = keys[i]
        } else {
            activate(ev.keyCode, { fail: true})
            window.removeEventListener('keydown', onKeydown)
            setTimeout(() => alert('perdiste'), 500)
        }
    }
}

nextLevel(0)

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