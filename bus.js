function fetchBusApi() {
    fetch("https://efa.sta.bz.it/apb/XML_DM_REQUEST?language=de&type_dm=stopID&stateless=1&name_dm=66001143&outputFormat=json&mode=direct", {
        method: "GET"
    })
    .then(res => res.text())
    .then(res => {
        document.getElementById("busDepartures").innerHTML = "";
        fetchTrainApi(
            JSON.parse(res)
            .departureList
            .filter(dataset => 
                parseInt(dataset.countdown) <= 30
            )
            .map(dataset => 
                new SimplifiedDeparture(
                    dataset.servingLine.liErgRiProj.line,
                    dataset.servingLine.number,
                    dataset.servingLine.direction,
                    parseInt(dataset.countdown)
                )
            )
            .map(dataset => {
                
                document.getElementById("busDepartures").innerHTML +=
                `<div>
                    <span class='departure-font'>${dataset.num}</span>
                    <span class='departure-font'>${dataset.name}</span>
                    <span class='departure-font'>${dataset.countdown}</span>
                </div>`;

                return dataset;
            })
        )
    });
}