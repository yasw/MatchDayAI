optionList = document.getElementById('playerList');
players = document.getElementsByClassName('playerdataholder');
currTarget = 0;

ajax({
  url : '/players',
  type: "get",
  async: false,
  success: function(response){
    PlayersList = response;
    optionList.innerHTML = "";
    for (var i = 0; i < PlayersList.length; i++){
      if(i==PlayersList.length-1){
        optionList.innerHTML = optionList.innerHTML+"<div class='playerOption'><p>"+PlayersList[i]+"</p></div>";
      }
      else{
        optionList.innerHTML = optionList.innerHTML+"<div class='playerOption'><p>"+PlayersList[i]+"</p></div>"+"<div class='Rule'></div>";
      }
    }
  },
  error: function(xhr){
    // Do something to handle error
  }
});

optionList.addEventListener('mouseleave', hideList1);
optionList.addEventListener('click', changePlayer);

for (var i = 0; i < (players.length)/2; i++) {
  players[i].addEventListener('contextmenu', optionListViewer1);
  players[i].addEventListener('click', updateName);
}

for (var  i = (players.length)/2; i < players.length; i++){
  players[i].addEventListener('contextmenu', optionListViewer2);
  players[i].addEventListener('click', updateName);
}

function optionListViewer1(e) {
  e.preventDefault();
  optionList.style.top = window.scrollY+e.clientY;
  optionList.style.left = e.clientX-226;
  optionList.style.visibility = 'visible';
  currTarget = e.target;
}

function optionListViewer2(e) {
  e.preventDefault();
  optionList.style.top = window.scrollY+e.clientY-120;
  optionList.style.left = e.clientX-226;
  optionList.style.visibility = 'visible';
  currTarget = e.target;
}

function hideList1() {
  optionList.style.visibility = 'hidden';
}

function changePlayer(e) {
  currTarget.nextSibling.innerHTML = e.target.children[0].innerHTML;
  currTarget.src = "../static/img/"+e.target.children[0].innerHTML+".jpg"
  currTarget = 0;
  optionList.style.visibility = 'hidden';
}

function updateName(e){
  // 4 is equal to e.target.nextSibling.innerHTML
  dict[tracker] = 4;
  status = 0;
  dict_status[tracker]=1;
  priorities = document.getElementById('priorities');
  priorities.innerHTML = "";
}
