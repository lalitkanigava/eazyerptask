class customAPIErrors extends Error{
    constructor(message, statusCodes){
        super(message)
        this.statusCodes = statusCodes
    }
}

module.exports = customAPIErrors