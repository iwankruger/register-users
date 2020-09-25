class StringUtility{

    static stringify(objectToStringify: object, callback: any ) {
        callback(null, JSON.stringify(objectToStringify));
    }
}

export { StringUtility };