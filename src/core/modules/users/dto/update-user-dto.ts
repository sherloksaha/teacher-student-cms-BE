// UpdateUserDto

import { IsNotEmpty, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsNotEmpty({ message: 'Status is required' })
    @IsString({ message: 'Status must be a string' })
    status?: boolean;

    @IsOptional()
    @IsNotEmpty({ message: 'First name is required' })
    @IsString({ message: 'First name must be a string' })
    @Length(2, 20, { message: 'First name must be between 2 and 20 characters' })
    firstName?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Last name is required' })
    @IsString({ message: 'Last name must be a string' })
    @Length(2, 20, { message: 'Last name must be between 2 and 20 characters' })
    lastName?: string;

    @IsOptional()
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @Length(2, 20, { message: 'Password must be between 2 and 20 characters' })
    password?: string;
}
