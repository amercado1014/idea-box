
getLocalStorage();


function NewIdea(ideaTitle, idea) {
  this.ideaTitle = ideaTitle;
  this.idea = idea;
  this.id = (new Date).getTime();
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
      <p class="quality-id vote-area">quality: swill</p>
    </article>`);
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
        <p class="quality-id vote-area">quality: swill</p>
      </article>`);

  }
}






