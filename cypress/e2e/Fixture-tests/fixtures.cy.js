//uzkrauti duomenu faila ir cy.loge atvaizduoti duomenis

/// <reference types="cypress" />


it('Fixtures works', () => {
    // / fixtures/users.json
    cy.fixture('users').as('usersJson').then((users)=> {
        cy.log(users)
    });

    // fixtures/users.json
    cy.fixture('example').as('exampleJson').then((example) => {
        cy.log(example)
    }); //fixtures/example.json
    cy.fixture('products').as('productsCsv').then((products) => {
        cy.log(products)
    }) 
    //fixtures/products.csv
    // cy.fixture('productsssssssssssss') //fixtures/productsssssssssssss.csv nera
});

//1.TodoJames svetaine, mes galime pasidaryti faila todojames.json, sukurti 100 todos ir juos suvesti i uzuodciu sarasa. 
//2.Fixture(duomenu faila) panaudoti intercepte. Mes vien1 html faila keiciame kitu. GoSign iframe mes ji galime periimti ir iterpi savo html
//3.Saugumo testas. Mini brute force ataka. 1000 vartotoju. Kas 1sekunde bando prisijungti
//7 bandymu prisijungti svetaine nebeleidzia jungtis

