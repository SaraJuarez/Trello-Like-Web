"use strict";let info={},infoArray=new Array;import{createHtml}from"./main.js";import{createEvents}from"./edit.js";import{createButtonNewColumn}from"./main.js";function getDataFromApi(){fetch("../../api/board.json").then((function(t){return t.json()})).then((function(t){for(let e=0;e<t.board.list.length;e++){const a=t.board.list[e];infoArray.push(a)}console.log(infoArray),createHtml()}))}getDataFromApi();export{infoArray};import{infoArray}from"./api.js";import{createHtml}from"./main.js";function deleteList(t){let e=t.currentTarget.id;infoArray.splice(e,1);createHtml()}export{deleteList};import{createNewList}from"./newList.js";const toggleEdit=t=>{t.stopPropagation(),document.querySelector(".js-edit").classList.toggle("show"),document.querySelector(".js-edit").classList.remove("d-none")},preventEditClosing=t=>{t.stopPropagation()};function createEvents(){document.querySelectorAll(".js-card, .js-edit-close").forEach(t=>{t.addEventListener("click",toggleEdit)}),document.querySelector(".js-edit-modal").addEventListener("click",preventEditClosing),document.querySelector(".new-list-btn ").addEventListener("click",createNewList)}export{createEvents};import{infoArray}from"./api.js";function getListName(t){let e=t.currentTarget.id,a=t.target.value;infoArray[e].title=a}export{getListName};import"./api.js";import"./edit.js";import"./menu.js";import{infoArray}from"./api.js";import{createEvents}from"./edit.js";import{getListName}from"./inputName.js";import{deleteList}from"./deleteList.js";import{moveList}from"./moveList.js";const mainContainer=document.querySelector(".app-board");function createHtml(){mainContainer.innerHTML="";for(let t=0;t<infoArray.length;t++){let e=document.createElement("div");e.setAttribute("class","app-list"),e.setAttribute("id",t),mainContainer.appendChild(e);let a=document.createElement("div");a.setAttribute("class","p-1 rounded-sm bg-primary shadow"),e.appendChild(a);let r=document.createElement("form");r.setAttribute("class","app-list-form align-middle p-1 position-relative"),Object.assign(r,{id:[t]}),a.appendChild(r);let n=document.createElement("input");Object.assign(n,{className:"app-list-input form-control form-control-sm",placeholder:"Tareas importantes",type:"text",value:infoArray[t].title,title:"Editar el título de la lista",id:t}),n.addEventListener("keyup",getListName),r.appendChild(n);let i=document.createElement("div");i.setAttribute("class","app-list-options"),r.appendChild(i);let s=document.createElement("span");s.setAttribute("class","pl-2 pr-2 text-white-50 fas fa-ellipsis-v"),i.appendChild(s);let l=document.createElement("div");l.setAttribute("class","app-list-btns btn-group btn-group-sm"),i.appendChild(l);let o=document.createElement("button");Object.assign(o,{type:"button",class:"btn btn-light text-muted border shadow-sm",title:"Borrar esta tarjeta",id:[t]}),o.addEventListener("click",deleteList),l.appendChild(o);let d=document.createElement("span");d.setAttribute("class","fas fa-trash-alt"),o.appendChild(d);let c=document.createElement("button");c.setAttribute("class","btn btn-light text-muted border shadow-sm app-list-move-left"),Object.assign(c,{type:"button",title:"Mover esta lista hacia la izquierda"}),l.appendChild(c);let m=document.createElement("span");m.setAttribute("class","fas fa-arrow-left"),c.appendChild(m);let p=document.createElement("button");p.setAttribute("class","btn btn-light text-muted border shadow-sm app-list-move-right"),Object.assign(p,{type:"button",title:"Mover esta lista hacia la derecha"}),l.appendChild(p);let u=document.createElement("span");u.setAttribute("class","fas fa-arrow-right"),p.appendChild(u),c.addEventListener("click",moveList),p.addEventListener("click",moveList);for(let e=0;e<infoArray[t].cards.length;e++){let r=infoArray[t].cards[e],n=document.createElement("article");n.setAttribute("class","js-card app-card m-1 mb-2 p-2 bg-white rounded-sm app-cursor-pointer shadow-sm"),n.setAttribute("title","Abrir la tarjeta"),a.appendChild(n);let i=document.createElement("div");n.appendChild(i);for(let t=0;t<r.tags.length;t++){let e=document.createElement("span");e.setAttribute("class","badge badge-secondary bg-success"),e.innerHTML=r.tags[t],i.appendChild(e)}let s=document.createElement("div"),l=document.createElement("h3");l.setAttribute("class","h6");let o=document.createTextNode(r.title);l.appendChild(o),s.appendChild(l),n.appendChild(s);let d=document.createElement("div");d.setAttribute("class","text-black-50");let c=document.createElement("small");c.setAttribute("class","pr-2 fas fa-align-left");let m=document.createElement("small");m.setAttribute("class","far fa-check-square");let p=document.createElement("small");p.setAttribute("title","Subtareas completadas: 3 de 5");let u=document.createTextNode("Subtareas completadas: 3 de 5");p.appendChild(u),d.appendChild(c),d.appendChild(m),d.appendChild(p),n.appendChild(d);let b=document.createElement("div");b.setAttribute("class","app-card-btns btn-group-vertical btn-group-sm");let f=document.createElement("button");Object.assign(f,{type:"button",class:"btn btn-light text-muted border shadow-sm app-card-move-up",title:"Mover esta tarjeta hacia abajo"});let h=document.createElement("span");h.setAttribute("class","fas fa-arrow-up"),f.appendChild(h);let g=document.createElement("button");Object.assign(g,{type:"button",class:"btn btn-light text-muted border shadow-sm app-card-move-down",title:"Mover esta tarjeta hacia arriba"});let A=document.createElement("span");A.setAttribute("class","fas fa-arrow-down"),g.appendChild(A),b.appendChild(f),b.appendChild(g),n.appendChild(b)}let b=document.createElement("button");Object.assign(b,{type:"button",class:"ml-1 btn btn-primary btn-sm text-white-50",title:"Añadir una nueva tarjeta"});let f=document.createElement("span");f.setAttribute("class","fas fa-plus");let h=document.createTextNode("Añadir otra tarjeta");f.appendChild(h),b.appendChild(f),a.appendChild(b)}createButtonNewColumn(),createEvents()}function createButtonNewColumn(){let t=document.createElement("div"),e=document.createElement("button");e.setAttribute("class","new-list-btn btn btn-light btn-outline-primary btn-sm mr-5 shadow-sm"),e.setAttribute("type","button"),e.setAttribute("title","Añadir nueva lista");let a=document.createElement("span");a.setAttribute("class","fas fa-plus"),e.appendChild(a),t.appendChild(e),mainContainer.appendChild(t)}export{createHtml};export{createButtonNewColumn};const toggleMenu=()=>{document.querySelector(".js-menu").classList.toggle("show")};document.querySelectorAll(".js-menu-btn").forEach(t=>{t.addEventListener("click",toggleMenu)});import{infoArray}from"./api.js";import{createHtml}from"./main.js";function moveList(t){let e=t.currentTarget;const a=t.currentTarget.form.id;let r=infoArray.splice(a,1);console.log(r);let n=e.classList.contains("app-list-move-left")?a-1:a+1;infoArray.splice(n,0,r[0]),createHtml()}export{moveList};import{infoArray}from"./api.js";import{createHtml}from"./main.js";function createNewList(){infoArray.push({title:"Título tarjeta",cards:[{id:"",title:"Título de la tarea",description:"Lorem ipsum dolor sit amet",tags:["JS","Css","Html"]}]}),createHtml()}export{createNewList};