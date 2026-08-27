class apiError extends Error{
    statusCode: number;

    constructor(statusCode: number,messege: string){

        super(messege),
        this.statusCode = statusCode

    }
}

export{apiError}