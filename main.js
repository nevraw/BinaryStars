(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
  console.log('Submit');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
  console.log('Cancel');
 
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}


function loadOptions() {
 if (localStorage.hard) {
  $hardValue = localStorage.hard;
  console.log('localStorage.hard: ' + $hardValue);
  // setting radio' value
  $("input[name=presetRadio][value='" + $hardValue + "']").attr('checked', 'checked');
 } else {
  $hardValue = 0;
  console.log('localStorage.hard was undefined, now set to: ' + $hardValue);
  $("input[name=hardRadio][value='" + $hardValue + "']").attr('checked', 'checked');
 }
} 
 
 
function getAndStoreConfigData() {
console.log('hardRadio value: ' + $hardValue);

 var options = {
  hard: $hardValue;
 };

 localStorage.hard = options.hard;
 
 console.log('Got options: ' + JSON.stringify(options));
 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
