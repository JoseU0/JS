var number = 0;

var p_search = false;


const fetch_pokemon = ()=> {
    $('.moves').hide();
    $('.abilities').hide();
    const poke_name = document.getElementById("poke_name");
    let pokeinput = 0;

    if (p_search){
        pokeinput = number;
    }
    
    else{
        pokeinput = poke_name.value.toLowerCase();
    }

    if(pokeinput) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokeinput}`;
        fetch(url).then((res) => {
            if (res.status != "200"){
                poke_image("assets/img/pikachu_angry.png");
                clean_text();
            }
            
            else{
              return res.json();

            }

        }).then((data) => {

            $('#name').text(`#${data.id} ${data.name.toUpperCase()}`);

            if(!data.types[1]){

                $('#type_info').text(data.types[0].type.name.toUpperCase());
            }
            
            else{

                $('#type_info').text(data.types[0].type.name.toUpperCase() + " / " + data.types[1].type.name.toUpperCase());
            }

            p_search = false;
            number = data.id;
            poke_image(data.sprites.front_default);
            
            poke_info(data.stats);
            abilities(data.abilities);
            moves(data.moves);

        })
    }
}

const poke_image = (url)=>{

    const poke_img = document.getElementById("poke_img")

    poke_img.src   = url
}


const poke_info = (stats) => {

    $('#hp').text(`HP: ${stats[0].base_stat}`);
    $('#atk').text(`ATK: ${stats[1].base_stat}`);

    $('#def').text(`DEF: ${stats[2].base_stat}`);
    $('#speed').text(`SPD: ${stats[5].base_stat}`);
    $('.basic_info').show();
}

const abilities = (abilities) =>{

    $('#first_ability').text(abilities[0].ability.name.toUpperCase());
    
    if(abilities[1]){

        $('#second_ability').text(abilities[1].ability.name.toUpperCase());
    }

    if (abilities[2]){

        $('#hidden_ability').text(abilities[2].ability.name.toUpperCase());

    }
}

const moves = (moves)=>{

    $('#first_move').text(`1.- ${moves[0].move.name.toUpperCase()}`);
    $('#second_move').text(`2.- ${moves[1].move.name.toUpperCase()}`);
    $('#third_move').text(`3.- ${moves[2].move.name.toUpperCase()}`);
}


$('#poke_name').on('keyup', function(event) {

    if(event.keyCode === 13){
        fetch_pokemon();
    }
});

$('.next').on('click', function(){

  p_search = true;
    if (number >= 0){
      number +=1
      fetch_pokemon();
    }
    
});

$('.previous').on('click', function(){

    p_search = true;
        if (number > 1){
        number -=1
        fetch_pokemon();
        }

});

$('#normal').on('click', function(){

    p_search = true;
    fetch_pokemon();

});

$('#abilities').on('click', function(){

    if(number >0){
        $('.basic_info').hide();
        $('.moves').hide();
        $('.abilities').show();
    }
});

$('#moves').on('click', function(){

    if(number >0){
        $('.basic_info').hide();
        $('.abilities').hide();
        $('.moves').show();
    }
});

const clean_text = ()=> {

    $('#hp').text('');
    $('#atk').text('');
    $('#def').text('');
    $('#speed').text('');
    $('#name').text('');
    $('#type_info').text('');
}

$('.reset').on('click', function(){
    $('#hp').text('');
    $('#atk').text('');
    $('#def').text('');

    $('#speed').text('');
    $('#name').text('');
    $('#type_info').text('');

    $('.basic_info').hide();
    $('.moves').hide();
    $('.abilities').hide();

    poke_image("./assets/img/pokeball.png");

});