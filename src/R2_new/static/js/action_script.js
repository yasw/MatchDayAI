actionList = document.getElementById('actionList');
currentTarget = 0;

actionList.addEventListener('mouseleave', hideList);
actionList.addEventListener('click', changeAction);


let sceneSplitData = {
  timestamps: [5, 9, 15, 22, 24]
};

let sectionHolder = document.getElementById('sections');

sections = sectionHolder.innerHTML;
widths = [];


actionData = {
  0: 'Start',
  1: 'Short Pass',
  3: 'Short Pass',
  10: 'Long Pass',
  15: 'Shoot',
  18: 'Short Pass',
  21: 'Short Pass',
  25: 'Shoot'
};

actions = actionHolder.innerHTML;
action_widths = [];
secondsToShow = 10;

vid.onloadedmetadata = function() {
  for(let i = 1; i <= sceneSplitData.timestamps.length; i++) {
    current = sceneSplitData.timestamps[i-1];
    prev = (i-2>=0? sceneSplitData.timestamps[i-2]: 0);
    ratio = (current-prev)/vid.duration;
    width = ratio*1440;
    widths.push(width);
    section = "<div class='section' id='section"+i.toString(10)+"'></div>";
    sections = sections+section;
  }

  sectionHolder.innerHTML = sections;

  for(let i = 1; i <= sceneSplitData.timestamps.length; i++) {
    document.getElementById('section'+i.toString(10)).style.width = widths[i-1];
  }

  actionData[vid.duration] = '';

  for(let i = 0; i < Object.keys(actionData).length; i++) {
    current = Object.keys(actionData)[i];
    next = (i<Object.keys(actionData).length-1? Object.keys(actionData)[i+1]: vid.duration);
    ratio = (next-current)/secondsToShow;
    width = ratio*1285;
    action_widths.push(width);
    action = "<div class='action' data-starttime='"+(Object.keys(actionData)[i]).toString(10)+"' id='action"+i.toString(10)+"'>"+actionData[Object.keys(actionData)[i]]+"</div>";
    actions = actions+action;
  }

  actionHolder.innerHTML = actions;

  for(let i = 0; i < Object.keys(actionData).length; i++) {
    document.getElementById('action'+i.toString(10)).style.width = action_widths[i];
  }


  /////////

  actionBoxes = document.getElementsByClassName('action');

  for (var i = 1; i < actionBoxes.length; i++) {
      actionBoxes[i].addEventListener('click', actionListViewer);
  }
};

function actionListViewer(e) {
  actionList.style.top = window.scrollY+e.clientY-240;
  actionList.style.left = e.clientX;
  actionList.style.visibility = 'visible';
  currentTarget = e.target;
}

function hideList() {
  actionList.style.visibility = 'hidden';
}

function changeAction(e) {
  currentTarget.innerHTML = e.target.dataset.action;
  currentTarget = 0;
  actionList.style.visibility = 'hidden';
  actionData[activeAction.dataset.starttime] = e.target.dataset.action;
}
