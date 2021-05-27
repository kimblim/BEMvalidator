// create stylesheet
var css = "",
  body = document.querySelector("body"),
  style = document.createElement("style")

css += "body {padding-bottom: 50%;}"
css +=
  ".bem-resultpane {position: fixed; box-sizing: border-box; top: 50%; left: 0; right: 0; bottom: 0; font: normal 16px/1.4 monospace, arial, verdana, sans-serif; border-top: 2px solid #999; background: #eee; color: #333;z-index: 10000;}"
css +=
  ".bem-resultpane__header {margin: 0; padding: 0 8px; height: 32px; border-bottom: 1px solid #999; font-size: 20px; font-weight: normal; line-height: 31px;}"
css += ".bem-resultpane__header strong{color:#f00;}"
css +=
  ".bem-resultpane__list {position: absolute; top: 33px; left: 0; right: 0; bottom: 0; margin: 0; padding: 0; background: #fefefe; overflow-y: auto;}"
css +=
  ".bem-resultpane__item {border-bottom: 1px solid #666; margin: 0; padding: 4px 8px; font-size: 16px; line-height: 20px;}"
css +=
  ".bem-resultpane__item code {background: #193549; color:#A2FB8F; box-shadow: 0 0 0 3px #193549;}"

if (style.styleSheet) {
  style.styleSheet.cssText = css
} else {
  style.appendChild(document.createTextNode(css))
}
body.appendChild(style)

// define variables, strings etc.
var msgPane = document.createElement("div")
msgPane.classList.add("bem-resultpane")
var logMsg = ""
var logMsgTitle = "" // defined at the end
var logMsgContent = "<ol class='bem-resultpane__list'>"
var logMsgFoot = "</ol>"
var errorsAmount = 0

// get all elements in a page
var allEls = document.body.querySelectorAll("*")

// traverse through all elements and see if the follow the rules
for (i = 0; i < allEls.length; i++) {
  var currentElement = allEls[i]

  // first check if it's a classless div or span
  if (
    (currentElement.tagName == "DIV" || currentElement.tagName == "SPAN") &&
    currentElement.classList.length === 0
  ) {
    logMsgContent +=
      "<li class='bem-resultpane__item'><strong>Warning:</strong> Contains <code>" +
      currentElement.tagName +
      "</code> elements with no class. These are un-necessary.</li>"
    currentElement.style.outline = "2px solid yellow"
    errorsAmount++
    // no need to move on with this element
    continue
  }

  // get classlist and make into array
  var elClassSet = Array.from(currentElement.classList)
  // traverse through classes
  for (j = 0; j < elClassSet.length; j++) {
    var currentClass = elClassSet[j]
    // Is the class an Element (__)?
    var element = currentClass.indexOf("__") > -1
    // yes
    if (element) {
      // if it's prefixed with "icon__" (icons) skip it
      if (!currentClass.indexOf("icon__") == 0) {
        // check if it's inside the right block
        var elementClass = currentClass.split("__")[0]
        var parentEl = currentElement.parentNode
        var isInBlock = false
        while (parentEl.tagName != "HTML") {
          var parentElClassSet = Array.from(parentEl.classList)
          if (parentElClassSet.includes(elementClass)) {
            // TODO: includes fungerer ikke i IE. indexOf!
            isInBlock = true
            break
          }
          parentEl = parentEl.parentNode
        }
        if (!isInBlock) {
          logMsgContent +=
            "<li class='bem-resultpane__item'><strong>Error:</strong> <code>" +
            currentClass +
            "</code> is positioned outside the <strong>Block</strong> (" +
            currentClass.split("__")[0] +
            ").</li>"
          currentElement.style.outline = "2px solid #f00"
          errorsAmount++
        }
        // check if it's double elemented ("x__y__z")
        var doubleElement = currentClass.match(/[\w-]+__[\w-]+__[\w-]+/g)
        if (doubleElement != null) {
          logMsgContent +=
            "<li class='bem-resultpane__item'><strong>Error:</strong> <code>" +
            currentClass +
            "</code> is not a valid BEM class. Two <strong>Elements</strong> on the same class is not allowed.</li>"
          currentElement.style.outline = "2px solid #f00"
          errorsAmount++
        }
      }
    }
    // does it contain a modifier?
    var modifier = currentClass.indexOf("--") > -1
    // yes
    if (modifier) {
      // if it's prefixed with "u-" (utility), "w--" (width delimiter), "icon__" (icons) skip it
      if (
        !(
          currentClass.indexOf("u-") == 0 ||
          currentClass.indexOf("w--") == 0 ||
          currentClass.indexOf("icon") == 0
        )
      ) {
        // double modifier
        var doubleModifier = currentClass.match(/[\w-]+--[\w-]+--[\w-]+/g)
        if (doubleModifier != null) {
          logMsgContent +=
            "<li class='bem-resultpane__item'><strong>Error:</strong> <code>" +
            currentClass +
            "</code> is not a valid BEM class. Two <strong>Modifiers</strong> on the same class is not allowed.</li>"
          currentElement.style.outline = "2px solid #f00"
          errorsAmount++
        }
        // check if the default class is present ("element element--modifier")
        var elementClass = currentClass.split("--")[0]
        if (!elClassSet.includes(elementClass)) {
          logMsgContent +=
            "<li class='bem-resultpane__item'><strong>Error:</strong> <code>" +
            currentClass +
            "</code> is included without it's default <strong>Element</strong> (" +
            elementClass +
            ").</li>"
          currentElement.style.outline = "2px solid #f00"
          errorsAmount++
        }
      }
    }
  }
}
//output logmsg
if (errorsAmount == 0) {
  errorsAmount = "0"
  logMsgContent = "<p><strong>Congratulations! No errors were found.</p>"
}
logMsgTitle =
  "<h1 class='bem-resultpane__header'>BEM Inspect Results: <strong>" +
  errorsAmount +
  " errors</strong></h1>"

logMsg += logMsgTitle + logMsgContent + logMsgFoot
msgPane.innerHTML = logMsg
body.appendChild(msgPane)
