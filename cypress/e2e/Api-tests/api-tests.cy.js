// const { response } = require("express");



describe('CRUD_API', () => {




context('/products', () => {  
    
    context('/products atskiri testai', () => {
        it('/products status kodas 200', ()=> {
            cy.request("GET", "localhost:3000/products").then((response) => {
                expect(response.status).to.be.eq(200);
            });
        });
        it('/products atsakymo laikas', ()=> {
            cy.request("GET", "localhost:3000/products").then((response) => {
                expect(response.duration).to.be.lessThan(1000);
            });
        });
        it('/products netuscias', ()=> {
            cy.request("GET", "localhost:3000/products").then((response) => {
                expect(response.body).length.to.be.greaterThan(1);
            });
        });          
    });    
    
    it('/products endpoint bendras testas', () => {

    cy.request("GET", "localhost:3000/products").then((response) => {
        //patikrinti status koda
        expect(response.status).to.be.eq(200);
        //response
        expect(response.duration).to.be.lessThan(1000);//1sec
        expect(response.duration).to.not.be.greaterThan(1000);
        expect(response.duration).to.be.below(1000);

        //patikrinti response.body
        expect(response.body).length.to.be.above(1);
        //Statusas 200 iur gaunam produktus
        //{0,1,2 ...}
        //400 error
        //{
        // error: 'kazkas negerai'
        // }
        
        console.log('test');
        cy.log('test');
        console.log('pakeitimas')

        //response.body turi elementa products 
        // error elemento tikrinimas

        console.log(response.body);
        cy.log(response.body);
        //visi produktai response.body


        // expect()
    });

});


it('/products vieno produkto bendras testas', () => {

    cy.request("GET","localhost:3000/products/2" ).then((response)=>{
        expect(response.status).to.be.eq(200);
        // expect(response.body).length.to.be.above(0); //ilgis daugiau nei 0
        expect(response.body).to.have.property('id', 2); //error - sita vieta nepraeis
        expect(response.body).to.have.property('title', 'Antra prekė');

        // expect(response.body).to.have.property('title');
        
        // expect()
        // id == 2 arba title == "Antra prekė" nebutu tuscias
        cy.log(response.body.id);
        cy.log(response.body.title);
        // expect(response.body).length.to.be.greaterThan(0);
        cy.log(response.body);
    });

    cy.log('pasiruosiau testui')
});
it('/products create bendras testas', () => {
    cy.request("POST", "localhost:3000/products", {
        title: "naujaPrekė",
        description: "naujasAprasymas",
        price: 4.99
    }).then((response)=> {
        //statusa
        expect(response.status).to.be.eq(201);
        //ar bus id
        expect(response.body).to.have.property('id'); //error - sita vieta nepraeis
        expect(response.body).to.have.property('title', 'naujaPrekė');
        expect(response.body).to.have.property('description', 'naujasAprasymas');
        expect(response.body).to.have.property('price', 4.99);
        cy.log(response.body);
    });
});

it('/products update bendras testas', () => {
    cy.request("PUT", "localhost:3000/products/3", {
        title: "redaguotaPrekė",
        description: "redaguotasAprasymas",
        price: 5.99
    }).then((response)=> {
        
        cy.log(response.body);
        //statusa
        expect(response.status).to.be.eq(200);
        //ar bus id
        expect(response.body).to.have.property('id', 3); //error - sita vieta nepraeis
        expect(response.body).to.have.property('title', 'redaguotaPrekė');
        expect(response.body).to.have.property('description', 'redaguotasAprasymas');
        expect(response.body).to.have.property('price', 5.99);
        cy.log(response.body);
    });
});

it('/products delete bendras testas', () => {
    cy.request('DELETE', "localhost:3000/products/28").then((response) => {
        expect(response.status).to.be.eq(200);

        //1 atvejis tikriname tik message
        expect(response.body).to.have.property('message')


        //2 atvejis tikriname message ir konkrecia zinute

        // expect(response.body).to.have.property('message', 'Elementas sėkmingai ištrintas')
        //1. ar yra message?
        //2. ar tas message yra konkretus
        // expect(response.body).to.have.property('message', 'Elementas sėkmingai ištrintas')
        cy.log(response.body)
    });
});
  });    



//users
//endpoint n+1

});