import { StringUtility } from './StringUtility';


function notTested(){
    console.log('This function is not tested, see coverage report of test');
}

class UnitTestExample {

    static sum(a: number, b: number) {
        return a + b;
    }

    static testMock(data: any, callback: any) {
        console.log('DEBUG BEFORE 1');
        StringUtility.stringify(data, (error: any, dataString: any) => {
            console.log('DEBUG AFTER 1');
            if (error) {
                return callback(error);
            }

            // success
            return callback(null, dataString);
        });
    }

}


export { UnitTestExample };