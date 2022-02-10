// lsShowTrainsExplicit = 1

// 66001502

//https://efa.sta.bz.it/apb/XML_DM_REQUEST?language=de&type_dm=stopID&stateless=1&name_dm=66001502&outputFormat=json&mode=direct


/*

http://efa.sta.bz.it/apb/XML_DM_REQUEST?locationServerActive=0&type_sf=coord&name_sf=' + longitude +':' + latitude +':WGS84[DD.DDDDD]&outputFormat=json'

*/

// https://efa.sta.bz.it/apb/XML_STOPFINDER_REQUEST?locationServerActive=0&type_sf=coord&name_sf=11.64999:46.71004:WGS84[DD.DDDDD]&outputFormat=json

// , 

// 66000998

function fetchTrainApi(busDeparturesAtFallmerayer) {
    //console.log(busDeparturesAtFallmerayer);
    console.log("ICH WER AUFGERUAFEN");

    fetch("https://efa.sta.bz.it/apb/XML_DM_REQUEST?language=de&type_dm=stopID&stateless=1&name_dm=66000998&outputFormat=json&mode=direct&lsShowTrainsExplicit=1&limit=250", {
        method: "GET"
    })
    .then(res => res.text())
    .then(res => 
        JSON.parse(res)
        .departureList
        .filter(dataset =>
            (dataset
            .servingLine
            .lineDisplay === "train"
            &&
            parseInt(
                dataset
                .countdown
            ) <= 60)
            ||
            busDeparturesAtFallmerayer.some(busDataset =>
                //busDataset.id === dataset.servingLine.number
                busDataset.id === dataset.servingLine.liErgRiProj.line
                &&
                busDataset.countdown < parseInt(dataset.countdown)
            )
            
        )
        .map((dataset, _, self) =>
            dataset.servingLine.lineDisplay === "train" ?
            [
                new SimplifiedDeparture(
                    dataset.servingLine.liErgRiProj.line,
                    dataset.servingLine.number,
                    dataset.servingLine.direction,
                    parseInt(dataset.countdown)
                ),
                busDeparturesAtFallmerayer.find(busDataset =>
                    busDataset.id
                    ===
                    self.find(departure =>
                        departure.servingLine.lineDisplay !== "train"
                        &&
                        parseInt(departure.countdown) < parseInt(dataset.countdown)    
                    )?.servingLine.liErgRiProj.line
                //   ^  Dieser Fragezeichenoperator in diesem Kontext ist ein neues Feature, dass bei einem Fehler nicht throwt sonder undefined returned
                )
            ]
            :
            null
        )
        .filter(dataset => 
            dataset
        )
        .forEach(dataset =>
            document.getElementById("trainDepartures").innerHTML += 
            `<div>
                <span class='departure-font'>${dataset[0].num}</span>
                <span class='departure-font'>${dataset[0].name}</span>
                <span class='departure-font'>${dataset[0].countdown}</span>
                <span class='departure-font'>${dataset[1] ? dataset[1].num : ""}</span>
                <span class='departure-font'>${dataset[1] ? dataset[1].name : ""}</span>
                <span class='departure-font'>${dataset[1] ? dataset[1].countdown : ""}</span>
            </div>`
        )
    );
}