// var ideaTitle = $('.idea-title-input').val();
// var idea = $('.idea-input').val();
getLocalStorage();


function NewIdea(ideaTitle, idea) {
  this.ideaTitle = ideaTitle;
  this.idea = idea;
  this.id = (new Date).getTime();
}



$('.save-button').on('click', function (event) {
  event.preventDefault();
  // var ideaTitle = $('.idea-title-input').val();
  // var ideaBody = $('.idea-input').val();
  var newIdeaObject = new NewIdea($('.idea-title-input').val(), $('.idea-input').val());
  console.log(newIdeaObject);
  var stringifiedObject = JSON.stringify(newIdeaObject);
  localStorage.setItem(newIdeaObject.id, stringifiedObject);

  var retrievedObject = localStorage.getItem(newIdeaObject.id);
  var parsedObject = JSON.parse(retrievedObject);


  var $count = $('.bottom-section .idea').length;
//   ideaNumber();
  // console.log($('.bottom-section .idea').length);
  $('.bottom-section').prepend(`
    <article class="idea" id="${newIdeaObject.id}">
      <button class="remove-button"></button>
      <h3 class="idea-title-output">${newIdeaObject.ideaTitle}</h3>
      <p class="idea-body">${newIdeaObject.idea}</p>
      <button class="up-vote vote-area"></button>
      <button class="down-vote vote-area"></button>
      <p class="quality-id vote-area">quality: swill</p>
    </article>`);
})

$('.bottom-section').on('click', '.remove-button', function() {
  $(this).parent().remove(); 
  // ideaNumber();
  // localStorage.remove();
})



function ideaNumber() {
  $('.bottom-section .idea').length;
  console.log($('.bottom-section .idea').length);
}

function removeIdea() {
  localStorage.removeItem($('.bottom-section newIdeaObject.id'));
}

function getLocalStorage() {
  for (var i = 0; i < localStorage.length; i++){
    console.log(localStorage.key(i));
    var retrievedObject =localStorage.getItem(localStorage.key(i));
    var parsedObject = JSON.parse(retrievedObject)

    // console.log(parsedObject.idea);

    $('.bottom-section').prepend(`
      <article class="idea" id="${parsedObject.id}">
        <button class="remove-button"></button>
        <h3 class="idea-title-output">${parsedObject.ideaTitle}</h3>
        <p class="idea-body">${parsedObject.idea}</p>
        <button class="up-vote vote-area"></button>
        <button class="down-vote vote-area"></button>
        <p class="quality-id vote-area">quality: swill</p>
      </article>`);

  }
}





