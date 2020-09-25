class StringUtility{

    static stringify(objectToStringify: any, callback: any) {

        let payload = null;
        switch (objectToStringify) {
            case 'a':
                payload = 'A';
                break;
            case 'b':
                payload = 'B';
                break;
            default:
                payload = 'C';
        }

        callback(null, payload);
    }


}

export { StringUtility};