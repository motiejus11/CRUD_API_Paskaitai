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
    cy.request("POST", "localhost:3000", {
        title: "naujaPrekė",
        description: "naujasAprasymas",
        price: 4.99
    }).then((response)=> {

    });
    cy.log('pasiruosiau testui')
});

it('/products update bendras testas', () => {

    cy.log('pasiruosiau testui')
});

it('/products delete bendras testas', () => {

    cy.log('pasiruosiau testui')
});
  });    



//users
//endpoint n+1

});