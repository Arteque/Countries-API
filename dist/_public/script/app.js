// fetch data

const countriesArr = []

async function getCountries(){
    const response = await fetch("./_public/script/Assets/data.json")
    const data = await response.json()
    // console.log(data)
    data.forEach(country => {
        countriesArr.push({
            "alpha2Code":country.alpha2Code,
            "name":country.name,
            "region":country.region,
            "population":country.population,
            "capital": country.capital,
            "flag":country.flag,
            "nativename": country.nativeName,
            "subregion": country.subregion,
            "topleveldomain": country.topLevelDomain,
            "languages": country.languages,
            "bordercountries": country.borders
        })
    })
}

getCountries()

function singleTemplate(country){
    return `
    
        <div class="card-container" data-filter="${country.region.toLowerCase()}" data-index="${country.alpha2Code}">
            <div class="card-header">
                <img src="${country.flag}" alt="${country.name}s flag">
            </div>
            <div class="card-body">
                <h3>${country.name}</h3>
                <ul>
                    <li>
                        <b>Population:</b> ${country.population}
                    </li>
                    <li>
                        <b>Region:</b> ${country.region}
                    </li>
                    <li>
                        <b>Capital:</b> ${country.capital}
                    </li>
                </ul>
            </div>
        </div>


    `
}

document.addEventListener("DOMContentLoaded", (e) => {
    const cardContainerParent = document.querySelector("section#main-data")

    cardContainerParent.innerHTML = countriesArr.map(singleTemplate).join("")


    //Filter
    const filterCountries = document.querySelector("#filter-countries select")

    filterCountries.addEventListener("input", (e) => {
        const filterIndex = Number( e.target.selectedIndex)
        const region = String(e.target[filterIndex].value)
        const allCards = cardContainerParent.querySelectorAll(".card-container")
        allCards.forEach(card => {
            card.classList.remove("no-disp")
        })
        if(e.target.filterIndex == "0"){
            allCards.forEach(card => {
                card.classList.remove("no-disp")
            })
        }else{
            const cardsContainer = cardContainerParent.querySelectorAll(".card-container:not([data-filter="+region+"])")
            cardsContainer.forEach(item => {
                item.classList.add("no-disp")
             })
        }
        
        
    })
})
