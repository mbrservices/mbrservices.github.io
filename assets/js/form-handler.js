const form = document.getElementById("contact-form");
const result = document.getElementById("contact-form-result");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.add("text-success");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.add("text-danger");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong! Please use one of the other contact channels above.";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});