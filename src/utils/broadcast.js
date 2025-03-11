class Broadcast {
    /**
     *
     * @param  {...Event} events
     */
    constructor(...events) {
        this.listeners = {};
        events.forEach((event) => {
            this.listeners[event] = [];
        });
    }

    /**
     *
     * @param {Event} event
     * @param {function} callback
     */
    add_listener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    /**
     *
     * @param {Event} event
     * @returns
     */
    emit(event, ...args) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach((callback) => callback(...args));
    }
}

export { Broadcast };