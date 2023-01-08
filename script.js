// prvo pravimo listu pitanja...
var mojaPitanja = [
	{
		tekst: "Ko je najkulji?",
		odgovori: {
			a: 'Dzontra',
			b: 'aTomik',
			c: 'iTomik'
		},
		indeks_korektnog_odgovora: 'a'
	},
	{
		tekst: "Da li je aTomik slikala?",
		odgovori: {
			a: 'Ne zna da li je slikala',
			b: 'Slikala je',
			c: 'Nema šanse da je slikala'
		},
		indeks_korektnog_odgovora: 'c'
	},
	{
		tekst: "Na kojoj planeti se nalazi Tihi okean?",
		odgovori: {
			a: 'Mars',
			b: 'Durmitor',
			c: 'Zemlja'
		},
		indeks_korektnog_odgovora: 'c'
	},
	{
		tekst: "Naziv monumentalne knjige naše spisateljice, umetnice i intelektualke Vesne Vukelić Vendi?",
		odgovori: {
			a: 'Izađi na pet minuta',
			b: 'Misterija crne žene',
			c: 'Slatko nakiselo'
		},
		indeks_korektnog_odgovora: 'b'
	},
	{
		tekst: "Na kojoj planeti se nalazi Tihi okean?",
		odgovori: {
			a: 'Mars',
			b: 'Durmitor',
			c: 'Zemlja'
		},
		indeks_korektnog_odgovora: 'c'
	},
		{
		tekst: "iTomik je polomila šta?",
		odgovori: {
			a: 'Nogicu',
			b: 'Rukicu',
			c: 'Glavicu',
			d: 'Nokat'
		},
		indeks_korektnog_odgovora: 'a'
	},
		{
		tekst: "Ko je bio Steve Jobs?",
		odgovori: {
			a: 'Norodnjak',
			b: 'Carina',
			c: 'Slepac',
			d: 'Neam pojma'
		},
		indeks_korektnog_odgovora: 'b'
	},
		{
		tekst: "Sa kojom životinjom se poistovećuje naš preCednik AV?",
		odgovori: {
			a: 'Pacov',
			b: 'Konj',
			c: 'Zmija',
			d: 'Vuk',
			e: 'Slepi miš'
		},
		indeks_korektnog_odgovora: 'd'
	},
		{
		tekst: "Kako se pravilno piše/kaže?",
		odgovori: {
			a: 'Garnišna',
			b: 'Garnišla',
			c: 'Karniša'
		},
		indeks_korektnog_odgovora: 'c'
	},
	
	{
		tekst: "Ko je potopio splav?",
		odgovori: {
			a: 'Senidahhh',
			b: 'Stanija',
			c: 'Stoja'
		},
		indeks_korektnog_odgovora: 'c'
	}
];
// Random za listu gore napravljenih pitanja...
const shuffled = mojaPitanja.sort(() => 0.5 - Math.random());
let randomPitanja = shuffled.slice(0, 5); // izvlačimo 5 random pitanja


function generisiKviz(teksts, quizContainer, rezContainer, posaljiDugme){

	function prikazPitanja(teksts, quizContainer){
	// prostor za output i opcije odgovora
	var output = [];
	var odgovori;

	// za svako pitanje...
	for(var i=0; i<teksts.length; i++){
		
		// prvo resetujemo listu odgovora
		odgovori = [];

		// za svaku opciju odgovora na dato pitanje...
		for(letter in teksts[i].odgovori){

			// ...dodajemo radio button
			odgovori.push(
				'<label>'
					+ '<input type="radio" name="tekst'+i+'" value="'+letter+'">'
					+ letter + ': '
					+ teksts[i].odgovori[letter]
				+ '</label>'
			);
		}

		// dodajemo specificno pitanje i odgovore za dato pitanje
		output.push(
			'<div class="pitanje"><div class="tekst">' + teksts[i].tekst + '</div>'
			+ '<div class="odgovori">' + odgovori.join('') + '</div></div>'
		);
	}

	// finalni output koji se stavlja na stranicu
	quizContainer.innerHTML = output.join('');
}

	function showResults(teksts, quizContainer, rezContainer){
	
	// prikupljanje odgovora iz celog kviza
	var answerContainers = quizContainer.querySelectorAll('.odgovori');
	
	// sacuvati odgovore korisnika..
	var userAnswer = '';
	var numCorrect = 0;
	
	// za svako pitanje...
	for(var i=0; i<teksts.length; i++){

		// pronalazenje svakog odgovora
		userAnswer = (answerContainers[i].querySelector('input[name=tekst'+i+']:checked')||{}).value;
		
		// ako je odgovor tacan
		if(userAnswer===teksts[i].indeks_korektnog_odgovora){
			// dodati na sumarnu listu i sabrati koliko je tacnih...
			numCorrect++;
			
			// tacni odg zeleni
			answerContainers[i].style.color = 'green';
		}
		// ako je odgovor netacan ili prazan
		else{
			// boja je, logicno, crvena...
			answerContainers[i].style.color = 'red';
		}
	}

	// prikaz ukupnog broja tacnih odgovora od sumarnog broja pitanja
	rezContainer.innerHTML = numCorrect + ' pogođenih od ukupno ' + teksts.length;
}

	// prikaz odgovora
	prikazPitanja(teksts, quizContainer);

	// kad se klikne "posalji" dugme prikaz rezultata
	posaljiDugme.onclick = function(){
		showResults(teksts, quizContainer, rezContainer);
	}
}

var quizContainer = document.getElementById('quiz');
var rezContainer = document.getElementById('results');
var posaljiDugme = document.getElementById('submit');
