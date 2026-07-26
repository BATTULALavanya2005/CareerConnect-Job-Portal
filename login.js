document
.getElementById("loginForm")
.addEventListener("submit", function(e){

    e.preventDefault();

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    let storedUser =
        JSON.parse(
            localStorage.getItem("user")
        );

    // First Login = Create Account
    if(!storedUser){

        storedUser = {
          name,
          email,
          password,
          phone: "",
          education: "",
          skills: "",
          experience: "",
          linkedin: "",
          github: ""
        };

        console.log("Saving user:", storedUser);

        localStorage.setItem(
            "user",
            JSON.stringify(storedUser)
        );

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        alert(
            "Account Created Successfully!"
        );

        window.location.href =
            "dashboard.html";

        return;
    }

    // Existing User Login
    if(
        email === storedUser.email &&
        password === storedUser.password
    ){

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        window.location.href =
            "dashboard.html";
    }
    else{

        alert(
            "Invalid Email or Password"
        );
    }

});