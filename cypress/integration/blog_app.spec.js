describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'zfc',
      name: 'zhong fengcheng',
      password: '123'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('zfc')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.contains('zhong fengcheng logged')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('zfc')
      cy.get('#password').type('aaa')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'username or password invalid')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'zfc', password: '123' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#title').type('cypress blog')
      cy.get('#url').type('www.cypress.com')
      cy.get('#author').type('cypress')
      cy.get('#save-button').click()
    })

    it('A blog can be add likes', function () {
      const blog = {
        title: 'an other cypress blog',
        url: 'www.baidu.com',
        author: 'cypress',
        likes: 1
      }

      cy.createBlog(blog)

      cy.contains('an other cypress blog by cypress').contains('view').click()
      cy.contains('like').click()
    })

    it('A blog can be delete', function () {
      cy.createBlog({
        title: 'firest cypress blog',
        url: 'www.baidu.com',
        author: 'cypress',
        likes: 10
      })
      cy.createBlog({
        title: 'second cypress blog',
        url: 'www.baidu.com',
        author: 'cypress',
        likes: 12
      })
      cy.createBlog({
        title: 'third cypress blog',
        url: 'www.baidu.com',
        author: 'cypress',
        likes: 8
      })

      cy.contains('second cypress blog by cypress').contains('view').click()
      cy.contains('second cypress blog by cypress').contains('remove').click()
    })

    it('Sort blogs by likes', function () {
      cy.createBlog({
        title: 'firest cypress blog',
        url: 'www.baidu.com',
        author: 'cypress',
        likes: 10
      })
      cy.createBlog({
        title: 'second cypress blog',
        url: 'www.baidu.com',
        author: 'cypress',
        likes: 12
      })
      cy.createBlog({
        title: 'third cypress blog',
        url: 'www.baidu.com',
        author: 'cypress',
        likes: 8
      })

      cy.get('.blogDetial').then((blog) => {
        cy.wrap(blog[0]).should('contain', '12')
        cy.wrap(blog[1]).should('contain', '10')
        cy.wrap(blog[2]).should('contain', '8')

        console.log(blog)
      })
    })
  })
})
