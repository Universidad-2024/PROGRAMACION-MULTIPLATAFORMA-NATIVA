export class CustomError extends Error {
    public constructor(
        public readonly statusCode: number,
        public readonly message: string,
    ) {
        super(message);
    }


    public static badRequest(message: string) {
        return new CustomError(400, message);
    }

    public static notFound(message: string) {
        return new CustomError(404, message);
    }

    public static UnprocessableEntity(message: string) {
        return new CustomError(422, message);
    }

    public static internalErrorServer(message: string) {
        return new CustomError(500, message);
    }
}