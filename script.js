
getLocalStorage();


function NewIdea(ideaTitle, idea) {
  this.ideaTitle = ideaTitle;
  this.idea = idea;
  this.id = (new Date).getTime();
  this.quality = 'swill'
}



$('.save-button').on('click', function (event) {
  event.preventDefault();
  var newIdeaObject = new NewIdea($('.idea-title-input').val(), $('.idea-input').val());
  console.log(newIdeaObject);
  var stringifiedObject = JSON.stringify(newIdeaObject);
  localStorage.setItem(newIdeaObject.id, stringifiedObject);
  var $count = $('.bottom-section .idea').length;
  $('.bottom-section').prepend(`
    <article class="idea" data-associatedid="${newIdeaObject.id}">
      <button class="remove-button"></button>
      <h3 class="idea-title-output" contenteditable="true">${newIdeaObject.ideaTitle}</h3>
      <p class="idea-body" contenteditable="true">${newIdeaObject.idea}</p>
      <button class="up-vote vote-area"></button>
      <button class="down-vote vote-area"></button>
      <p class="quality-id vote-area">quality: ${newIdeaObject.quality}</p>
    </article>`);
  clearInputFields();
})

$('.bottom-section').on('click', '.remove-button', function() {
  $(this).parent().remove(); 
  var id = $(this).closest('article').data('associatedid');
  localStorage.removeItem(id);
})

$('.bottom-section').on('keyup', '.idea-title-output', function() {
  var id = $(this).closest('article').data('associatedid');
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.ideaTitle = $(this).text();
  if (event.which == 13){
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(parsedObject.id, stringifiedObject);
    console.log(localStorage);
  }
});

 $('.bottom-section').on('keyup', '.idea-body', function() {
  var id = $(this).closest('article').data('associatedid');
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);

  parsedObject.idea = $(this).text();

  if (event.which == 13){
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(parsedObject.id, stringifiedObject);
    console.log(localStorage);
  }
});

$('.bottom-section').on('click', '.up-vote', function() {
  var id = $(this).closest('article').data('associatedid');
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject.quality);

  if (parsedObject.quality === 'swill') {
    parsedObject.quality = 'plausible';
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(parsedObject.id, stringifiedObject);
    $(this).siblings('.quality-id').text('quality: plausible');
    console.log($(this).siblings().text());
  } else {
    parsedObject.quality = 'genius';
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(parsedObject.id, stringifiedObject);
    $(this).siblings('.quality-id').text('quality: genius');
    console.log(localStorage);
  }
});

$('.bottom-section').on('click', '.down-vote', function() {
  var id = $(this).closest('article').data('associatedid');
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  console.log(parsedObject.quality);

  if (parsedObject.quality === 'genius') {
    parsedObject.quality = 'plausible';
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(parsedObject.id, stringifiedObject);
    $(this).siblings('.quality-id').text('quality: plausible');
    console.log($(this).siblings().text());
  } else {
    parsedObject.quality = 'swill'
    var stringifiedObject = JSON.stringify(parsedObject);
    localStorage.setItem(parsedObject.id, stringifiedObject);
    $(this).siblings('.quality-id').text('quality: swill');
    console.log(localStorage);
  }
});

$('.search-bar').on('keyup', function() {
  searchIdea();
})

function getLocalStorage() {
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.key(i));
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    $('.bottom-section').prepend(`
      <article class="idea" data-associatedid="${parsedObject.id}">
        <button class="remove-button"></button>
        <h3 class="idea-title-output" contenteditable="true">${parsedObject.ideaTitle}</h3>
        <p class="idea-body" contenteditable="true">${parsedObject.idea}</p>
        <button class="up-vote vote-area"></button>
        <button class="down-vote vote-area"></button>
        <p class="quality-id vote-area">quality: ${parsedObject.quality}</p>
      </article>`);

  }
}

function clearInputFields() {
  $('.idea-title-input').val('');
  $('.idea-input').val('');
  $('.idea-title-input').focus();
}

function searchTitle() {
  var searchValue = $('.search-bar').val();
  var title = $('.idea-title-output').length;
  // var body = $('.idea-body').length;

  // for(var i = 0; i < title; i++) {
  //   if ($($('.idea-title-output')[i]).text().includes(searchValue)) {
  //     $($('.idea-title-output')[i]).parent().show();
  //   } else {
  //     $($('.idea-title-output')[i]).parent().hide();
  //   }
  // }
}
function searchIdea() {
  var searchValue = $('.search-bar').val();
  var title = $('.idea-title-output').length;
  var body = $('.idea-body').length;

  for(var i = 0; i < body; i++) {
    for(var i = 0; i < title; i++) {
      if ($($('.idea-title-output')[i]).text().includes(searchValue) || $($('.idea-body')[i]).text().includes(searchValue)) {
        $($('.idea-title-output')[i]).parent().show();
      } else  {
        $($('.idea-title-output')[i]).parent().hide();
      }
    } 
  }
}

















