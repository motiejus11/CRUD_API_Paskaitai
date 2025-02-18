//elementu skaiciavimo susiskaiciuoti kiek mes turim li saraso elementu

//Svetaine prisijungimas ir registracija
//1.testuoti pacia registracija. Ar galima uzsiregistruoti?
//2. pati prisijungima. Ar galima prisijungti?
//3. Integracinis testas: Ar uzsiregistravus galima prisijungti?
//4. musu rasomas testas tures buti prisijunges prie svetaines, atsiminti kad jis yra prisijunges
//5. Kaip tas pats funkcionalumas yra atvaizduojamas prisijungusiam ir neprisijungusiam vartotojui

//Prisijungimo atsiminmas(sesijos isaugojimas)
//Sesija - serverio atminties vieta, kur svetainė gali išsaugoti informaciją
//Cookie - vieta vartotojo kompiuteryje, kur svetainė gali išsaugoti informaciją

//Kokią info saugau sesijoje? jautrūs duomenys - slaptažodis, prisijungimo vardas, prisijungimo tokenas, asmens informacija...
// Kokią info saugau cookie? viską, išskyrūs jautrią informaciją

//abiem galima nustatyti laiką, kiek jie egzistuoja

//Sukurti/gauti sausainiuka


//Ar sutinkate su slapukais popup testavimas?
it('Ar svetainė leidžia sukurti sausainiuką?', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.setCookie('test', 'test');
    cy.getCookie('test').should('exist');
})

//Ar informacija isisaugo po svetainės persikrovimo?
//1. Uzeiti i svetaine
//2. Sukurti informacini sausainiuka(JSON masyvas tekstiniame formate, kazkoks skaicius, tekstas ir t.t)
//3. Sukurti kelis sausiuniukus
//3.1 Sausainiuku informacija yra surasoma i div arba i ul ir .t.t
//4. Perkrauti svetaine
//5. Patikrinti ar sausainiukai isliko po perkrovimo

it('Ar informacija isisaugo po svetainės persikrovimo?', () => {
    cy.visit('https://todolist.james.am/#/');
    cy.setCookie('test', '1');
    cy.setCookie('test1', 'test1');
    cy.setCookie('test2', '{user: destytojas}');

    cy.reload();
// cy.visit('https://todolist.james.am/#/');

    //Po reload turim gauti cookie ir patikrinti ar jo vardas egzistuoja
    //set nustatyi, get -gauti
    cy.getCookie('test').should('exist');
    cy.getCookie('test1').should('exist');
    cy.getCookie('test2').should('exist');

    //patikriname cookie reiksmes
    cy.getCookie('test').should('have.property','value', '1');
    cy.getCookie('test1').should('have.property','value', 'test1');
    cy.getCookie('test2').should('have.property','value', '{user: destytojas}');

    //galim istrinti rankiniu budu cookies ir patikrinti ar jie nebeegzistuoja
    cy.clearCookies();
    // cy.clearCookie('test')
    cy.getCookie('test').should('be.null');
    cy.getCookie('test1').should('be.null');
    cy.getCookie('test2').should('be.null');
})

//ar visi testai po cookie sukurimo mato cookie?

it('Uzeina i svetaine ToDoList', () => {
    
    cy.visit('https://todolist.james.am/#/');
    cy.getCookie('test').should('exist');
    cy.getCookie('test1').should('exist');
    cy.getCookie('test2').should('exist');
    //sausainiukas cypress aplinkoje egzistuoja tik tam testui!
 })

 //Sesija

 it('Testas su sesija', ()=> {
    //sita vieta mes tiesiog esam isisaugoje
    //pati pirma karta kai mes paleidom testa
    //sesija isisaugojo
    // sito nebeatlieka
    cy.session('sesija',() => {
        cy.visit('https://todolist.james.am/#/');
        cy.get('input.new-todo').type('1 uzduotis{enter}');
        cy.setCookie('test', '1');
    })

    cy.visit('https://todolist.james.am/#/')
 })

//  it('Testas be sesijos', ()=> {
//         cy.visit('https://todolist.james.am/#/');
//         cy.get('input.new-todo').type('1 uzduotis{enter}');
//  })


