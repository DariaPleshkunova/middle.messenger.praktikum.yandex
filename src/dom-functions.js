import { freezeInputLabel } from './components/input/index.js'
import { toggleProfilePopup } from './components/profile-popup/index.js'
import { initPopups } from './components/popup/index.js';

export function runDOMFunctions() {
    freezeInputLabel()
    initPopups()
    toggleProfilePopup()
}