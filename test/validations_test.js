var helper      = require("./test_helper"),
    validations = require("validations");

/* presence */
context("validations.presence", function () {
  this.assertion("it should return null if the object is valid", function (test) {
    var validation = validations.presence("name");
    assert.valid(validation, {name: "Jakub"});
    test.finished();
  });

  this.assertion("it should return {property: [errors]}", function (test) {
    var validation = validations.presence("name");
    assert.notValid(validation, {}, "name", "name has to be present");
    test.finished();
  });
});

/* match */
context("validations.match", function () {
});

/* date */
context("validations.date", function () {
});

/* email */
context("validations.email", function () {
  this.assertion("it should return null if an email is valid", function (test) {
    var validation = validations.email("email");
    assert.valid(validation, {email: "stastny@101tasks.com"});
    test.finished();
  });

  this.assertion("it should return {email: ['email has to be a valid email']}", function (test) {
    var validation = validations.email("email");
    assert.notValid(validation, {}, "email", "email has to be a valid email");
    test.finished();
  });
});
