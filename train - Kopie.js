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
    console.log(busDeparturesAtFallmerayer);
    console.log("ICH WER AUFGERUAFEN");
    //return;
    fetch("https://efa.sta.bz.it/apb/XML_DM_REQUEST?language=de&type_dm=stopID&stateless=1&name_dm=66000998&outputFormat=json&mode=direct&lsShowTrainsExplicit=1&limit=250", {
        method: "GET"
    })
    .then(res => res.text())
    .then(res => 
        JSON.parse(res)
        .departureList
        .filter(dataset => {
            if (dataset.servingLine.motType == "0" && parseInt(dataset.countdown) <= 60) return true;
            for (let i = 0; i < busDeparturesAtFallmerayer.length; i++) {
                console.log(busDeparturesAtFallmerayer[i].id)
                if (busDeparturesAtFallmerayer[i].id == dataset.servingLine.liErgRiProj.line
                    && busDeparturesAtFallmerayer[i].countdown < parseInt(dataset.countdown))
                    return true;
            }
            return false;
            /*(dataset
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
            )*/
            
        })
        .map((dataset, _, self) => {

            /*const connectedBus = busDeparturesAtFallmerayer.find(busDataset =>
                busDataset.id
                ===
                self.find(departure =>
                    departure.servingLine.lineDisplay !== "train"
                    &&
                    parseInt(departure.countdown) < parseInt(dataset.countdown)    
                )?.servingLine.liErgRiProj.line
            //   ^  Dieser Fragezeichenoperator in diesem Kontext ist ein neues Feature, dass bei einem Fehler nicht throwt sonder undefined returned
            );*/
            let connectedBus = undefined;
            console.log(self)
            for (let i = 0; i < busDeparturesAtFallmerayer.length; i++) {
                for (let x = 0; x < self.length; x++) {
                    //console.log("xd");
                    //console.log(self[x])
                    console.log(self[x].servingLine.motType != "0");
                    if (self[x].servingLine.motType != "0" && parseInt(self[x].countdown) < parseInt(dataset.countdown)) {
                        console.log("ES GEAT EINI");
                        if (self[x].servingLine.liErgRiProj.line === busDeparturesAtFallmerayer[i].id) {
                            connectedBus = busDeparturesAtFallmerayer[i];
                            return;
                        }
                    }
                }
            }
            console.log("-------------------");
            console.log(connectedBus);
            console.log("--------------------");

            return dataset.servingLine.lineDisplay === "train" ?
            [
                new SimplifiedDeparture(
                    dataset.servingLine.liErgRiProj.line,
                    dataset.servingLine.number,
                    dataset.servingLine.direction,
                    parseInt(dataset.countdown)
                ),
                connectedBus
                /*busDeparturesAtFallmerayer.find(busDataset =>
                    busDataset.id
                    ===
                    self.find(departure =>
                        departure.servingLine.lineDisplay !== "train"
                        &&
                        parseInt(departure.countdown) < parseInt(dataset.countdown)    
                    )?.servingLine.liErgRiProj.line
                //   ^  Dieser Fragezeichenoperator in diesem Kontext ist ein neues Feature, dass bei einem Fehler nicht throwt sonder undefined returned
                )*/
            ]
            :
            null
        })
        .forEach(dataset => console.log(dataset))
        //.filter(dataset => 
        //    dataset
        //)
        
        /*.forEach(dataset => {
            console.log(dataset);
            document.getElementById("trainDepartures").innerHTML +=
            `<div>
                <span>${dataset[0].num}</span>
                <span>${dataset[0].name.slice(0,dataset[0].name.indexOf(","))}</span>
                <span>${dataset[0].countdown}</span>
                <span>${dataset[1] ? dataset[1].num : ""}</span>
                <span>${dataset[1] ? dataset[1].name : ""}</span>
                <span>${dataset[1] ? dataset[1].countdown : ""}</span>
            </div>`   
        })*/
    );
}