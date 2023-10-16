hospitalManagementApp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state("Login", {
        url: '/login',
        templateUrl: "templates/login.html",
        controller: "loginController"
    }).state("Register", {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: "registerController"
    }).state("Home", {
        url: "/",
        templateUrl: "templates/homePage.html",
        controller: "homePageController"
    }).state("hospitals", {
        url: "/hospitals",
        templateUrl: "templates/hospitals.html",
        controller: "hospitalController"
    }).state("users", {
        url: "/users",
        templateUrl: "templates/users.html",
        controller: "userController"
    }).state("doctors", {
        url: "/doctors",
        templateUrl: "templates/doctors.html",
        controller: "doctorsController"
    }).state("appointments", {
        url: "/appointments",
        templateUrl: "templates/appointments.html",
        controller: "appointmentsController"
    }).state("patients", {
        url: "/patients",
        templateUrl: "templates/patients.html",
        controller: "patientsController",
    }).state("invoices", {
        url: "/invoices",
        templateUrl: "templates/invoices.html",
        controller: "invoicesController"
    })
    $urlRouterProvider.otherwise("/")
})