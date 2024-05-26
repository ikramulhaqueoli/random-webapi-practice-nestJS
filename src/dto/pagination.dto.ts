import { Min } from "class-validator";

export class PaginationDto {
    @Min(1, { message: 'Page number must be greater than or equal to 1' })
    page: number;
    @Min(1, { message: 'Limit must be greater than or equal to 1' })
    limit: number;
}
