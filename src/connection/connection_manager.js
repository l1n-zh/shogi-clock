import { Broadcast } from "@/utils/broadcast";

const Event = {
    READY: "ready",
    CONNECT: "stop",
    DISCONNECT: "update",
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
    
    is_pad_connected(id) {
        return true;
    }
}

export { ConnectionManager, Event };
