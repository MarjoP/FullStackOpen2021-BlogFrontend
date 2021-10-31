describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Martti Vaan',
        username: 'Martti',
        password: 'MartinSS'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Log in to application')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('Martti')
          cy.get('#password').type('MartinSS')
          cy.get('#login-button').click()
        
          cy.contains('Martti Vaan logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.get('#username').type('Martti')
            cy.get('#password').type('MartinvääräSS')
            cy.get('#login-button').click()

            cy.contains('Log in to application')
        })
      })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.get('#username').type('Martti')
            cy.get('#password').type('MartinSS')
            cy.get('#login-button').click()
        })
    
        it('A blog can be created', function() {
          cy.contains('create new blog').click()
          cy.get('#title').type('test blog title')
          cy.get('#author').type('cypress')
          cy.get('#url').type('www.cypTest.com')
          cy.contains('save').click()
          cy.contains('test blog title - cypress')
        })

        
        it('User can like a blog', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('test blog title')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.cypTest.com')
            cy.contains('save').click()
            cy.contains('view').click()
            cy.wait(500)
            cy.contains('like').click()
            cy.wait(500)
            cy.contains('likes: 1')
            cy.wait(1000)
            cy.contains('like').click()
            cy.wait(500)
            cy.contains('likes: 2')
          })

        it('User can delete a blog', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('test blog title')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.cypTest.com')
            cy.contains('save').click()
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.wait(500)
            cy.contains('test blog title - cypress').should('not.exist')
        })

        it('Blogs are ordered by likes', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('test blog title')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.cypTest.com')
            cy.contains('save').click()
            cy.contains('view').click()
            cy.wait(1500)
            cy.contains('like').click()
            cy.wait(1500)
            cy.contains('like').click()
            cy.wait(1500)
            cy.contains('like').click()
            cy.wait(1500)
            cy.contains('like').click()

     
            cy.get('#title').type('blog with 2 likes')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.cyp2Test.com')
            cy.contains('save').click()
            cy.wait(1500)
            cy.contains('blog with 2 likes').contains('view').click()
            cy.wait(1500)
            cy.contains('blog with 2 likes').parent().children().contains('like').click()
            cy.wait(1500)
            cy.contains('blog with 2 likes').parent().children().contains('like').click()
            cy.wait(1500)

  
            cy.get('#title').type('blog with no likes')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.cyp3Test.com')
            cy.contains('save').click()
            cy.wait(1500)
            cy.contains('blog with no likes').contains('view').click()
        
            cy.get('#title').type('blog with 1 like')
            cy.get('#author').type('cypress')
            cy.get('#url').type('www.cyp1Test.com')
            cy.contains('save').click()
            cy.wait(1500)
            cy.contains('blog with 1 like').contains('view').click()
            cy.wait(1500)
            cy.contains('blog with 1 like').parent().children().contains('like').click()
            cy.wait(1500)

            cy.get('.likes').eq(0).should('contain.text','likes: 4')
            cy.get('.likes').eq(1).should('contain.text','likes: 2')
            cy.get('.likes').eq(2).should('contain.text','likes: 1')
            cy.get('.likes').eq(3).should('contain.text','likes: 0')
   
            })

        })


      })

     