class SimplifiedDeparture {
    constructor (id, num, name, countdown) {
        this.id = id;
        this.num = num;
        let index = name.indexOf(",");
        this.name = index >= 0 ? name.slice(0, index) : name;
        this.countdown = countdown;
    }
}