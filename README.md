# BEMvalidator
A bookmarklet for testing BEM syntax in HTML files

## Note
For now there are exceptions built into the code as I'm using it on a specific project. Those will be removed later.

## Code

```javascript
javascript:var css="",body=document.querySelector("body"),style=document.createElement("style");css+="body {padding-bottom: 50%;}",css+=".bem-resultpane {position: fixed; z-index:10000;box-sizing: border-box; top: 50%; left: 0; right: 0; bottom: 0; font: normal 16px/1.4 arial, verdana, sans-serif; border-top: 2px solid #999; background: #eee; color: #333;}",css+=".bem-resultpane__header {margin: 0; padding: 0 8px; height: 32px; border-bottom: 1px solid #999; font-size: 20px; font-weight: normal; line-height: 31px;}",css+=".bem-resultpane__header strong{color:#f00;}",css+=".bem-resultpane__list {position: absolute; top: 33px; left: 0; right: 0; bottom: 0; margin: 0; padding: 0; background: #fefefe; overflow-y: auto;}",css+=".bem-resultpane__item {border-bottom: 1px solid #666; margin: 0; padding: 4px 8px; font-size: 16px; line-height: 20px;}",css+=".bem-resultpane__item code {background: #ff0; outline: 3px solid #ff0;}",style.type="text/css",style.styleSheet?style.styleSheet.cssText=css:style.appendChild(document.createTextNode(css)),body.appendChild(style);var msgPane=document.createElement("div");msgPane.classList.add("bem-resultpane");var logMsg="",logMsgTitle="",logMsgContent="<ol class='bem-resultpane__list'>",logMsgFoot="</ol>",errorsAmount=0,allEls=document.body.querySelectorAll("*");for(i=0;i<allEls.length;i++){var currentElement=allEls[i];if("DIV"!=currentElement.tagName&&"SPAN"!=currentElement.tagName||0!==currentElement.classList.length){var elClassSet=Array.from(currentElement.classList);for(j=0;j<elClassSet.length;j++){var currentClass=elClassSet[j],element=currentClass.indexOf("__")>-1;if(element&&0==!currentClass.indexOf("icon__")){for(var elementClass=currentClass.split("__")[0],parentEl=currentElement.parentNode,isInBlock=!1;"HTML"!=parentEl.tagName;){var parentElClassSet=Array.from(parentEl.classList);if(parentElClassSet.includes(elementClass)){isInBlock=!0;break}parentEl=parentEl.parentNode}isInBlock||(logMsgContent+="<li class='bem-resultpane__item'><code>"+currentClass+"</code> is positioned outside the <strong>Block</strong> ("+currentClass.split("__")[0]+").</li>",currentElement.style.outline="2px solid #f00",errorsAmount++);var doubleElement=currentClass.match(/[\w-]+__[\w-]+__[\w-]+/g);null!=doubleElement&&(logMsgContent+="<li class='bem-resultpane__item'><code>"+currentClass+"</code> is not a valid BEM class. Two <strong>Elements</strong> on the same class is not allowed.</li>",currentElement.style.outline="2px solid #f00",errorsAmount++)}var modifier=currentClass.indexOf("--")>-1;if(modifier&&0!=currentClass.indexOf("u-")&&0!=currentClass.indexOf("w--")&&0!=currentClass.indexOf("icon")){var doubleModifier=currentClass.match(/[\w-]+--[\w-]+--[\w-]+/g);null!=doubleModifier&&(logMsgContent+="<li class='bem-resultpane__item'><code>"+currentClass+"</code> is not a valid BEM class. Two <strong>Modifiers</strong> on the same class is not allowed.</li>",currentElement.style.outline="2px solid #f00",errorsAmount++);var elementClass=currentClass.split("--")[0];elClassSet.includes(elementClass)||(logMsgContent+="<li class='bem-resultpane__item'><code>"+currentClass+"</code> is included without it's default <strong>Element</strong> ("+elementClass+").</li>",currentElement.style.outline="2px solid #f00",errorsAmount++)}}}else logMsgContent+="<li class='bem-resultpane__item'>Contains <code>"+currentElement.tagName+"</code> elements with no class. These are un-necessary.</li>",currentElement.style.outline="2px solid #f00",errorsAmount++}0==errorsAmount&&(errorsAmount="0",logMsgContent="<p><strong>Congratulations! No errors were found.</p>"),logMsgTitle="<h1 class='bem-resultpane__header'>BEM Inspect Results: <strong>"+errorsAmount+" errors</strong></h1>",logMsg+=logMsgTitle+logMsgContent+logMsgFoot,msgPane.innerHTML=logMsg,body.appendChild(msgPane);
```

## Install
Chrome: Right-click on the bookmarks bar and choose "Add Page". Give the bookmarklet a title ("BEM Validator" would be good) and paste the JS code into the "URL" field. 

(More browsers to come)

## Usage
Visit a page, click the bookmarklet. Nothing more to it. 

## To-do
* Add browsers in "Install section"
* Remove exceptions

## License
Please do with it what you want — if you have any ideas or improvements to the code (by all means: I'm no genius, so there's a huge chance that your code is better than mine) do a pull request or hit me at Twitter: @therealkimblim
