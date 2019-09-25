import {IsString, IsBoolean} from 'class-validator';

class CreatePostDto{
    @IsString()
    public name: string;

    @IsString()
    public description: string;

    @IsString()
    public price: string;

    @IsString()
    public geolocation: string;

    @IsString()
    public userId: string;

    @IsString()
    public date: string;

    @IsBoolean()
    public expired: boolean;

    @IsBoolean()
    public done: boolean;
}

export default CreatePostDto;