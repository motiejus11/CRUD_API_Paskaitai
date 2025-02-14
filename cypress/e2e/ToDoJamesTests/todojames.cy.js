
//cy.visit()
/// <reference types="cypress" />

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

    // 1 uzduotis arba bus null
    cy.contains('ul.todo-list li', '1 uzduotis').should('be.visible')
    // cy.get('ul.todo-list li')
    //ar 1 uzduotis li elementas yra matomas
    // cy.get('ul.todo-list li')
    //cypress bando ieskoti elemento li, kurio turinys yra 1 uzduotis
    

    // cy.get('ul.todo-list li').invoke('text').should('c')
    // Patikrinti ar pirma uzduotis atsidure uzduociu sarase

});

it('Delete new to do', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');
    
    // sudetingesnis variantas
    cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').invoke('show');
    cy.contains('ul.todo-list li', 'trinama uzduotis').find('button.destroy').click();

    //paprastesnis variantas
    // cy.contains('ul.todo-list li', 'trinama uzduotis').find('button').click({force: true});
    //mouseover - uzvedus pelyte kazkas atsitinka
    //mosuedown - paspaudus pelytes klavisa
    //mouseup - atleidus pelytes klavisa
    //...

    //ne tik paslepia elementa bet ir istrina jo koda

    // cy.contains('ul.todo-list li', 'trinama uzduotis').should('not.be.visible')
    cy.contains('ul.todo-list li', 'trinama uzduotis').should('not.exist');

    //sita veiksma atliksim po pertraukos
    


    //susikurti uzduoti x
    //sukurta uzduoti istrinti

})

it('To do item edit', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('2 uzduotis{enter}');
    cy.get('input.new-todo').type('3 uzduotis{enter}');


    //document.querySelector

    //contains

    // 2 uzduoti redaguosim
    cy.contains('ul.todo-list li', '2 uzduotis').dblclick();

    //uzduoties laukeli isvalysim ir tada pridesim teksta "redaguota uzduotis"
    cy.contains('ul.todo-list li', '2 uzduotis').find('input.edit').clear().type('redaguota uzduotis{enter}')


    cy.contains('ul.todo-list li', 'redaguota uzduotis').should('be.visible');

    // cy.get('.edit').clear();

})

it('Ar <header> elementas atvaizduojamas', () => {
    //patartina, rekomenduojama kad header elementas svetaineje butu tik vienas
    //<div class="header">
    //<table class="header">
    cy.visit('https://todolist.james.am/#/');
    cy.get('header').should('exist');
    cy.get('header').should('be.visible');
});

it('Ar headeryje(h1 tage) atvaizduojamas tekstas "To Do List"', () => {

    //Ar puslapis matomas vartotojui testas
    //class title/ page-title ...
    //pasirenku headeri
    //teksta kuris yra parasytas h1 tage
    //pagal SEO reikalavimus, h1 tagas irgi turi buti tik 1
    cy.visit('https://todolist.james.am/#/');
    cy.get('header h1').should('exist');
    cy.get('header h1').should('be.visible');
    
    cy.contains('header h1', 'To Do List').should('be.visible');
    cy.get('header h1').should('have.text', 'To Do List');

});

it("Ar atvaizduojamas 'Double-click to edit a todo' tekstas", () => {
   // 'Double-click to edit a toodo'
    //Ticket Ar atvaizduojamas 'Double-click to edit a todo ne, neatvaizduojama
    // footer svetaineje 1
    cy.visit('https://todolist.james.am/#/');
    
    //class info <div class="product">
    // <div class="info"> arba <div class="product-description"
    //              </div>
    
    //id - data-id - elementas.unikalia klase -> elementas
    cy.contains('footer.info p', 'Double-click to edit a toodo').should('exist');
    cy.contains('footer.info p', 'Double-click to edit a toodo').should('be.visible');
    // 'XPath'
    // '/html/body/div[1]/div/main/div/div/div[2]/div[3]/div[2]/div/div'

});
 it("Ar input laukelyje atvaizduojamas tekstas 'What need's to be done?'", () => {
    cy.visit('https://todolist.james.am/#/');


    //input tago atributa 'placeholder'
    
    //pameginti pasirinkti elementa kuris turi placholder atributa ir kurio reiksme yra What need's to be done?
    cy.get('input.new-todo[placeholder="What need\'s to be done?"]').should('exist');
    cy.get('input.new-todo[placeholder="What need\'s to be done?"]').should('be.visible');
    // cy.get('input.new-todo[placeholder]')
    cy.get('input.new-todo')
    .should('have.attr','placeholder', "What need's to be done?")
    .should('be.visible');
 });


 it("Ar pridėjus kelias užduotis, užduočių sąrašas nėra tuščias", () => {
    cy.visit('https://todolist.james.am/#/');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');
    cy.get('input.new-todo').type('1 uzduotis{enter}');
    cy.get('input.new-todo').type('trinama uzduotis{enter}');



    //document.querySelectorAll('ul li') - pati pirma ar visus?

    //each


    // cy.get('ul.todo-list li') - gauti visus li elementus esancius ul
    //cy.get jis gauna visus elementus
    //jis gauna visus 6 elementus

    cy.get('ul.todo-list li').each(($el) => {
        cy.log($el)
    })


    //as dar galiu atlikti testavimus individualiam kiekvieno saraso elementui
    cy.get('ul.todo-list li')
    .each(($el,$list) => {
    }) 
    .then(($list) => {
        expect($list).to.have.length(6);
    })


    //atlieku tiesiog bendro ilgio nustatyma
    cy.get('ul.todo-list li').should('have.length', 6);


    console.log()
    
    //1 variantas
    // pridejus 6 uzduotis
    //suskaiciuoti ul elementu sarasa li elementu turetu buti 6
    //elementu skaicius suskaiciuotu yra lygus ivestu, vadinas testas praejo

    //2 variantas
    //tiesiog tikrinti ar ne tuscias
    


    //3 variantas tiktrinti
    //uzduociu kiekis yra lygus item left kiekiui, ir sitas nepraeis

 });

//elementu skaiciavimo susiskaiciuoti kiek mes turim li saraso elementu