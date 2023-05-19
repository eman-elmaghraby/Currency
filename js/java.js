let amount = document.querySelector(".amount");
let selectBoxFrom = document.querySelector(".selectBoxFrom");
let selectBoxTo = document.querySelector(".selectBoxTo");
let result = document.querySelector(".result");
let btn = document.querySelector(".btn");
const countryApi = `https://openexchangerates.org/api/currencies.json`;

fetch(countryApi)
  .then((res) => res.json())
  .then((countries) => {
    for (let country in countries) {
      selectBoxFrom.innerHTML += `<option>${country}</option>`;
      selectBoxTo.innerHTML += `<option>${country}</option>`;
    }

    btn.addEventListener("click", async () => {
      try {
        let returnFeched = await fetch(
          `https://v6.exchangerate-api.com/v6/d4c306dda699becfdf9260c2/latest/${selectBoxFrom.value}`
        );
        let fetchedData = await returnFeched.json();

        // console.log(data);
        let dataFromTo = fetchedData.conversion_rates;
        let endResult = amount.value * dataFromTo[selectBoxTo.value];

        result.innerHTML = `${amount.value} ${selectBoxFrom.value} : ${endResult} ${selectBoxTo.value}`;
      } catch (err) {
        console.log(err.message);
      }
    });
  });
