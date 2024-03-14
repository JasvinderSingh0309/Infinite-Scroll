let countryCardList = document.querySelector(".countries");

function getCountryData() {
  return (
    fetch("https://restcountries.com/v3.1/all")
      .then(data => {
        if(!data.ok) {
          if(data.status !== 200);
            console.log("Cannot Fetch!!");
        }else{
          return data.json();
        }
      })
      .then(resp => {
        return resp;
      })
      .catch(error => console.log("Error"))
  );
}

async function respFromAPI() {
  let countryData = await getCountryData();
  
  let rdValue = (() => {
    return Math.floor(Math.random()*1000)%250;
  })();
  
  let dataobj = {
    flag:countryData[rdValue].coatOfArms?.png || "https://png.pngitem.com/pimgs/s/392-3922834_transparent-white-flag-png-white-staples-logo-png.png",
    countryName:countryData[rdValue].name.common,
    countryCap:( () => {
      if(countryData[rdValue].capital) {
        return countryData[rdValue].capital[0];
      }else {
        return countryData[rdValue].name.common;
      }
    } )(),
    countryPop:countryData[rdValue].population,
  }
  displayCountryDetails(dataobj);
}

function displayCountryDetails(dataObject) {
  let li = document.createElement("li");
  li.classList.add("country");

    let image = document.createElement("img");
    image.src = dataObject.flag;

    let name = document.createElement("p");
    name.textContent = dataObject.countryName;

    let cap = document.createElement("p");
    cap.innerHTML = `Capital &#58; ${dataObject.countryCap}.`;

    let pop = document.createElement("p");
    pop.innerHTML = `Pop &#58; ${Math.floor(dataObject.countryPop/100000)/10} M.`;    

  li.append(image,name,cap,pop);

  countryCardList.appendChild(li);
}

function getTenCountryData(){
  for(let i=1;i<11;i++) {
    respFromAPI();
  }
}
getTenCountryData();

window.addEventListener("scroll", () => {
  let heightFromBottom = Math.floor(document.documentElement.scrollHeight - (window.innerHeight + window.scrollY));
  if(heightFromBottom < 800) {
    getTenCountryData();
  }
});
