import Handlebars from 'handlebars'
import * as Components from './components'
import * as Layout from './layout'
import * as Pages from './pages'

import { runDOMFunctions } from './dom-functions'

const pages = {
  'chat': [ Pages.ChatPage ],
  'login': [ Pages.LoginPage ],
  'sign-up': [ Pages.SignUpPage ],
  'error404': [ Pages.Error404Page ],
  'error500': [ Pages.Error500Page ],
}

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component)
})

Object.entries(Layout).forEach(([ name, layout ]) => {
  Handlebars.registerPartial(name, layout)
})

function navigate(page) {
  const [ source, args ] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => {
  navigate('login')
  runDOMFunctions()  
})

document.addEventListener('click', (e) => {
  const page = e.target.getAttribute('page');

  if (page) {
    navigate(page);
    runDOMFunctions() 

    e.preventDefault();
    e.stopImmediatePropagation();
  }
})

