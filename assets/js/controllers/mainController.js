hospitalManagementApp.controller("mainController", ["$scope", function ($scope) {
    $scope.name = "Hospital App"
}])

hospitalManagementApp.controller("loginController", ["$scope", "$http", "$location", function ($scope, $http, $location) {

    $scope.loginEmail = '';
    $scope.loginEmailErrMsg = ''
    $scope.loginPassword = ''
    $scope.loginPasswordErrMsg = ''

    let userToken = localStorage.getItem("access_token");
    if (userToken) {
        $location.path("/");
        return
    }

    $scope.validateLoginEmail = function () {
        if ($scope.loginEmail === "") {
            $scope.loginEmailErrMsg = "*Please enter email.."
            return false
        } else if (
            !$scope.loginEmail.endsWith(".com") ||
            !$scope.loginEmail.match(/[@]/)
        ) {
            $scope.loginEmailErrMsg = "*Please enter valid email.."
            return false
        } else {
            $scope.loginEmailErrMsg = ''
            return true
        }
    }

    $scope.loginPasswordValidation = function () {
        if ($scope.loginPassword === "") {
            $scope.loginPasswordErrMsg = "*Password is a required field"
            return false;
        } else if (!($scope.loginPassword.match(/\w/) && $scope.loginPassword.match(/\W/))) {
            $scope.loginPasswordErrMsg = "*Password must be alpha-numeric and special characters"
            return false
        } else {
            $scope.loginPasswordErrMsg = ''
            return true
        }
    }

    $scope.login = function () {
        $scope.validateLoginEmail();
        $scope.loginPasswordValidation()
        if ($scope.loginEmailErrMsg === '' && $scope.loginPasswordErrMsg === '') {
            let loginData = { email: $scope.loginEmail, password: $scope.loginPassword }
            $http({
                method: "POST",
                url: "./api/login.php",
                data: JSON.stringify(loginData)
            }).then(function (response) {
                console.log(response)
                localStorage.setItem("access_token", response.data["data"]);
                $location.path("Contact");
            }).catch(function (response) {
                alert(response.data['message'])
            })
        }
    }
}])

hospitalManagementApp.controller("registerController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    let token4 = localStorage.getItem("access_token")
    if (token4) {
        $location.path("/")
        return
    }
    $scope.firstName = ''
    $scope.firstNameErrMsg = ''
    $scope.lastName = ''
    $scope.lastNameErrMsg = ''
    $scope.email = ''
    $scope.emailErrMsg = ''
    $scope.password = ''
    $scope.passwordErrMsg = ''
    $scope.confirmPassword = ''
    $scope.confirmPasswordErrMsg = ''

    $scope.firstNameValidation = function () {
        if ($scope.firstName === "") {
            $scope.firstNameErrMsg = "*First Name is a required field"
            return false
        } else if ($scope.firstName.match(/[^A-z]/)) {
            $scope.firstNameErrMsg = "*Please Enter Valid Name"
            return false
        } else {
            $scope.firstNameErrMsg = ''
            return true
        }
    }

    $scope.lastNameValidation = function () {
        if ($scope.lastName === "") {
            $scope.lastNameErrMsg = "*Last Name is a required field"
            return false
        } else if ($scope.lastName.match(/[^A-z]/)) {
            $scope.lastNameErrMsg = "*Please enter valid Name"
            return false
        } else {
            $scope.lastNameErrMsg = ''
            return true
        }
    }

    $scope.emailValidation = function () {
        if ($scope.email === "") {
            $scope.emailErrMsg = "*Please enter email.."
            return false
        } else if (
            !$scope.email.endsWith(".com") ||
            !$scope.email.match(/[@]/)
        ) {
            $scope.emailErrMsg = "*Please enter valid email.."
            return false
        } else {
            $scope.emailErrMsg = ''
            return true
        }
    }

    $scope.passwordValidation = function () {
        if ($scope.password === "") {
            $scope.passwordErrMsg = "*Password is a required field"
            return false;
        } else if (!($scope.password.match(/\w/) && $scope.password.match(/\W/))) {
            $scope.passwordErrMsg = "*Password must be alpha-numeric and special characters"
            return false
        } else {
            $scope.passwordErrMsg = ''
            return true
        }
    }

    $scope.confirmPasswordValidation = function () {
        if ($scope.confirmPassword === "") {
            $scope.confirmPasswordErrMsg = "*Please enter confirm password"
            return false
        } else if (!($scope.confirmPassword.match(/\w/) && $scope.confirmPassword.match(/\W/))) {
            $scope.confirmPasswordErrMsg = "*Password must be alpha-numeric and special characters"
            return false
        } else {
            $scope.confirmPasswordErrMsg = ''
            return true
        }
    }

    $scope.signUp = function () {
        $scope.firstNameValidation();
        $scope.lastNameValidation()
        $scope.emailValidation();
        $scope.passwordValidation();
        $scope.confirmPasswordValidation()
        if ($scope.firstNameErrMsg === '' && $scope.lastNameErrMsg === '' && $scope.emailErrMsg === '' && $scope.passwordErrMsg === '' && $scope.confirmPasswordErrMsg === "") {
            let data = { firstName: $scope.firstName, lastName: $scope.lastName, email: $scope.email, password: $scope.password }
            $http({
                method: "POST",
                url: "./api/register.php",
                data: JSON.stringify(data)
            }).then(function (response) {
                alert(response.data["message"])
            }).catch(function (error) {
                alert(error)
            })
        } else {
            alert
        }
    }

}])

