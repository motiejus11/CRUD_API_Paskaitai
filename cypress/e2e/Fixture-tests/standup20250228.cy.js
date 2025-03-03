//neveikia hover

it.only('Test Case 12: Add Products in Cart', () => {
    cy.visit('https://automationexercise.com/');
 
    cy.url().should('eq', 'https://automationexercise.com/');
    cy.get('body').should('be.visible');
 
    cy.get('ul.navbar-nav li').contains('Products').click();
   
    cy.get('.productinfo').eq(0).trigger('mouseover');
    cy.wait(1000);
    cy.get('div.productinfo').eq(0).contains('Add to cart').click({force: true} ); // reikia pataisyti tinkamai
    cy.get('[data-dismiss="modal"]').click();
   
    cy.get('div.single-products').eq(1).trigger('mouseover');
    cy.wait(1000);
    // cy.get('div.productinfo').eq(1).contains('Add to cart').click();
    // cy.get('.overlay-content .add-to-cart').eq(1).click({force: true});
    cy.get('.overlay-content .add-to-cart').eq(1).click({force: true});

    cy.get('div.modal-body a[href="/view_cart"]').click();
 
    cy.get('tbody').contains('Blue Top').should('be.visible');
    cy.get('tbody').contains('Men Tshirt').should('be.visible');
   
    cy.get('#product-1 .cart_price').contains('Rs. 500');
    cy.get('#product-1 .cart_quantity').contains('1');
    cy.get('#product-1 .cart_total').contains('Rs. 500');
 
    cy.get('#product-2 .cart_price').contains('Rs. 400');
    cy.get('#product-2 .cart_quantity').contains('1');
    cy.get('#product-2 .cart_total').contains('Rs. 400');
 
  });





  //14,15, 16 ir 17 ir 18 teste zinute 
// bootstrap zinutes nepaima.

