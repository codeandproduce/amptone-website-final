var socket = io();
$('#emailContactForm').on('submit', function(e){
  e.preventDefault();
  socket.emit('contact-form-submit',{
    name: $('[name=nameInputContact]').val(),
    email:$('[name=emailInputContact]').val(),
    subject: $('[name=subjectInputContact]').val(),
    message: $('[name=messageInputContact]').val()
  });
});

socket.on('contact-form-processing', function(){
  $('#submitContactFormButton').text('Processing...');
  $('#submitContactFormButton').css('color','#dd5e5e');
  $('#submitContactFormButton').css('background-color','white');
  $('#submitContactFormButton').css('border-color', '#dd5e5e');
  $('#submitContactFormButton').attr('disabled','disabled');
});
socket.on('contact-form-success', function(){
  $('#emailContactForm').css('display','none');
  $('.contact-empty').toggleClass('contact-done');

});
