const USER = "corbin-c";
(async () => {
  let sibling = document.querySelector("#menujs");
  let menu = document.createElement("nav");
  let list = document.createElement("ul");
  menu.append(list);
  user = await fetch("https://api.github.com/users/"+USER+"/repos");
  user = await user.json();
  sibling.parentElement.insertBefore(menu,sibling);
  user.map(repo => {
    if ((repo.homepage != null)
      && (typeof repo.homepage !== "undefined")
      && (repo.homepage != "")
      && (location.href.indexOf(repo.homepage) < 0)) {
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.href = repo.homepage;
      a.title = ((repo.description != null)
        && (typeof repo.description !== "undefined")
        && (repo.description != ""))
        ? repo.description
        :repo.name;
      a.innerHTML = repo.name;
      li.append(a)
      list.append(li)
    }
  });
})();
