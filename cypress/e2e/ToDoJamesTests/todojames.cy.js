
//cy.visit()


it('Create new to do', () => {

    //1. priversti robota suvesti uzduoties pavadinima
    //1.1 turim pasirinkti ir patikrinti ar input egzistuoja
    //1.2 turim ivesti konkretu teksta i input
    
    
    //document.querySelector("p");
    //document.querySelector("#id");
    //document.querySelector(".class");

    // document.querySelector("p.header")
    // document.querySelector("h1#header")
    
    //document.getElementById('id')
    //document.getElementByClass('class') !!!!!!!!!!
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    // Patikrinti ar pirma uzduotis atsidure uzduociu sarase

});