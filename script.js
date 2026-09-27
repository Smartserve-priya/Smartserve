// Show fields according to appointment type

document.getElementById("type").addEventListener("change", function () {

    const type = this.value;

    // Hide all sections
    document.getElementById("doctorDetails").style.display = "none";
    document.getElementById("salonDetails").style.display = "none";
    document.getElementById("bankDetails").style.display = "none";
    document.getElementById("aadharDetails").style.display = "none";
    document.getElementById("otherDetails").style.display = "none";


    // Show selected section
    if (type === "Doctor Appointment") {
        document.getElementById("doctorDetails").style.display = "block";
    }

    else if (type === "Salon Appointment") {
        document.getElementById("salonDetails").style.display = "block";
    }

    else if (type === "Bank Appointment") {
        document.getElementById("bankDetails").style.display = "block";
    }

    else if (type === "Aadhar Centre") {
        document.getElementById("aadharDetails").style.display = "block";
    }

    else if (type === "Other Service") {
        document.getElementById("otherDetails").style.display = "block";
    }

});


// Book Appointment

function bookAppointment(event) {

    event.preventDefault();

    const type = document.getElementById("type").value;

    const appointment = {

        name: document.getElementById("name").value,

        mobile: document.getElementById("mobile").value,

        type: type,

        date: document.getElementById("date").value,

        time: document.getElementById("time").value,

        details: document.getElementById("details").value
    };


    // Doctor details
    if (type === "Doctor Appointment") {

        appointment.city =
            document.getElementById("doctorCity").value;

        appointment.place =
            document.getElementById("hospital").value;

        appointment.service =
            document.getElementById("doctor").value;
    }


    // Salon details
    else if (type === "Salon Appointment") {

        appointment.city =
            document.getElementById("salonCity").value;

        appointment.place =
            document.getElementById("salon").value;

        appointment.service =
            document.getElementById("salonService").value;
    }


    // Bank details
    else if (type === "Bank Appointment") {

        appointment.city =
            document.getElementById("bankCity").value;

        appointment.place =
            document.getElementById("bank").value;

        appointment.service =
            document.getElementById("bankService").value;
    }


    // Aadhaar details
    else if (type === "Aadhar Centre") {

        appointment.city =
            document.getElementById("aadharCity").value;

        appointment.place =
            document.getElementById("aadharCentre").value;

        appointment.service =
            document.getElementById("aadharService").value;
    }


    // Other service
    else if (type === "Other Service") {

        appointment.city =
            document.getElementById("otherCity").value;

        appointment.place =
            document.getElementById("otherService").value;

        appointment.service = "Other Service";
    }


    // Save appointment
    localStorage.setItem(
        "smartServeAppointment",
        JSON.stringify(appointment)
    );


    // Demo SMS notification
    alert(
        "📱 SMS Sent Successfully!\n\n" +
        "To: " + appointment.mobile + "\n\n" +
        "Message: Your SmartServe appointment has been confirmed."
    );


    // Open confirmation page
    window.location.href = "confirmation.html";
}

function cancelAppointment() {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this appointment?"
    );

    if (confirmCancel) {

        localStorage.removeItem("smartServeAppointment");

        alert("Appointment cancelled successfully!");

        window.location.href = "index.html";
    }
}