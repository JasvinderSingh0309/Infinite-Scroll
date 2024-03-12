let countryCardList = document.querySelector(".countries");

function getCountryData() {
  return (
    fetch("https://restcountries.com/v3.1/all")
      .then(data => {
        if(!data.ok) {
          if(data.status === 404);
            throw new Error("Cannot Fetch!!");
        }else{
          return data.json();
        }
      })
      .then(resp => {
        console.log(resp);
        return resp;
      })
      .catch(error => console.log("Error"))
  );
}

async function respFromAPI() {
  let countryData = await getCountryData();
  if(countryData) {
    let rdValue = (() => {
      return Math.floor(Math.random()*1000)%200;
    })();
    let dataobj = {
      flag:countryData[rdValue].coatOfArms.png,
      countryName:countryData[rdValue].name.common,
      countryCap:countryData[rdValue].capital[0],
      countryPop:countryData[rdValue].population,
    }
    displayCountryDetails(dataobj);
  }
}

function displayCountryDetails(dataObject) {
  let li = document.createElement("li");
  li.classList.add("country");

    let image = document.createElement("img");
    image.src = dataObject.flag;
    // image.style.width = "100%";

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
  for(let i=1;i<12;i++) {
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
