//import 'ace-builds'
import 'ace-builds/src-noconflict/ace.js'
//import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-html.js'
import 'ace-builds/src-noconflict/mode-css.js'
import 'ace-builds/src-noconflict/mode-javascript.js'
import htmlWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-html"
ace.config.setModuleUrl("ace/mode/html_worker", htmlWorkerUrl)
import cssWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-css"
ace.config.setModuleUrl("ace/mode/css_worker", cssWorkerUrl)
import jsWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-javascript"
ace.config.setModuleUrl("ace/mode/javascript_worker", jsWorkerUrl)
import 'ace-builds/src-noconflict/theme-monokai.js'
import 'ace-builds/src-noconflict/ext-language_tools.js'
import 'emmet-core/emmet.js'
import 'ace-builds/src-noconflict/ext-emmet'
import 'ace-builds/src-noconflict/snippets/html.js'
import 'ace-builds/src-noconflict/snippets/css.js'
import 'ace-builds/src-noconflict/snippets/javascript.js'
import './editor-console.js'

window.addEventListener('DOMContentLoaded', () => {

  // Retrieve Elements
  const consoleLogList = document.querySelector('.editor-console-logs')
  const resetCodeBtn = document.querySelector('.editor-reset')
  
  
  // Setup Ace
  let htmlCodeEditor = ace.edit('htmlEditorCode')
  let cssCodeEditor = ace.edit('cssEditorCode')
  let jsCodeEditor = ace.edit('jsEditorCode')
  let consoleMessages = []
  
  // update to iframe
  function update() {
    let result = document.querySelector('#result').contentDocument
    result.open()
    result.write(`${htmlCodeEditor.getValue()}`)
    result.write(`<style>${cssCodeEditor.getValue()}</style>`)
    result.write(`<script>${jsCodeEditor.getValue()}</scrip>`)
    result.close()
  }
  
  let editorLib = {
    clearConsoleScreen() {
      consoleMessages.length = 0
  
      // Remove all elements in the log list
      while (consoleLogList.firstChild) {
        consoleLogList.removeChild(consoleLogList.firstChild)
      }
    },
    printToConsole() {
      consoleMessages.forEach(log => {
        const newLogItem = document.createElement('li')
        const newLogText = document.createElement('pre')
  
        newLogText.className = log.class
        newLogText.textContent = `> ${log.message}`
  
        newLogItem.appendChild(newLogText)
  
        consoleLogList.appendChild(newLogItem)
      })
    },
    init() {
      // Config ace
  
      // Theme
      htmlCodeEditor.setTheme('ace/theme/monokai')
      cssCodeEditor.setTheme('ace/theme/monokai')
      jsCodeEditor.setTheme('ace/theme/monokai')
  
      // Set language
      htmlCodeEditor.session.setMode('ace/mode/html')
      cssCodeEditor.session.setMode('ace/mode/css')
      jsCodeEditor.session.setMode('ace/mode/javascript')
  
      // Set opts
      htmlCodeEditor.setOptions({
        highlightActiveLine: true,
        fontFamily: 'Consolas',
        fontSize: '12pt',
        tabSize: '2',
        enableEmmet: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      })
      cssCodeEditor.setOptions({
        highlightActiveLine: true,
        fontFamily: 'Consolas',
        fontSize: '12pt',
        tabSize: '2',
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      })
      jsCodeEditor.setOptions({
        highlightActiveLine: true,
        fontFamily: 'Consolas',
        fontSize: '12pt',
        tabSize: '2',
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      })
  
      // Set Default code
      //jsCodeEditor.setValue(defaultCode)
  
      // Show result on iframe
      htmlCodeEditor.getSession().on('change', () => {
        update()
      })
      cssCodeEditor.getSession().on('change', () => {
        update()
      })
      jsCodeEditor.getSession().on('change', () => {
        update()
      })
    }
  }
  
  // Events
  htmlCodeEditor.session.on('change', () => {
    // Clear the console
    editorLib.clearConsoleScreen()
  
    // Get input from the code editor
    const htmlUserCode = htmlCodeEditor.getValue()
  
    // Run the user code
    try {
      htmlUserCode
    } catch (err) {
      console.error(err)
    }
  
    // Print to the console
    editorLib.printToConsole()
  })
  
  cssCodeEditor.session.on('change', () => {
    // Clear the console
    editorLib.clearConsoleScreen()
  
    // Get input from the code editor
    const cssUserCode = cssCodeEditor.getValue()
  
    // Run the user code
    try {
      cssUserCode
    } catch (err) {
      console.error(err)
    }
  
    // Print to the console
    editorLib.printToConsole()
  })
  
  jsCodeEditor.session.on('change', () => {
    // Clear the console
    editorLib.clearConsoleScreen()
  
    // Get input from the code editor
    const jsUserCode = jsCodeEditor.getValue()
    
    // Run the user code
    try {
      jsUserCode
    } catch (err) {
      console.error(err)
    }
  
    // Print to the console
    editorLib.printToConsole()
  })
  
  resetCodeBtn.addEventListener('click', () => {
    // Clear ace editor
    htmlCodeEditor.setValue('')
    cssCodeEditor.setValue('')
    jsCodeEditor.setValue('')
  
    // Clear the console
    editorLib.clearConsoleScreen()
  })
  
  editorLib.init()
  update()
})