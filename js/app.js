$(document).ready(function(){ // chargement de la page 

	var array = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

	for(var i = 0; i < array.length; i++){
		$('#la').append('<button type="button" data-letter="'+ array[i] +'" class="btn btn-md btn-primary">'+ array[i] +'</button>');
	}

	$('button').click(function(){
		
		var letter;
		var name;
		var image;
		var donnee;

		letter = $(this).html();
		console.log(letter);

		$.ajax({
			
			url:'https://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=' + letter + '&ts=100&apikey=d36004c7fdb6d16975cd8c49378aa53f&hash=649ecd7062668f2a5dc06ea612d1a6da',

			success:function(data){

				$('#ici').html("");

				for(var i = 0; i < data.data.results.length; i++){

					donnee = data.data.results[i];
					name = data.data.results[i].name;
					image = "<img src='" +donnee.thumbnail.path+"."+donnee.thumbnail.extension+"'/>"
					$('#ici').append('<tr class="hero"><td>'+ name +'</td>'+'<td>'+ image +'</td>'+'</tr>');

				}
				new List('test-list', {
					valueNames: ['hero'],
					page: 5,
					pagination: true
				});
			}
			
		})
		
	})

}); // fin du ready function 

