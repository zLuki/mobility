function fetchTrainApi(busDeparturesAtFallmerayer) {
    // GET request
    fetch("https://efa.sta.bz.it/apb/XML_DM_REQUEST?language=de&type_dm=stopID&stateless=1&name_dm=66000998&outputFormat=json&mode=direct&lsShowTrainsExplicit=1&limit=250", {
        method: "GET"
    })
    .then(res => res.text())
    .then(res => {
        document.getElementById("trainDepartures").innerHTML = "";
        JSON.parse(res)
        .departureList
        // Filter out non trains and buses that doesn't drive to the station
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
                busDataset.id === dataset.servingLine.liErgRiProj.line
                &&
                busDataset.countdown < parseInt(dataset.countdown)
            )
            
        )
        // Matches train with bus that drives in time to the station
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
        // Filter out null values
        .filter(dataset => 
            dataset
        )
        // Add trains to the screen
        .forEach(dataset =>
            document.getElementById("trainDepartures").innerHTML += 
            `<tr>
                <td class='departure-font'>${dataset[0].num}</td>
                <td class='departure-font'>${dataset[0].name}</td>
                <td class='departure-font'>${dataset[0].countdown}</td>
                <td></td>
            </tr>
            <tr>
                <td class='bb'></td>
                <td class='departure-font bb'>${dataset[1] ? dataset[1].num : ""}</td>
                <td class='departure-font bb'>${dataset[1] ? dataset[1].name : ""}</td>
                <td class='departure-font bb'>${dataset[1] ? dataset[1].countdown : ""}</td>  
            </tr>`
            
        )
    });
}