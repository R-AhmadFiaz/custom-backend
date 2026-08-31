class apiError extends Error{
    statusCode: number;

    constructor(statusCode: number,messege: string = 'something is wrong'){

        super(messege),
        this.statusCode = statusCode
    

    }
}

export{apiError}