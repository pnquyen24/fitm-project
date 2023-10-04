import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    color: "white",
    iconColor: "white",
    timerProgressBar: true,
    customClass: {
        timerProgressBar: {
            background: "alert-progress-bar",
        },
    },
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

const CustomeAlert = {
    success: (msg) => {
        CustomeAlert.toast("success", msg, "#07BC0C");
    },
    warning: (msg) => {
        CustomeAlert.toast("warning", msg, "#ffd113");
    },
    info: (msg) => {
        CustomeAlert.toast("info", msg, "#3498db");
    },
    error: (msg) => {
        CustomeAlert.toast("error", msg, "#e91e63");
    },
    toast: (icon = "default", msg, color) => {
        Toast.fire({
            icon: icon,
            title: msg,
            background: color
        })
    }
};

export default CustomeAlert;