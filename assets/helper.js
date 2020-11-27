function showRegisterPage(){
    $('#register-page').show()
    $('#login-page').hide()
    $('#main-page').hide()
    $('#cats-page').hide()
    $('#btn-adopt').hide()
    $('#btn-adopted').hide()
    $('#btn-logout').hide()
}

function showLoginPage() {
    $('#login-page').show()
    $('#register-page').hide()
    $('#main-page').hide()
    $('#cats-page').hide()
    $('#btn-adopt').hide()
    $('#btn-adopted').hide()
    $('#btn-logout').hide()
}

function showMainPage() {
    $('#main-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#cats-page').hide()
    $('#btn-adopt').show()
    $('#btn-adopted').hide()
    $('#btn-logout').show()
    fetchAdoptedCats()
    fetchFactCats()
}

function showAdoptCatsPage() {
    $('#main-page').hide()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#cats-page').show()
    $('#btn-adopt').show()
    $('#btn-adopted').show()
    $('#btn-logout').show()
    fetchAllCats()
}

function register() {
    const email = $("#registerEmail").val()
    const password = $("#registerPassword").val()

    $.ajax({
        url: 'http://localhost:3000/register',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done(response => {
            console.log(response);
            showLoginPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, textStatus);
        })
        .always(_ => {
            $("#registerEmail").val("")
            $("#registerPassword").val("")
        })
}

function login() {
    const email = $("#loginEmail").val()
    const password = $("#loginPassword").val()

    $.ajax({
        url: 'http://localhost:3000/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
        })
        .fail((xhr, textStatus) => {
            console.log(xhr, textStatus);
            
        })
        .always(() => {
            $("#loginEmail").val("")
            $("#loginPassword").val("")
        })
}

function logout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    localStorage.clear()
    showLoginPage()
}

function onSignIn(googleUser) {
    const googleToken = googleUser.getAuthResponse().id_token;
    gapi.auth2.getAuthInstance().disconnect()
    $.ajax({
        url: 'http://localhost:3000/googleLogin',
        method: 'POST',
        data: {
            googleToken
        }
    })
        .done(response => {
            localStorage.setItem('access_token', response.access_token)
            showMainPage()
        })
        .fail(err => {
            console.log(err);
        })
}

function fetchAdoptedCats() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/catsAdopt",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            $("#cat-list").empty()
            response.forEach(cat => {
                $("#cat-list").append(`<div class="col-4" style="height: 300px !important; object-fit: cover">
                    <div class="card">
                        <h3 class="card-name">${cat.name}</h3>
                        <div class="card-body">
                            <h5 class="card-status">${cat.status}</h5>
                            <h5 class="card-age">${cat.age}</h5>
                            <h5 class="card-gender">${cat.gender}</h5>
                            <h5 class="card-primaryBreeds">${cat.primaryBreeds}</h5>
                            <button class="btn btn-primary text-white col-4" onclick="infoCat(${cat.id})">More Info</button>
                            <button class="btn btn-warning text-white col-4" onclick="deleteCat(${cat.id})">Delete</button>
                        </div>
                    </div>
                </div>`)
            })
        })
        .fail(xhr => {
            console.log(xhr);
        })
}

// DONE FADEL
function infoCat(id) {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/catsAdopt/" + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(response => {
            console.log(response)
            $("#cat-list").empty()
            $("#cat-list").append(`<div class="col-4" style="height: 300px !important; object-fit: cover">
                     <div class="card">
                         <h3 class="card-name">${response.name}</h3>
                         <div class="card-body">
                             <h5 class="card-status">Status : ${response.status}</h5>
                             <h5 class="card-age">Age: ${response.age}</h5>
                             <h5 class="card-gender">Gender: ${response.gender}</h5>
                             <h5 class="card-primaryBreeds">Primary Breeds: ${response.primaryBreeds}</h5>
                             <h5 class="card-secondaryBreeds">Seconsary Breeds: ${response.secondaryBreeds}</h5>
                             <h5 class="card-mixedBreeds">Mixed Breeds: ${response.mixedBreeds}</h5>
                             <h5 class="card-size">Size : ${response.size}</h5>
                             <h5 class="card-email">Email: ${response.email}</h5>
                             <h5 class="card-phone">Phone: ${response.phone}</h5>
                             <h5 class="card-address">Addres: ${response.address}</h5>
                             <h5 class="card-city">City: ${response.city}</h5>
                             <h5 class="card-country">Country: ${response.country}</h5>
                             <button class="btn btn-primary text-white col-4" onclick="showMainPage()">Back</button>
                             <button class="btn btn-warning text-white col-4" onclick="deleteCat(${response.id})">Delete</button>
                         </div>
                     </div>
                 </div>`)
        })
        .fail(xhr => {
            console.log(xhr);
        })
}