hospitalManagementApp.controller("homePageController", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    let token3 = localStorage.getItem("access_token")
    if (!token3) {
        $location.path("/login")
    }

}])

hospitalManagementApp.controller("hospitalController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    let hosToken = localStorage.getItem("access_token")
    if (!hosToken) {
        $location.path("/login")
    }
    $scope.hospitals = []
    $http({
        url: "./api/hospitals.php",
        method: "GET"
    }).then(function (hospitalsData) {
        $scope.hospitals = hospitalsData.data["data"]
    }).catch(function (error) {
        console.log(error)
    })
}])

hospitalManagementApp.controller("navbarController", ["$scope", "$http", "$location", function ($scope, $http, $location) {
    $scope.tableNames = []
    $http({
        url: "./api/tableNames.php",
        method: "GET"
    }).then(function (tableData) {
        for (let each of tableData.data["data"]) {
            if (each !== "invoice_details" && each !== "appointment_status" && each !== "diseases" && each !== "hospital_beds" && each !== "medicines") {
                $scope.tableNames.push(each)
            }
        }
    }).catch(function (tableData) {
        console.log(tableData.data["message"])
    })
}])

hospitalManagementApp.controller("userController", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $scope.usersData = [];
    let userTabToken = localStorage.getItem("access_token")
    if (!userTabToken) {
        $location.path("/login")
    }
    $http({
        url: "./api/getUsers.php",
        method: "GET"
    }).then(function (userData) {
        $scope.usersData = userData.data['data'];
    }).catch(function (error) {
        alert(error)
    })
}])

hospitalManagementApp.controller("doctorsController", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $scope.doctorsData = []
    let docToken = localStorage.getItem("access_token")
    if (!docToken) {
        $location.path("/login")
    }

    $http({
        url: "./api/doctors.php",
        method: "GET"
    }).then(function (doctorData) {
        $scope.doctorsData = doctorData.data['data'];
    }).catch(function (error) {
        alert(error)
    })

}])

hospitalManagementApp.controller("appointmentsController", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $scope.appointments = [];
    $scope.hospitalName = '';
    $scope.doctorsList = []
    let appointmentToken = localStorage.getItem("access_token")
    if (!appointmentToken) {
        $location.path("/login")
    }

    $http({
        url: "./api/appointments.php",
        method: "GET"
    }).then(function (appointmentData) {
        $scope.appointments = appointmentData.data['data']
    }).catch(function (error) {
        alert(error)
    })


    $scope.getDoctors = function () {
        let hospitalId = $scope.hospitalName
        $http.get("./api/getDoctors.php", { params: { hospitalId: parseInt(hospitalId) } }
        ).then(function (response) {
            $scope.doctorsList = response.data['data']
        }).catch(function (error) {
            alert(error)
        })
    }

}])

hospitalManagementApp.controller("patientsController", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $scope.patients = [];
    let patientToken = localStorage.getItem("access_token")
    if (!patientToken) {
        $location.path("/login")
    }
    $http({
        url: "./api/patients.php",
        method: "GET"
    }).then(function (patientsData) {
        $scope.patients = patientsData.data['data']
    }).catch(function (error) {
        alert(error)
    })
}])

hospitalManagementApp.controller("invoicesController", ["$scope", "$location", "$http", function ($scope, $location, $http) {
    $scope.invoices = [];
    $scope.invoiceHospitals = []
    let invoiceToken = localStorage.getItem("access_token")
    if (!invoiceToken) {
        $location.path("/login")
    }
    $http({
        url: "./api/invoices.php",
        method: "GET"
    }).then(function (invoicesData) {
        $scope.invoices = invoicesData.data['data'];
    }).catch(function (error) {
        alert(error)
    })

    $http({
        url: "./api/appointments.php",
        method: "GET"
    }).then(function (appointmentData) {
        $scope.invoiceHospitals = appointmentData.data['data']
    }).catch(function (error) {
        alert(error)
    })


}])