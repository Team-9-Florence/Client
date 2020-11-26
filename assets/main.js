$(document).ready(function() {
    if(localStorage.getItem('access_token')) {
        showMainPage()
    } else {
        showLoginPage()
    }

    $('#register-form').on("submit", function(e) {
        e.preventDefault()
        register()
    })

    $('#login-form').on("submit", function(e) {
        e.preventDefault()
        login()
    })

    $('#toLoginForm').on("click", function(e) {
        e.preventDefault()
        showLoginPage()
    })
    
    $('#toRegisterForm').on("click", function(e) {
        e.preventDefault()
        showRegisterPage()
    })
    
    $('#btn-logout').on("click", function(e) {
        logout()
    })

    $('#btn-adopt').on("click", function(e) {
        e.preventDefault()
        showAdoptCatsPage()
    })

    $('#btn-adopted').on("click", function(e) {
        e.preventDefault()
        showMainPage()
    })
})
