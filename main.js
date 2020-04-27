import * as getReport from './functions/csvmapping.js'

  // Main application
  (function () {
    // Action to trigger
    const button = document.getElementById('myButton');
    button.addEventListener('click', getReport);
    
  })