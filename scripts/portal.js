'use strict';

function Portal(sites)
{
  this.el = document.createElement("div");
  this.sites = sites;
  
  this.install = function()
  {
    document.body.appendChild(this.el);
  }
  
  this.start = function()
  {
    this.install();
    this.el.innerHTML = window.location.hash && window.location.hash.length > 4 ? this.redirect() : this.directory();
  }

  this.readme = function()
  {
    return `<p class='readme'>This webring is an attempt to inspire artists & developers to build their own website and share traffic among each other. The ring welcomes personalized websites such as <b>diaries, wikis & portfolios</b>.</p><p>To add yourself to the ring, submit a <a href='https://github.com/XXIIVV/webring/edit/master/index.html' target='_blank'>Pull Request</a>.<br />If you found a broken link, please <a href='https://github.com/XXIIVV/webring/issues/new' target='_blank'>report it</a>.</p>`
  }

  this.buttons = function()
  {
    return `<p class='buttons'><a href='#random' onClick="portal.reload('random')">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a> <a id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
  }
  
  this.directory = function()
  {
    return `<ul>${this.sites.reduce((acc,val,id) => { return `${acc}<li>${id}) <a href='${val}'>${val.split("//")[1]}</a></li>`},"")}</ul>\n${this.readme()}${this.buttons()}`
  }

  this.reload = function()
  {
    setTimeout(()=>{ window.location.reload() },500)
  }

  this.navigate = function(target)
  {
    setTimeout(() => {
      window.location.href = target
    },3000)
  }
  
  this.location = function()
  {
    return window.location.hash.replace("#","").trim();
  }
  
  this.locate = function()
  {
    const hash = this.location();
    
    if(hash == "random"){
      return Math.floor(Math.random()*this.sites.length)
    }
    
    for(const id in this.sites){
      const site = this.sites[id];
      if(site.indexOf(hash) >-1){
        return parseInt(id)
      }
    }
    return -1
  }
  
  this.next = function(loc)
  {
    return loc == this.sites.length-1 ? this.sites[0] : this.sites[loc+1];
  }
  
  this.redirect = function()
  {
    const location = this.locate();
    const target = this.next(location);
    this.navigate(target)
    return `<p>Redirecting to <b>${target}</b></p><meta http-equiv="refresh" content="3; url=${target}">
    <p class='buttons'><a href='#' onClick="portal.reload('')">Directory</a> | <a href='#${target}' onClick="portal.reload('random')">Skip</a> | <a href='#random' onClick="portal.reload('random')">Random</a> | <a href='https://github.com/XXIIVV/webring'>Information</a> <a id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`
  }
}
