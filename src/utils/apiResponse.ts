class apiResponse{

    statusCode: number;
    data: any;
    messege: string;
    success: boolean;
    constructor(statusCode: number, messege: any, data: any){

        this.statusCode = statusCode
        this.data = data
        this.messege = messege
        this.success = statusCode < 400

    }


}


export {apiResponse}