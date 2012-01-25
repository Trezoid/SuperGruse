// ==UserScript==
// @name           SuperGruse
// @namespace      //
// @include        http://*.deviantart.com/
// @exclude        http://chat.deviantart.com
// @exclude        http://browse.deviantart.com
// ==/UserScript==

var updateGruse = function(elem, dragTo)
{
	var cookie = unsafeWindow.document.cookie;
	var postDat = "ui="+cookie.split("userinfo=")[1].split(";")[0] + "&c%5B%5D=%22GrusersModules%22%2C%22positionModule%22%2C%5B%22"+elem.gruseID+"%22%2C%22"+elem.pageID+"%22%2C%22"+elem.gmiID+"%22%2C%22"+dragTo.col+"%22%2C"+dragTo.position+"%2C"+elem.position+"%5D&t=json";
	console.log(postDat);


	GM_xmlhttpRequest({
		method:"POST",
		url: window.location+"/global/difi/?",
		data: postDat,	
		headers: {
			"Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8",
			"Cookie" : cookie
		},
	
		onload: function(res)
		{
			console.log(res.responseText);
		}
	});
}

var nodeUp = function(node, toID)
{
	while(node.getAttribute("id") != toID)
	{
		node = node.parentNode;
	}
	return node;
}

var fromElem;
var toElem

var setElem = function(node)
{
	fromElem = {
		gruseID : node.getAttribute("gmi-gruser_id"),
		pageID : document.getElementById("gmi-GPage").getAttribute("gmi-id"),
		gmiID : node.getAttribute("gmi-id"),
		position : node.getAttribute("gmi-position")
	}
}
var setToElem = function(node)
{
	toElem = {
		col : node.parentNode.getAttribute("gmi-name"),
		position : node.getAttribute("gmi-position")
	}
}

var clickUp = function(eventHandle)
{
	var x = eventHandle.clientX;
	var y = eventHandle.clientY;
	var node = document.elementFromPoint(x, y);
	node = nodeUp(node, "gmi-GMFrame_Gruser");
	setToElem(node);
	console.log(fromElem.gruseID +", "+fromElem.pageID+"," + toElem.col);
	updateGruse(fromElem, toElem);
}


var clickDown = function(eventHandle)
{
	var x = eventHandle.clientX;
	var y = eventHandle.clientY;
	var node = document.elementFromPoint(x, y);

	node = nodeUp(node, "gmi-GMFrame_Gruser");
	setElem(node);
	node.setAttribute("class",  node.getAttribute("class") + " drag");
	node.addEventListener("mouseup", function(){node.setAttribute("class", node.getAttribute("class").split(" drag")[0]);}, true);
}

window.onmousedown = clickDown;
window.onmouseup = clickUp;
