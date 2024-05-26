import { PaginationDto } from "src/dto/PaginationDto";

export class DtoValidator {
    public static Pagination(value: PaginationDto): boolean {
        console.log("hellolll", value)
        return value.limit > 0 && value.page > 0
    }
}
