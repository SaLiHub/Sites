
    let inputs = document.querySelectorAll('input')

    inputs.forEach(input => input.setAttribute("autocomplete","off"));
    
    let array1 = document.getElementsByClassName('places-card__title')
    let array2 = document.getElementsByClassName('hidden__title')
    for (let i = 0; i < array2.length; i++) {
        array2[i].innerHTML = array1[i].innerHTML
    }
    
    // Jquery 

    //  hiding .places-card__title when hover.
    // var n;
    // $( ".places-card" )
    //     .mouseover(function() {
    //          n = $( this ).find( ".hidden__title" ).text();
    //     $( this ).find( ".places-card__title" ).text( "" );
    //     }).mouseleave(function() {

    //     $( this ).find( ".places-card__title" ).text(n);
    //     });
     
