# About

JavaScript validations framework.

# Example

    var validations = require("validations");
    var validator   = validations.presence("email");

    // this is valid
    validator({email: "joe@doe.com"});

    // this isn't valid
    validator({});
