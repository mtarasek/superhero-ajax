const BASE_URL = 'https://us-central1-itfighters-hero.cloudfunctions.net/';

getHeroList();

function getHeroList() {
    var url = BASE_URL + 'api/hero';
    $.get(url, function (heroes) {
        generateHeroesList(heroes);

    });
}

function generateHeroesList(heroes) {
    $('#superHeroes').html('');
    var allHeroes = '';
    for (let index = 0; index < heroes.length; index++) {
        const hero = heroes[index];
        allHeroes += `<li> ${hero.id} ${hero.superhero} ${hero.publisher} <button class='show-details' data-id=${hero.id}>Szczegóły</button> </li>`
    }
    var heroesList = $(allHeroes);
    $('#superHeroes').append(heroesList);

    $('.show-details').click(function () {
        var id = this.dataset.id;
        getSuperHero(id);
    });

    function getSuperHero(id) {
        var url = BASE_URL + 'api/hero/' + id;

        $.get(url, function (details) {
            $('#heroName').text(details.superhero);
            $('#heroPublisher').text(details.publisher);
            $('#heroCharacters').text(details.characters);
            $('#heroDescription').text(details.description);
            $('#heroPhoto').attr('src', details.url);
            $('#heroFirstAppearance').text(details.firstAppearance);
            $('#heroId').text(details.id);
        });
        $('#details').show();
    }
};

function additionNewHero() {
    var newHeroName = $('#superhero').val();
    var publisher = $('#publisher').val();
    var characters = $('#characters').val();
    var description = $('#description').val();
    var firstAppearance = $('#firstAppearance').val();

    var newHero = {
        characters: characters,
        description: description,
        firstAppearance: firstAppearance,
        publisher: publisher,
        superhero: newHeroName
    }
    console.log(JSON.stringify(newHero));
    $.ajax({
        url: BASE_URL + 'api/hero',
        method: 'post',
        data: newHero
    })
        .done(function (response) {
            console.log('Nowy bohater został dodany', response);
            getHeroList();
        })
        .fail(function (error) {
            console.log('Połączenie nieudane', error);
        })
}

window.onload = function () {
    $('#addNewHero').on('click', function () {
        additionNewHero();
    });
}