describe("Test Case 14: Place Order: Register while Checkout", () => {
    it("Test case14", () => {


      // 1. Launch browser & 2. Navigate to URL
      cy.visit("https://automationexercise.com");
   
      // 3. Verify that home page is visible
      cy.get("body").should("be.visible");
      cy.url().should("include", "automationexercise.com");
   
      //4. Add products to cart
      cy.get(".features_items .product-image-wrapper")
        .first()
        .trigger("mouseover")
        .within(() => {
          cy.contains("Add to cart").click();
        });
   
      cy.contains("Continue Shopping").click();
   
      cy.get(".features_items .product-image-wrapper")
        .eq(1)
        .trigger("mouseover")
        .within(() => {
          cy.contains("Add to cart").click();
        });
   
      cy.contains("Continue Shopping").click();
   
      //5. Click 'Cart' button
      cy.contains("Cart").click();
   
      //6. Verify that cart page is displayed
      cy.url().should("include", "/view_cart");
   
      //7. Click Proceed To Checkout
      cy.contains("Proceed To Checkout").click();
   
      //8. Click 'Register / Login' button
      cy.contains("a", "Register / Login").should("be.visible").click();
   
      //9. Fill all details in Signup and create account & 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
      cy.fixture("user").then((fakerUser) => {
        const { username, email, password } = fakerUser.user;
   
        cy.loginOrRegisterAndLoginUser(username, email, password);
   
        //11. Verify ' Logged in as username' at top
        cy.get("li > a")
          .should("be.visible")
          .and("contain.text", `Logged in as ${username}`);
      });
   
      //12.Click 'Cart' button
      cy.contains("Cart").click();
   
      //13. Click 'Proceed To Checkout' button
      cy.contains("Proceed To Checkout").should("be.visible").click();
   
      //14. Verify Address Details and Review Your Order
      cy.get('[data-qa="checkout-info"]').should("be.visible");
     
      //Delivery
      cy.get("#address_delivery").should("be.visible");
      cy.get("#address_delivery .address_firstname address_lastname").should("contain.text", "Mr. Alice Enough");
      cy.get("#address_delivery .address_address1 address_address2").should("contain.text", "Test Company");
      cy.get("#address_delivery").should("contain.text", "123 Test Street");
      cy.get("#address_delivery").should("contain.text", "Apt 200");
      //cy.get("#address_delivery").should("contain.text", "Red Deer Alberta T4E 0B2");
      cy.get("#address_delivery").should("contain.text", "Canada");
      cy.get("#address_delivery").should("contain.text", "+1234567890");
     
      //Billing
      cy.get("#address_invoice").should("be.visible");
      cy.get("#address_invoice .address_firstname ").should("contain.text", "Mr. Alice Enough");
      cy.get("#address_invoice").should("contain.text", "Test Company");
      cy.get("#address_invoice").should("contain.text", "123 Test Street");
      cy.get("#address_invoice").should("contain.text", "Apt 200");
      //cy.get("#address_invoice").should("contain.text", "Red Deer Alberta T4E 0B2");
      cy.get("#address_invoice").should("contain.text", "Canada");
      cy.get("#address_invoice").should("contain.text", "+1234567890");
   
      //Order
      cy.get("#cart_info").should("be.visible");
   
      //Blue Top
      cy.get("#product-1")
        .should("be.visible")
        .within(() => {
          cy.get(".cart_description h4").should("contain.text", "Blue Top");
          cy.get(".cart_price p").should("contain.text", "Rs. 500");
          //cy.get(".cart_quantity button").should("contain.text", "1");
          //cy.get(".cart_total .cart_total_price").should("contain.text", "Rs. 500");
        });
   
      //Men Tshirt
      cy.get("#product-2")
        .should("be.visible")
        .within(() => {
          cy.get(".cart_description h4").should("contain.text", "Men Tshirt");
          cy.get(".cart_price p").should("contain.text", "Rs. 400");
          //cy.get(".cart_quantity button").should("contain.text", "1");
          //cy.get(".cart_total .cart_total_price").should("contain.text", "Rs. 400");
        });
   
      //Total price
      //cy.get(".cart_total_price").should("contain.text", "Rs. 900");
   
   
      //15. Enter description in comment text area and click 'Place Order'
      cy.get(".form-control").type("Please deliver between 9 AM - 5 PM. Other times I'll be hungry like a wolf");
      cy.contains("Place Order").click();
   
      //16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
      cy.get('[data-qa="name-on-card"]').type("Duran Duran");
      cy.get('[data-qa="card-number"]').type("123456789");
      cy.get('[data-qa="cvc"]').type("123");
      cy.get('[data-qa="expiry-month"]').type("03");
      cy.get('[data-qa="expiry-year"]').type("2025");


      //paspaudus mygtukas pay, tvirtiname apmokejimo forma
      //yra pagal numatytuosius nustatymus suprogramuoti du veiksmai: parodyti zinute ir ivykdyti svetaines perkrovima
      //parodyti zinute - patvirtinus forma, perkrovimas ivyksta - paspaudus mygtuka
      // isjungti formos numatytuosius nustatymus


      //1. atsiranda zinute "Your order has been placed successfully!"
      //2. sita zinute atsiranda akimirkai ir svetaine pereina i kita puslapi(refreshinasi)

      //isjungiu persikrovima      
      //sustabdyti formos numatytaji veikima  
      cy.get('form#payment-form').then(($form) => {
        $form.on('submit', (e) => {
            e.preventDefault(); // Stop the form from being submitted automatically
        });
      });

      //paspausti formos mygtuka ranka
      //17. Click 'Pay and Confirm Order' button
      cy.get('[data-qa="pay-button"]').click();
   
      //18. Verify success message 'Your order has been placed successfully!'
     cy.get("#success_message > .alert-success").should("contain.text", "Your order has been placed successfully!");

     cy.get('form#payment-form').then(($form) => {
      $form.off('submit');
    });
cy.get('[data-qa="pay-button"]').click();

      
      //19. Click 'Delete Account' button
      cy.contains("Delete Account").click();
      //20. Verify 'ACCOUNT DELETED!' and click 'Continue' button
      cy.contains("Account Deleted!").should("be.visible");
      cy.get("a[data-qa='continue-button']").click();
    });
  });



// cy.get value