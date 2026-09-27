function bookAppointment(event) {
    event.preventDefault();

    const appointment = {
        name: document.getElementById("name").value,
        mobile: document.getElementById("mobile").value,
        type: document.getElementById("type").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        details: document.getElementById("details").value
    };

    localStorage.setItem(
        "smartServeAppointment",
        JSON.stringify(appointment)
    );

    window.location.href = "confirmation.html";
}