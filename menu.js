async function parse_response(ressource)
{
	ressource =  await ressource.blob()
	url = URL.createObjectURL(ressource);
	return new Promise(function (resolve, reject) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
				resolve(xmlhttp)
			}
	  };
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
	});	
}
function load(url)
{
	return new Promise(function (resolve,reject)
	{
		var myHeaders = new Headers();
		var myInit = { method: "GET",
		   headers: myHeaders,
		   mode: "cors",
		   withCredentials: true,
		   cache: "no-cache" };
	var myRequest = new Request(url,myInit);
	resolve(fetch(myRequest,myInit).catch(function(){reject(false)}))
	})
}
async function menu()
{
	var user = "corbin-c";
	var sibling = document.querySelector("#menujs");
	var menu = document.createElement("ul");
	user = await load("https://api.github.com/users/"+user+"/repos")
	user = await parse_response(user);
	user = JSON.parse(user.response);
	sibling.parentElement.insertBefore(menu,sibling);
	for (i in user)
	{
		if ((user[i].homepage != null) && (typeof user[i].homepage !== "undefined") && (user[i].homepage != ""))
		{
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.href = user[i].homepage;
			a.title = ((user[i].description != null) && (typeof user[i].description !== "undefined") && (user[i].description != "")) ? user[i].description:user[i].name;
			a.innerHTML = user[i].name;
			li.append(a)
			menu.append(li)
		}
	}
}
menu();
