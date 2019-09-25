import {IsString,IsBoolean, ValidateNested} from 'class-validator';
//
import CreateReviewDto from './review.dto';

class CreateUserDto {
    @IsString()
    public name: string;
    
    @IsString()
    public email: string;

    @IsString()
    public password: string;

    @ValidateNested()
    public review?: CreateReviewDto;

    @IsBoolean()
    activate: boolean;

    @IsBoolean()
    regulationsAcceptance: boolean;
}

export default CreateUserDto;
