import {IsNumber} from 'class-validator';

class CreateReviewDto {
    
    @IsNumber()
    public client: number;
    
    @IsNumber()
    public provider: number;
}

export default CreateReviewDto;