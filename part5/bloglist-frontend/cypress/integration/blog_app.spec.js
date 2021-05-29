describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "abhi",
      name: "Abhishek",
      password: "12345",
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("abhi");
      cy.get("#password").type("12345");
      cy.get("#login-btn").click();
      cy.contains("Welcome Abhishek");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("abhi"), cy.get("#password").type("wrong");
      cy.get("#login-btn").click();

      cy.get(".error").should("contain", "Wrong credentials");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
      cy.get(".error").should("have.css", "border-style", "solid");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({
        username: "abhi",
        password: "12345",
      });
    });

    it("A blog can be created", function () {
      cy.contains("Create Blog").click();
      cy.get("#title").type("New Title");
      cy.get("#author").type("New Author");
      cy.get("#url").type("New Url");
      cy.get("#create-btn").click();
      cy.get(".info").contains("a new blog New Title by New Author is added");
    });

    describe("when blog is created", function () {
      beforeEach(function () {
        cy.contains("Create Blog").click();
        cy.get("#title").type("one");
        cy.get("#author").type("cypress");
        cy.get("#url").type("none");
        cy.get("#create-btn").click();
      });
      it("A blog can be liked", function () {
        cy.get(".likes").contains(0);
        cy.get(".show_hide").click();
        cy.get(".like").click();
        cy.get(".likes").contains(1);
      });

      it("can be deleted by authenticated user", function () {
        cy.get(".show_hide").click();
        cy.contains("remove");
      });

      it("blogs are ordered according to likes", function () {
        //add teo more blogs

        // cy.request()

        cy.contains("Create Blog").click();
        cy.get("#title").type("two");
        cy.get("#author").type("cypress");
        cy.get("#url").type("none");
        cy.get("#create-btn").click();

        cy.contains("Create Blog").click();
        cy.get("#title").type("three");
        cy.get("#author").type("cypress");
        cy.get("#url").type("none");
        cy.get("#create-btn").click().as("getAll");
        cy.wait(3000);
        cy.get(".show_hide").then((btn) => {
          cy.wrap(btn[0]).click();
          cy.wrap(btn[1]).click();
          cy.wrap(btn[2]).click();
        });

        // now there are three blogs

        cy.get(".like").then((btn) => {
          console.log(btn.length);
          cy.wrap(btn[0]).click();
          cy.wrap(btn[1]).click();
          cy.wrap(btn[1]).click();
          cy.wrap(btn[2]).click();
          cy.wrap(btn[2]).click();
          cy.wrap(btn[2]).click();
        });

        cy.wait(3000);

        cy.visit("http://localhost:3000");

        cy.get(".blogDetails").then(($blog) => {
          expect($blog).to.have.length(3);

          for (let i = 0; i < $blog.length; i++) {
            // Check if the number of likes of current blog is higher than or equal to that of next blog
            if (i < $blog.length - 1) {
              expect(Number($blog.find(".likes")[i].innerText)).to.be.least(
                Number($blog.find(".likes")[i + 1].innerText)
              );
              // Check if number of likes of last blog is lower than or equal to that of first blog
            } else {
              expect(Number($blog.find(".likes")[i].innerText)).to.be.most(
                Number($blog.find(".likes")[0].innerText)
              );
            }
          }
        });
      });
    });
    it("cannot be deleted by unauthenticated user", function () {
      cy.contains("Create Blog").click();
      cy.get("#title").type("one");
      cy.get("#author").type("cypress");
      cy.get("#url").type("none");
      cy.get("#create-btn").click();
      // cy.then(function () {
      const user = {
        username: "cypress",
        name: "Test",
        password: "12345",
      };
      cy.request("POST", "http://localhost:3003/api/users", user).then(
        function () {
          cy.get("#logout-btn").click();

          cy.get("#username").type("cypress");
          cy.get("#password").type("12345");
          cy.get("#login-btn").click();
          cy.contains("Welcome Test");

          cy.get(".show_hide").click();
          cy.should("not.contain", ".remove");
          // cy.get(".remove").click();
        }
      );
      // });
    });
  });
});

// describe("removing", function () {
//   it("can be removed by the user who added the blog", function () {
//     cy.request("POST", "http://localhost:3003/api/testing/reset");
//     const user = {
//       username: "abhi",
//       name: "Abhishek",
//       password: "12345",
//     };
//     cy.request("POST", "http://localhost:3003/api/users", user);
//     cy.visit("http://localhost:3000");
//     cy.login({
//       username: "abhi",
//       password: "12345",
//     });
//     cy.contains("Create Blog").click();
//     cy.get("#title").type("two");
//     cy.get("#author").type("cypress");
//     cy.get("#url").type("none");
//     cy.get("#create-btn").click();
//     cy.get(".show_hide").click();
//     cy.get(".remove").click();
//   });
// });
