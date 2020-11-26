function showRegisterPage(){
    $('#register-page').show()
    $('#login-page').hide()
    $('#main-page').hide()
    $('#cats-page').hide()
    $('#btn-adopt').hide()
    $('#btn-logout').hide()
}

function showLoginPage() {
    $('#login-page').show()
    $('#register-page').hide()
    $('#main-page').hide()
    $('#cats-page').hide()
    $('#btn-adopt').hide()
    $('#btn-logout').hide()
}

function showMainPage() {
    $('#main-page').show()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#cats-page').hide()
    $('#btn-adopt').show()
    $('#btn-logout').show()
    fetchAdoptedCats()
}

function showAdoptCatsPage() {
    $('#main-page').hide()
    $('#login-page').hide()
    $('#register-page').hide()
    $('#cats-page').show()
    $('#btn-adopt').show()
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
            $("registerPassword").val("")
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
            $("loginPassword").val("")
        })
}

function logout() {
    localStorage.clear()
    showLoginPage()
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    gapi.auth2.getAuthInstance().disconnect()
    $.ajax({
        url: 'http://localhost:3000/googleLogin',
        method: 'POST',
        data: {
            google_token
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
        .done(res => {
            $("#cat-list").empty()
            res.forEach(cat => {
                $("#cat-list").append(`<div class="col-4" style="height: 500px !important; object-fit: cover">
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

function infoCat(id) {
    $.ajax({
        method: "GET",
        url: "http://localhost:3000/catsAdopt/" + id,
        headers: {
            access_token: localStorage.getItem('access_token')
        }
    })
        .done(res => {
            $("#cat-list").empty()
            res.forEach(cat => {
                $("#cat-list").append(`<div class="col-4" style="height: 500px !important; object-fit: cover">
                    <div class="card">
                        <h3 class="card-name">${cat.name}</h3>
                        <div class="card-body">
                            <h5 class="card-status">${cat.status}</h5>
                            <h5 class="card-age">${cat.age}</h5>
                            <h5 class="card-gender">${cat.gender}</h5>
                            <h5 class="card-primaryBreeds">${cat.primaryBreeds}</h5>
                            <h5 class="card-secondaryBreeds">${cat.secondaryBreeds}</h5>
                            <h5 class="card-mixedBreeds">${cat.mixedBreeds}</h5>
                            <h5 class="card-size">${cat.size}</h5>
                            <h5 class="card-email">${cat.email}</h5>
                            <h5 class="card-phone">${cat.phone}</h5>
                            <h5 class="card-address">${cat.address}</h5>
                            <h5 class="card-city">${cat.city}</h5>
                            <h5 class="card-country">${cat.country}</h5>
                            <button class="btn btn-primary text-white col-4" onclick="showMainPage()">Back</button>
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

function deleteCat(id) {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:3000/catsAdopt/" + id,
        headers: {
            access_token: localStorage.getItem("access_token")
        }
    })
        .done(res => {
            fetchAdoptedCats()
        })
        .fail(err => {
            console.log(err);
        })
}