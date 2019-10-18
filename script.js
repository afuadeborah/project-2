const raps = {};

// Variable Declaration
// Ticketmaster Game Variables
raps.gamesApiKey = 'bTDdH2M6LG5xlXjLYgM6g2xJnQJgtML1';
raps.gamesBaseUrl = 'https://app.ticketmaster.com/discovery/v2';

const showMyShirt = 2500;


// -------------------------------------------------------------
// For each individual game

// THIS IS THE BEGINNING OF THE PART I'D LIKE TO HIGHLIGHT

// ----------- ARRAY DATA MASSAGE ------------
raps.displayGames = () => {
    
    const getGameDetails = raps.getGames();
    // The returned promise is contained in the getGames function
    $.when(getGameDetails).done(function(data){
    // Show Events
        const eventData = data._embedded.events;
        console.log(eventData); 
        
    // Only home games
        const homeArray = eventData.filter(event => {
            return event._embedded.venues[0].name === 'Scotiabank Arena';
            });
        console.log(homeArray);


        const homeName = homeArray.map(event => {
            return event.name;
        
        });
        console.log(homeName);

        const buyTicket = homeArray.map(event =>{
            return event.url;
        });

        console.log(buyTicket);
        
// The last game in the array is a Raptors905 game, not a regular season game. I mean good for them, but I don't need it.
        const onlyRapsHomeArray= homeName.pop();
        console.log(onlyRapsHomeArray);
        

// PUT NAMES IN DROPDOWN
    homeName.forEach(function(gameName){
        const htmlToAppend = 
        `
        <option>${gameName}</option>
        
        `;
        $('select').append(htmlToAppend);

    });




// EMPTY THE DROPDOWN AFTER SELECTION
raps.getSelectValue = () =>
    $('#submitWeather').change( () => {
// When we select a game from the dropdown

    const selection = $('option:selected').val();
        // Pull the value that comes out

    $('option').empty();
    $('.torontoWeather').empty();
        // Will reset the function so we can select another season

        // HELP HERE PLS
    });



        
// BUY TICKETS ON TICKETMASTER 
    $('.gameForm').on('submit', function(eventParameter){
        eventParameter.preventDefault();

// Splitting URL to pass back into the appeneded a element
        const singleUrl = homeArray[0].url;
        const splitUrl = singleUrl.split('/');
        const urlResult = splitUrl[3] + '/' + splitUrl[4] + '/' + splitUrl[5];
        
        console.log(urlResult);

        

        const goToTicketmaster= `
        
        <a href="https://www.ticketmaster.ca/${urlResult}" target="_blank">Cop your tickets here.</a>
        `;
        
        $('.gamePic').html(goToTicketmaster);
        console.log(goToTicketmaster);    

    });  
        
    
    
});
}

// THIS IS THE END OF THE PART I'D LIKE TO HIGHLIGHT.


// **I've managed to get the first entry in the array to pass through this function, but I'm having a hard time making it dynamic so that it loops but I'd love feedback on how to do so!**
    



// Weather Form
$('.weatherForm').on('submit', function(eventParameter){
    eventParameter.preventDefault(); 


    const weatherInput = $('#torontoWeather').val();

        if (weatherInput >= -10 && weatherInput < 10){
    
            $('.warm').fadeOut('slow'); 
            $('.hot').fadeOut('slow');
            // cold
            $('.result').text('It\'s cold out!').show() 

            setTimeout (function(){
                $('#hoodie').show();
                $('#hoodieSwag').show();
                $('.swag').text('Don\'t try and flex. Go put on the hoodie.').show();
            }, showMyShirt);


        } else if (weatherInput >= 10 && weatherInput < 25){
            $('.cold').fadeOut('slow'); 
            $('.hot').fadeOut('slow');
            // warm
            $('.result').text('So it\'s not cold, but it\'s not hot out my guy.').show();
    
            setTimeout (function(){
                $('#tshirt').show();
                $('#tshirtSwag').show();
                $('.swag').text('Stunt in the t-shirt still').show();
            }, showMyShirt);


        } else if (weatherInput >= 25 && weatherInput <= 40){
            $('.warm').fadeOut('slow'); 
            $('.cold').fadeOut('slow');
            // hot
            $('.result').text('It\'s hot out!').show();
            

            setTimeout (function(){
                $('#jersey').show();
                $('#jerseySwag').show();
                $('.swag').text('Flex in your jersey.').show();
            }, showMyShirt);

            
        } else if (weatherInput < -10 && weatherInput > -45) {
            $('.iconBox').fadeOut('slow'); 
            $('#nahFam').show();
            $('h4').hide();

        } else if (weatherInput > 40 && weatherInput <= 45){
            $('.iconBox').fadeOut('slow'); 
            $('#nahFam').show();
            $('h4').hide();
        };

        if (weatherInput <= -46 || weatherInput >= 46){
            alert('Chill out fam.');
        };

        
});
    





    











// --------------------------------------------
// Get Raptors game info from API
raps.getGames = (games) => {

    const gamesPromise = $.ajax({
        type: `GET`,
        url:`${raps.gamesBaseUrl}/events.json?size=200&keyword=raptors&apikey=${raps.gamesApiKey}`,
        async: true,
        dataType: 'json',
    
    });
        
    return gamesPromise;

};



    
    



    

    










// When using .filter() we want a return statement that are t/f which will tell us if the item should be ADDED or NOT ADDED to the NEW FILTERED ARRAY
// API Scope
// This is where I'd retrieve data for each game of the season

// -------------------------------------











// --------------------------------------------
// Init Command
// This is all the info we want ready when OUR APP loads
raps.init = function(){
    raps.displayGames();
    
    
    
    
}
// Init Scope



// -------------------------------------------
// Document Ready
// This is info we want ready when the DOM WINDOW loads
$(function(){
    raps.init();
    raps.getGames();
});




// All credits to Ticketmaster.com for API info, and The National Basketball Association. 


