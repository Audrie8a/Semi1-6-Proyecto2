$(document).ready(function(){
	var messages = [];
	var socket 	 = io.connect('http://localhost:3000');
	var field 	 = $('#field');
	var name 	 = $('#name');

	socket.on("message", function(data){
		if(data.message){
			messages.push(data);

			var html = '';

			for(var i = 0; i < messages.length; i++){
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
			}

			$('#content').html(html);
		}else {
            console.log("There is a problem:", data);
        }
	});

	$('#send').click(function(){
		if(name.val() == ""){
			alert("Ingrese su nombre.");
		}else{
			$('#name').attr('disabled', 'disabled');

			var texto = field.val();
			socket.emit('send', {message: texto, username: name.val()});
			field.val("");
		}
	});
});