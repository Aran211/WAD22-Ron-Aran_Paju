/// <reference types = "cypress"/>  


/* Optional Question - solve only one of the two tests */

 
//it('Test 1', () => {
describe('MyCourses.vue', () => {
  it('clicks on a course code', () => {
    cy.visit('/mycourses') 
    cy.get('.code').eq(0).click() 
  })
})



/* 
it("Test 2 - Testing Update a post request", function() {

}) 
*/