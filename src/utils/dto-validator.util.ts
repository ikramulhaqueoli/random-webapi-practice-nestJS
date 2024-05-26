import { PaginationDto } from "src/dto/pagination.dto"

export class DtoValidator {
    public static Pagination(value: PaginationDto): boolean {
        return value.limit > 0 && value.page > 0
    }
}
