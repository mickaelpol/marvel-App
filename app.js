$(document).ready(function(){ // chargement de la page 


	// variable qui m'es en majuscule et split par simple coat les lettres de l'alphabet pour les boutons
	var alphabet = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split('');


	// boucle pour parcourir l'alphabet et les afficher dans les boutons
	for(var i = 0; i < alphabet.length; i++){
		$('#boutonAlphabet').append('<button type="button" data-letter="'+ alphabet[i] +'" class="btn btn-md btn-primary pageA">'+ alphabet[i] +'</button>');
	}

	// fonction du clic sur le bouton
	$('button').click(function(){
		
		// initialisation des variables qui vont stocker mes requetes
		var letter;
		var name;
		var image;
		var donnee;

		// stockage de la data du letter au clic du bouton
		letter = $(this).data('letter');

		// requete ajax qui recupere les heros marvel + une lettre commencent par la lettre cliqué
		$.ajax({
			
			url:'https://gateway.marvel.com/v1/public/characters?limit=100&nameStartsWith=' + letter + '&ts=100&apikey=d36004c7fdb6d16975cd8c49378aa53f&hash=649ecd7062668f2a5dc06ea612d1a6da',

			success:function(data){

				$('#tableau').html("");

				// boucle pour parcourir le tableau des requetes
				for(var i = 0; i < data.data.results.length; i++){ 

					// stockage des requete dans variables
					donnee = data.data.results[i];
					name = data.data.results[i].name;
					image = "<img src='" +donnee.thumbnail.path+"."+donnee.thumbnail.extension+"'/>"
					description = donnee.description;
					nbcomics = donnee.comics.available;
					id = donnee.id;
					nbstories = donnee.stories.available;
					nbseries = donnee.series.available;
					
					// affichage du tableau avec concacténation des infos
					// affichage de l'id du nom de l'image de la description du nombres de comics de stories et de series
					$('#entete').html('<tr>' + '\
						<th class="text-uppercase">id</th>' + '\
						<th class="text-uppercase">image</th>' + '\
						<th class="text-uppercase">Nom</th>' + '\
						<th class="text-uppercase">Description</th>' + '\
						<th class="text-uppercase">Nb Comics</th>' + '\
						<th class="text-uppercase">Nb Stories</th>' + '\
						<th class="text-uppercase">Nb Series</th>' + '\
						</tr>');
					$('#tableau').append('\
						<tr class="hero">'+ '\
						<td class="name">'+ id +'</td>'+'\
						<td class="image">'+ image +'</td>'+'\
						<td class="nom">' + name + '</td>'  + '\
						<td class="description">' + description + '</td>' + '\
						<td class="nbcomics">' + nbcomics + '</td>' + '\
						<td class="nbstories">' + nbstories + '</td>' + '\
						<td class="nbseries">'+ nbseries + '</td>' +'\
						</tr>');

					// console.log(donnee);

				}
				// pagination lié au tableau 
				new List('liste', {
					valueNames: ['hero'],
					page: 5,
					pagination: true
				});
			}
			
		})
		
	})

}); // fin du ready function 

