describe('My First CRM Test', function() {

context('Login step', function () {
    beforeEach(function () {
         cy.visit('https://demo.suiteondemand.com/index.php')
        cy.get('#user_name')
            .type('WILL')
        cy.get('#username_password')
            .type('will')
        cy.contains('Log In').click() 
        cy.url()
            .should('include' , 'module=Home')
        cy.contains('SUITECRM DASHBOARD').should('be.visible')
        cy.contains('My Activity Stream')
            .should('be.visible')
    })

//not figured out yet
    it('login directly thru request', function(){
        cy.request({
            method: 'POST',
            url: 'index.php?module=Users&action=Login',
            form: true,
            body:{
                user_name: 'will',
                username_password: 'will'
            }
        })
        cy.setCookie('name','ck_login_id_20')
            .setCookie('value','seed_will_id')
        cy.visit('?module=Home')
        cy.url()
        cy.contains('SUITECRM DASHBOARD').should('be.visible')
    })

    it.only('Visits Suite CRM site and navigate to Accounts', function() {
        //arrange
       
            cy.contains('All').click()
            //.trigger('mouseover', 'right')
            cy.get('.open')
                    .find('a').contains('Accounts')
                    .click() 
               // cy.contains('Accounts').click({ force: true })
                cy.get('.moduleTitle')
                    .contains('Accounts')
                    .should('be.visible')
                cy.get('.pageNumbers').first()//.should('contain','50')
                cy.get('.glyphicon-filter').first().click()
                cy.get('#name_basic')
                    .type('Kaos')
                cy.get('#search_form_submit').click()
                cy.get('table.table-responsive')
                    .find('[class*=ListRowS1]')//.should('have.length', 20)
                    .get('[scope="row"] > b > a').contains('Kaos Trading Ltd').click()
                cy.get('#name').should('contain','Kaos Trading Ltd')
                cy.get('#website').should('contain','www.sugardev.de')
                cy.get('.actionmenulink').contains('View Accounts').click()
                cy.get('.sugar_action_button.desktopOnly').first().click()
                
                cy.get('.nav.nav-tabs').find('a').should('be.visible')
                    .contains('MORE INFORMATION').then(($tab)  => {
                   cy.wrap($tab).click().should('have.class', '.active')
                  })

                    .each(($el,index,$list) => {
                        console.log($el, index, $list)
                    })
                cy.get('table.table-responsive')
                    .find('[class*=ListRowS1]')
                    .should(($lis) => {
                        expect($lis).to.have.length(20)
                       // expect($lis.eq(0)).to.contain('EEE')
                       // expect($lis.eq(1)).to.contain('beans.beans')
                       // expect($lis.eq(4)).to.contain('Will Westin')
                       // expect($lis.eq(4)).to.contain('kid.info@example.net')
                        })
                    

            })

    it('Visits Suite CRM site and login to CRM', function() {
        //arange
       
            cy.contains('All').click()
            //.trigger('mouseover', 'right')
            cy.get('.open')
                    .find('a').contains('Accounts')
                    .click() 
               // cy.contains('Accounts').click({ force: true })
                cy.get('.moduleTitle')
                    .contains('Accounts')
                    .should('be.visible')
                cy.contains('Collaboration').trigger('mouseover').click()
                cy.get('.open')
                    .find('a').contains('Email')
                    .click()    
                cy.get('.moduleTitle')
                    .contains('Email')
                    .should('be.visible')
                })

        it('Visits Suite CRM site and fail to login', function() {
        //arange
        cy.visit('https://demo.suiteondemand.com/index.php')
        // cy.visit('https://www.australianunity.com.au/')
        cy.get('#user_name')
        .type('WILL')
        cy.get('#username_password')
        .type('testER')
        cy.contains('Log In').click() 
        cy.contains('You must specify a valid username and password.')

    })

    it('is redirected on visit to Login Page when no session', function(){

        cy.visit('?module=Home')
        cy.url().should('include', 'action=Login')
        cy.contains('Log In').should('be.visible')
        cy.get('#user_name').should('have.attr', 'placeholder','Username')
        cy.get('#username_password').should('have.attr', 'placeholder','Password')
             
    })
})
})