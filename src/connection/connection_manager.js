import { Broadcast } from "@/utils/broadcast";

const Event = {
    READY: "ready",
    CONNECT: "connect",
    DISCONNECT: "disconnect",
};

class ConnectionManager {
    constructor() {
        this.broadcast = new Broadcast(
            Event.READY,
            Event.CONNECT,
            Event.DISCONNECT
        );
    }
    
    connect(id) {
        this.broadcast.emit(Event.CONNECT, id);
    }

    disconnect(id) {
        this.broadcast.emit(Event.DISCONNECT, id);
    }

    ready() {
        this.broadcast.emit(Event.READY);
    }
    
    is_button_connected(id) {
        return true;
    }
}

export { ConnectionManager, Event };
