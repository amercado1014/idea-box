getLocalStorage();

function NewIdea(ideaTitle, idea) {
  this.ideaTitle = ideaTitle;
  this.idea = idea;
  this.id = (new Date).getTime();
  this.quality = 'swill'
}

$('.save-button').on('click', saveIdea); 
$('.bottom-section').on('click', '.remove-button', removeIdea); 
$('.bottom-section').on('keyup', '.idea-title-output', editIdeaTitle); 
$('.bottom-section').on('keyup', '.idea-body', editIdeaBody);
$('.bottom-section').on('click', '.up-vote', upVote);
$('.bottom-section').on('click', '.down-vote', downVote); 
$('.search-bar').on('keyup', searchIdea);

function getLocalStorage() {
  for (var i = 0; i < localStorage.length; i++){
    var retrievedObject = localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject);
    createIdeaCard(parsedObject);
  }
}

function clearInputFields() {
  $('.idea-title-input').val('');
  $('.idea-input').val('');
  $('.idea-title-input').focus();
}

function searchIdea() {
  var searchValue = $('.search-bar').val().toLowerCase();
  var title = $('.idea-title-output').length;
  var body = $('.idea-body').length;
  for(var i = 0; i < body; i++) {
    for(var x = 0; x < title; x++) {
      if ($($('.idea-title-output')[i]).text().toLowerCase().includes(searchValue) || $($('.idea-body')[i]).text().toLowerCase().includes(searchValue)) {
        $($('.idea-title-output')[i]).parent().show();
      } else  {
        $($('.idea-title-output')[i]).parent().hide();
      }
    } 
  }
}

function saveIdea(event) {
  event.preventDefault();
  var newIdeaObject = new NewIdea($('.idea-title-input').val(), $('.idea-input').val());
  convertObjectToLocalStorage(newIdeaObject);
  createIdeaCard(newIdeaObject);
  clearInputFields();
}

function removeIdea() {
  $(this).parent().remove(); 
  var id = $(this).closest('article').data('associatedid');
  localStorage.removeItem(id);
}

function convertObjectToLocalStorage(newIdeaObject) {
  var stringifiedObject = JSON.stringify(newIdeaObject);
  localStorage.setItem(newIdeaObject.id, stringifiedObject);
}

function createIdeaCard (newIdeaObject) {
    $('.bottom-section').prepend(`
    <article class="idea" data-associatedid="${newIdeaObject.id}">
      <button class="remove-button"></button>
      <h3 class="idea-title-output" contenteditable="true">${newIdeaObject.ideaTitle}</h3>
      <p class="idea-body" contenteditable="true">${newIdeaObject.idea}</p>
      <button class="up-vote vote-area"></button>
      <button class="down-vote vote-area"></button>
      <p class="quality-id vote-area">quality: ${newIdeaObject.quality}</p>
    </article>`);
}

function upVote() {
  var id = $(this).closest('article').data('associatedid');
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  if (parsedObject.quality === 'swill') {
    parsedObject.quality = 'plausible';
    convertObjectToLocalStorage(parsedObject);
    $(this).siblings('.quality-id').text('quality: plausible');
  } else {
    parsedObject.quality = 'genius';
    convertObjectToLocalStorage(parsedObject);
    $(this).siblings('.quality-id').text('quality: genius');
  }
}

function downVote() {
  var id = $(this).closest('article').data('associatedid');
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  if (parsedObject.quality === 'genius') {
    parsedObject.quality = 'plausible';
    convertObjectToLocalStorage(parsedObject);
    $(this).siblings('.quality-id').text('quality: plausible');
  } else {
    parsedObject.quality = 'swill';
    convertObjectToLocalStorage(parsedObject);
    $(this).siblings('.quality-id').text('quality: swill');
  }
}

function editIdeaBody() {
  var id = $(this).closest('article').data('associatedid');
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.idea = $(this).text();
  if (event.which == 13) {
    convertObjectToLocalStorage(parsedObject);
  }
}

function editIdeaTitle() {
  var id = $(this).closest('article').data('associatedid');
  var retrievedObject = localStorage.getItem(id);
  var parsedObject = JSON.parse(retrievedObject);
  parsedObject.ideaTitle = $(this).text();
  if (event.which == 13) {
    convertObjectToLocalStorage(parsedObject);
  }
}






