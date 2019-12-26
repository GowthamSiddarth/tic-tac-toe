class AppState {

    constructor() {
        this.rooms = [];
    }

    get numOfRooms() {
        return this.rooms.length;
    }
}

class Singleton {

    static instance;

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new AppState();
        }
    }

    getAppState() {
        return Singleton.instance;
    }
}

module.exports = new Singleton();