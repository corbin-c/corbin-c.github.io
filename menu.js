(async () => {
  const USER = location.href.split("://")[1].split(".github.io")[0];
  let menu = document.createElement("nav");
  let list = document.createElement("ul");
  list.setAttribute("tabindex","1");
  menu.append(list);
  document.querySelector("header").append(menu);
  let user_repos = await fetch("https://api.github.com/users/"+USER+"/repos");
  user_repos = await user_repos.json();  user_repos.map(repo => {
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
  let current_repo = user_repos.find(
    repo => ((repo.homepage != null)
      && (typeof repo.homepage !== "undefined")
      && (repo.homepage != "")
      && (repo.homepage.indexOf(location.href) >= 0)));
  let link = document.createElement("a");
  link.setAttribute("href",current_repo.html_url);
  link.setAttribute("title",current_repo.name + " by " + USER + " on Github");
  link.innerText = "View code on Github";
  document.querySelector("footer").append(link);
})();
