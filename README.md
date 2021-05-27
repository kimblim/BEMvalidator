# BEMvalidator

A bookmarklet for testing BEM syntax used in CSS.

## How to use

Right-click (or whatever you do) [this link](javascript:var css="",body=document.querySelector("body"),style=document.createElement("style");css+="body {padding-bottom: 50%;}";css+=".bem-resultpane {position: fixed; box-sizing: border-box; top: 50%; left: 0; right: 0; bottom: 0; font: normal 16px/1.4 monospace, arial, verdana, sans-serif; border-top: 2px solid #999; background: #eee; color: #333;z-index: 10000;}";css+=".bem-resultpane**header {margin: 0; padding: 0 8px; height: 32px; border-bottom: 1px solid #999; font-size: 20px; font-weight: normal; line-height: 31px;}";css+=".bem-resultpane**header strong{color:#f00;}";css+=".bem-resultpane**list {position: absolute; top: 33px; left: 0; right: 0; bottom: 0; margin: 0; padding: 0; background: #fefefe; overflow-y: auto;}";css+=".bem-resultpane**item {border-bottom: 1px solid #666; margin: 0; padding: 4px 8px; font-size: 16px; line-height: 20px;}";css+=".bem-resultpane**item code {background: #193549; color:#A2FB8F; box-shadow: 0 0 0 3px #193549;}";if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}body.appendChild(style);var msgPane=document.createElement("div");msgPane.classList.add("bem-resultpane");var logMsg="";var logMsgTitle="";var logMsgContent="<ol class='bem-resultpane**list'>";var logMsgFoot="</ol>";var errorsAmount=0;var allEls=document.body.querySelectorAll("\*");for(i=0;i<allEls.length;i+=1){var currentElement=allEls[i];if((currentElement.tagName=="DIV"||currentElement.tagName=="SPAN")&&currentElement.classList.length===0){logMsgContent+="<li class='bem-resultpane__item'><strong>Warning:</strong> Contains <code>"+currentElement.tagName+"</code> elements with no class. These are un-necessary.</li>";currentElement.style.outline="2px solid yellow";errorsAmount++;continue}var elClassSet=Array.from(currentElement.classList);for(j=0;j<elClassSet.length;j+=1){var currentClass=elClassSet[j];var element=currentClass.indexOf("**")>-1;if(element){if(!currentClass.indexOf("icon**")==0){var elementClass=currentClass.split("**")[0];var parentEl=currentElement.parentNode;var isInBlock=false;while(parentEl.tagName!="HTML"){var parentElClassSet=Array.from(parentEl.classList);if(parentElClassSet.includes(elementClass)){isInBlock=true;break}parentEl=parentEl.parentNode}if(!isInBlock){logMsgContent+="<li class='bem-resultpane**item'><strong>Error:</strong> <code>"+currentClass+"</code> is positioned outside the <strong>Block</strong> ("+currentClass.split("**")[0]+").</li>";currentElement.style.outline="2px solid #f00";errorsAmount+=1}var doubleElement=currentClass.match(/[\w-]+**[\w-]+**[\w-]+/g);if(doubleElement!=null){logMsgContent+="<li class='bem-resultpane**item'><strong>Error:</strong> <code>"+currentClass+"</code> is not a valid BEM class. Two <strong>Elements</strong> on the same class is not allowed.</li>";currentElement.style.outline="2px solid #f00";errorsAmount+=1}}}var modifier=currentClass.indexOf("--")>-1;if(modifier){if(!(currentClass.indexOf("u-")==0||currentClass.indexOf("w--")==0||currentClass.indexOf("icon")==0)){var doubleModifier=currentClass.match(/[\w-]+--[\w-]+--[\w-]+/g);if(doubleModifier!=null){logMsgContent+="<li class='bem-resultpane__item'><strong>Error:</strong> <code>"+currentClass+"</code> is not a valid BEM class. Two <strong>Modifiers</strong> on the same class is not allowed.</li>";currentElement.style.outline="2px solid #f00";errorsAmount+=1}var elementClass=currentClass.split("--")[0];if(!elClassSet.includes(elementClass)){logMsgContent+="<li class='bem-resultpane__item'><strong>Error:</strong> <code>"+currentClass+"</code> is included without it's default <strong>Element</strong> ("+elementClass+").</li>";currentElement.style.outline="2px solid #f00";errorsAmount+=1}}}}}if(errorsAmount==0){errorsAmount="0";logMsgContent="<p><strong>Congratulations! No errors were found.</p>"}logMsgTitle="<h1 class='bem-resultpane__header'>BEM Inspect Results: <strong>"+errorsAmount+" errors</strong></h1>";logMsg+=logMsgTitle+logMsgContent+logMsgFoot;msgPane.innerHTML=logMsg;body.appendChild(msgPane);) and add it to your bookmarks.

Now visit any page that uses BEM for CSS naming and click the bookmark.

## Note

This also outputs warnings if there are `<div>` or `<span>` elements with no classes, as that can be a sign of sloppy code practices. (yes, this is opinionated, but I've dealt with a lot of JSX code that didn't use [fragments](https://reactjs.org/docs/fragments.html).)

## License

Please do with it what you want — if you have any ideas or improvements to the code (by all means: I'm no genius, so there's a huge chance that your code is better than mine) do a pull request, create an issue or hit me at Twitter: @overflowhidden
