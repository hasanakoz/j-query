const formJS = document.querySelector("form");

//jQuery = $
const formJquery = $("form").eq(0);
const inputJQ = $("top-banner input").eq(0);
const msgJQ = $("top-banner span").eq(0);
const listJQ = $(".cities").eq(0);
// console.log(listJQ);
// console.log(formJquery);

// get(index), eq(index)

//load vs. DOMContentLoaded

// window.onload = ()=>{}

$(window).on("load", () => {
  console.log("window.load");
});

$(document).ready(() => {
  localStorage.setItem(
    "apiKey",
    EncryptStringAES("b8bd59d8cfb70eee06f98d68a4554461")
  );
});

// formJquery.on("submit", (e) => {
//   e.preventDefault();
//   getWeatherDataFromApi();
// });

formJquery.submit((e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = () => {
  const apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
  const cityName = inputJQ.val();
  console.log(cityName);
  const units = "metric";
  const lang = "tr";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}&lang=${lang}`;

  $.ajax({
    type: "GET",
    url: url,
    dataType: "json",
    success: (response) => {
      console.log(response);

      const { main, sys, name, weather } = response;
      const iconUrlAWS = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
      //alternative iconUrl
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

      const createdLi = $("<li></li>");
      createdLi.addClass("city");
    },
    beforeSend: (request) => {
      console.log("before ajax send");
    },
    complete: () => {
      console.log("after ajax send");
    },
    error: (XMLHttpRequest) => {
      console.log(XMLHttpRequest);
    },
  });
};
