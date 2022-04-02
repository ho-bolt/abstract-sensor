class Sensor {

    constructor(name) {
        this.name = name
        this.status = ""
        this.reportingInterval = 10000
        this.powerStatus = "off";
    }
    turn(on) {
        if (this.powerStatus === `${on}`) {
            throw Error()
        }
        this.powerStatus = `${on}`
        this.status = "idle"
        setTimeout(() => this.status = 'sensingDistance', this.reportingInterval);
        setTimeout(() => this.status = 'reportingData', this.reportingInterval + 500)
        setTimeout(() => this.status = 'idle', this.reportingInterval + 1000)
    }

}

class IotServer {
    constructor() {

        this.sensor = []
    }
    start([sensor]) {
        this.sensor.push(sensor)

    }
    publish(info) {
        const { deviceId, actionId, payload } = info;
        console.log("@@@@@@@@11", this.sensor)
        if (actionId === "CHANGE_REPORTING_INTERVAL") {
            this.sensor[0].reportingInterval = 3000
        }
        if (this.sensor[0].powerStatus === "off") {
            this.sensor[0].reportingInterval = 10000
        }

    }
}

module.exports = {
    Sensor,
    IotServer,
};
