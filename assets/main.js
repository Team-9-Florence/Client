$(document).ready(function() {

    $('#login-form').on("submit", function(e) {
        e.preventDefault()
        login()
    })
    
    $('#toLoginForm').on("click", function(e) {
        e.preventDefault()
        showLoginPage()
    })

    $('#btn-logout').on("click", function(e) {
        logout()
    })

})
