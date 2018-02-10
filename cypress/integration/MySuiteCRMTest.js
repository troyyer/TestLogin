describe('My First CRM Test', function() {

context('720p resolution', function () {
    beforeEach(function () {
      // run these tests as if in a desktop
      // browser with a 720p monitor
      cy.viewport(1280, 720)
    })

    it('Visits Suite CRM site and fail to login', function() {
        //arange
        cy.visit('https://demo.suiteondemand.com/index.php')
        // cy.visit('https://www.australianunity.com.au/')
        cy.get('#user_name')
        .type('WILL')
        cy.get('#username_password')
        .type('WILL')
        cy.contains('Log In').click() 
        cy.contains('You must specify a valid username and password.')

    })
    it('Visits Suite CRM site and login to CRM', function() {
        //arange
        cy.visit('https://demo.suiteondemand.com/index.php')
        // cy.visit('https://www.australianunity.com.au/')
        cy.get('#user_name')
        .type('WILL')
        cy.get('#username_password')
        .type('will')
        cy.contains('Log In').click() 
        cy.url()
            .should('include' , 'module=Home')

        cy.contains('SUITECRM DASHBOARD')

    })
})
})