function deleteCat(id) {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/catsAdopt/" + id,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(response => {
            fetchAdoptedCats()
        })
        .fail(err => {
            console.log(err);
        })
}

function fetchAllCats() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/cats",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        $("#allCats-list").empty()
        response.forEach(cat => {
            $("#allCats-list").append(`<div class="col-4" style="height: 300px !important; object-fit: cover">
                <div class="card">
                    <h3 class="card-name">${cat.name}</h3>
                    <div class="card-body">
                        <h5 class="card-status">${cat.status}</h5>
                        <h5 class="card-age">${cat.age}</h5>
                        <h5 class="card-gender">${cat.gender}</h5>
                        <h5 class="card-primaryBreeds">${cat.primaryBreeds}</h5>
                        <button class="btn btn-primary text-white col-4" onclick="infoClickedCat(${cat.id})">More Info</button>
                        <button class="btn btn-warning text-white col-4" onclick="adoptCat(${cat.id})">Adopt</button>
                    </div>
                </div>
            </div>`)
        })
    })
    .fail(xhr => {
        console.log(xhr);
    })
}

// Lagi dikit, tinggal masukin ke html tambahin ke infonya
function infoClickedCat(id) {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/cats/" + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response)
        $("#allCats-list").empty()
        $("#allCats-list").append(`<div class="col-4" style="height: 300px !important; object-fit: cover">
                     <div class="card">
                         <h3 class="card-name">${response.name}</h3>
                         <div class="card-body">
                             <h5 class="card-status">Status : ${response.status}</h5>
                             <h5 class="card-age">Age: ${response.age}</h5>
                             <h5 class="card-gender">Gender: ${response.gender}</h5>
                             <h5 class="card-primaryBreeds">Primary Breeds: ${response.primaryBreeds}</h5>
                             <h5 class="card-secondaryBreeds">Seconsary Breeds: ${response.secondaryBreeds}</h5>
                             <h5 class="card-mixedBreeds">Mixed Breeds: ${response.mixedBreeds}</h5>
                             <h5 class="card-size">Size : ${response.size}</h5>
                             <h5 class="card-email">Email: ${response.email}</h5>
                             <h5 class="card-phone">Phone: ${response.phone}</h5>
                             <h5 class="card-address">Addres: ${response.address}</h5>
                             <h5 class="card-city">City: ${response.city}</h5>
                             <h5 class="card-country">Country: ${response.country}</h5>
                             <button class="btn btn-primary text-white col-4" onclick="showAdoptCatsPage()">Back</button>
                             <button class="btn btn-warning text-white col-4" onclick="adoptCat(${response.id})">Adopt</button>
                         </div>
                     </div>
                 </div>`)
    })
        .fail(xhr => {
            console.log(xhr);
        })
}

function adoptCat(id) {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/cats/" + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(response => {
        console.log(response);
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/cats/" + id,
            headers: {
                access_token: localStorage.getItem('access_token')
            },
            data: {
                response
            }
        })
        .done(response => {
            showMainPage()
        })
        .fail(xhr => {
            console.log(xhr);
        })
    })
    .fail(xhr => {
        console.log(xhr);
    })
}

function fetchFactCats() {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/catsFact",
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
    .done(res => {
        $(".carousel-inner").empty()
        $(".carousel-indicators").empty()

        for (let i = 0; i < res.length; i++) {
            if (i === 0) {
            $(".carousel-indicators").append(`<li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>`)
            $(".carousel-inner").prepend(` 
            <div class="carousel-item active">
            <img src="${res[i].url}" height = "350px" class="rounded mx-auto d-block" style="opacity: 0.5;" alt="...">
            <div class="carousel-caption d-md-block text-center">
              <h5>Cat Fact!</h5>
              <p>${res[i].text}</p>
            </div>
          </div>`)
            } else {
            $(".carousel-indicators").prepend(`<li data-target="#carouselExampleCaptions" data-slide-to="${i}"></li>`)
            $(".carousel-inner").prepend(` 
            <div class="carousel-item">
            <img src="${res[i].url}" height = "350px" style="opacity: 0.5;" class="rounded mx-auto d-block" alt="...">
            <div class="carousel-caption d-md-block text-center">
              <h5>Cat Fact!</h5>
              <p>${res[i].text}</p>
            </div>
          </div>`) 
            }
            
        } 
    })
    .fail(xhr => {
        console.log(xhr);
    })
}
