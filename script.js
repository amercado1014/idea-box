$('.save-button').on('click', function (event) {
  event.preventDefault();
  console.log('click')
  var ideaTitle = $('.idea-title-input').val();
  var ideaBody = $('.idea-input').val();
  console.log( ideaTitle, ideaBody);
  $('.bottom-section').prepend(`
    <article class="idea">
      <h3 class="idea-title-output">${ideaTitle}</h3>
      <button class="remove-button"></button>
      <p class="idea-body">${ideaBody}</p>
      <button class="up-vote vote-area"></button>
      <button class="down-vote vote-area"></button>
      <p class="quality-id vote-area">quality: swill</p>
    </article>`);
})

$('.bottom-section').on('click', '.remove-button', function () {
  console.log('remove click');
  $(this).parent().remove();
})
