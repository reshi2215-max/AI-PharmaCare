const medicineForm = document.getElementById("medicineForm");
const medicineInput = document.getElementById("medicineInput");
const medicineResult = document.getElementById("medicineResult");

function searchMedicine(medicineName) {
const key = medicineName.trim().toLowerCase();

medicineResult.replaceChildren();

if (!key) {
    medicineResult.textContent = "Please enter a medicine name.";
    return;
}

const medicine = medicines[key];

if (!medicine) {
    const message = document.createElement("div");
    message.className = "result-card";

    const heading = document.createElement("h3");
    heading.textContent = "Medicine Not Found";

    const paragraph = document.createElement("p");
    paragraph.textContent =
        "This medicine is not included in the current demo database. " +
        "Check the spelling or consult a qualified pharmacist for reliable information.";

    message.append(heading, paragraph);
    medicineResult.appendChild(message);
    return;
}

const card = document.createElement("div");
card.className = "result-card";

const heading = document.createElement("h3");
heading.textContent = medicine.name;

const category = document.createElement("p");
category.textContent = "Category: " + medicine.category;

card.append(heading, category);

const sections = [
    ["Common Uses", medicine.uses],
    ["Possible Side Effects", medicine.sideEffects],
    ["Precautions", medicine.precautions],
    ["Important Safety Note", medicine.warning]
];

sections.forEach(function (item) {
    const sectionHeading = document.createElement("h4");
    sectionHeading.textContent = item[0];

    const paragraph = document.createElement("p");
    paragraph.textContent = item[1];

    card.append(sectionHeading, paragraph);
});

const safety = document.createElement("div");
safety.className = "result-warning";
safety.textContent =
    "Educational information only. This result does not provide a personal dose, diagnosis or treatment recommendation.";

card.appendChild(safety);
medicineResult.appendChild(card);

}

medicineForm.addEventListener("submit", function (event) {
event.preventDefault();
searchMedicine(medicineInput.value);
});

document.querySelectorAll("[data-medicine]").forEach(function (button) {
button.addEventListener("click", function () {
const name = button.dataset.medicine;
medicineInput.value = name;
searchMedicine(name);
});
});