function fetchBusApi() {
    // Get request
    fetch("https://efa.sta.bz.it/apb/XML_DM_REQUEST?language=de&type_dm=stopID&stateless=1&name_dm=66001143&outputFormat=json&mode=direct", {
        method: "GET"
    })
    .then(res => res.text())
    .then(res => {
        document.getElementById("busDepartures").innerHTML = "";
        // Call train API with result of bus API
        fetchTrainApi(
            JSON.parse(res)
            .departureList
            // Filter out buses that arrive after 30 minutes
            .filter(dataset => 
                parseInt(dataset.countdown) <= 30
            )
            // Simplify departure objects
            .map(dataset => 
                new SimplifiedDeparture(
                    dataset.servingLine.liErgRiProj.line,
                    dataset.servingLine.number,
                    dataset.servingLine.direction,
                    parseInt(dataset.countdown)
                )
            )
            // Add bus departure to the screen
            .map(dataset => {
                
                document.getElementById("busDepartures").innerHTML +=
                `<tr>
                    <td class='departure-font'>${dataset.num}</td>
                    <td class='departure-font'>${dataset.name}</td>
                    <td class='departure-font'>${dataset.countdown}</td>
                </tr>`;

                return dataset;
            })
        )
    });
}