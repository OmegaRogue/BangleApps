if (window.location.host=="banglejs.com") {
  document.getElementById("apploaderlinks").innerHTML =
    'This is the official Bangle.js App Loader - you can also try the <a href="https://espruino.github.io/BangleApps/">Development Version</a> for the most recent apps.';
} else if (window.location.host=="espruino.github.io") {
  document.title += " [Development]";
  document.getElementById("apploaderlinks").innerHTML =
    'This is the development Bangle.js App Loader - you can also try the <a href="https://banglejs.com/apps/">Official Version</a> for stable apps.';
} else {
  document.title += " [Unofficial]";
  document.getElementById("apploaderlinks").innerHTML =
    'This is not the official Bangle.js App Loader - you can try the <a href="https://banglejs.com/apps/">Official Version</a> here.';
}

var APP_SOURCECODE_URL;
(function() {
  APP_SOURCECODE_URL = "https://github.com/OmegaVoid/BangleApps/tree/master/apps";
})();
