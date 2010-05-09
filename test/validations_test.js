#!/usr/bin/env node

var helper      = require("./test_helper"),
    validations = require("validations");

/* presence */
context("validations.presence", function () {
  this.assertion("it should return an empty object if the object is valid", function (test) {
    var validation = validations.presence("name");
    var errors = validation({name: "Jakub"});
    assert.errorsDoNotInclude(errors, "name");
    test.finished();
  });

  this.assertion("it should return {property: [errors]}", function (test) {
    var validation = validations.presence("name");
    var errors = validation({});
    assert.errorsInclude(errors, "name");
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
    var errors = validation({email: "stastny@101tasks.com"});
    assert.errorsDoNotInclude(errors, "email");
    test.finished();
  });

  this.assertion("it should return {email: ['email has to be a valid email']}", function (test) {
    var validation = validations.email("email");
    var errors = validation({email: "not.a.valid.email.com"});
    assert.errorsInclude(errors, "email", "has to be a valid email");
    test.finished();
  });
});
