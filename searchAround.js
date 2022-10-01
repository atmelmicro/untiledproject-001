let cats = ["resta", "bar"]

async function main() {
    let finalarr = []
    for (const i of cats) {
        let res = await fetch(`https://api.mapbox.com/search/v1/suggest/${i}?access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ&session_token=1e5917d8-a616-468e-982d-b93879edd719&language=cs&limit=10&types=country%2Cregion%2Cdistrict%2Cpostcode%2Clocality%2Cplace%2Cneighborhood%2Caddress%2Cpoi%2Cstreet%2Ccategory&proximity=15.773236%2C50.036082&bbox=15.74339523320742,50.01445573223078,15.832487162023604,50.05970182805093`)
        //finalarr = finalarr.concat(await res.json().suggestions)
        let json = await res.json()
        finalarr = finalarr.concat(json.suggestions)
    }
    console.log(finalarr)        
}

main()

// resta - restaurace 
// bar - bar
// fast%20food - fast food

// to get long lat https://api.mapbox.com/geocoding/v5/mapbox.places/aaaaaaaaaaa.json?country=cz&bbox=15.74339523320742%2C-50.01445573223078%2C50.01445573223078%2C50.05970182805093&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoic2VhcmNoLW1hY2hpbmUtdXNlci0xIiwiYSI6ImNrNnJ6bDdzdzA5cnAza3F4aTVwcWxqdWEifQ.RFF7CVFKrUsZVrJsFzhRvQ