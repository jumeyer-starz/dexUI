//working AD onsite

var ldap = require('ldapjs');
var url = "ldap://playstation.encore.corp.root";
var userPrincipalName = "ENCORE\\jumeyer";
var passwd = ";pass";

console.warn("USERNAME:" +userPrincipalName );

if (passwd === "") {
  console.warn("empty passwd fail");
  return ;
}

var adClient = ldap.createClient({
  url: url
});
adClient.bind(userPrincipalName, passwd, function(err) {

  if (err != null) {
    if (err.name === "InvalidCredentialsError") {
      console.log("Credential error");
      console.log(JSON.stringify(err));
    }else
      console.log("Unknown error: " + JSON.stringify(err));
  } else {
    console.log("Hello !");
    console.log(JSON.stringify(this));
  }
});
