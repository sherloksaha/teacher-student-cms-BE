import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  Length,
} from 'class-validator';
import { UserRole } from '../../users/entities/user.entity';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(12, { message: 'Password must not exceed 12 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/, {
    message:
      'Password must contain uppercase, lowercase, number and special character',
  })
  password: string;

  @IsNotEmpty({ message: 'First name is required' })
  @Length(2, 20, { message: 'First name must be between 2 and 20 characters' })
  firstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @Length(2, 20, { message: 'Last name must be between 2 and 20 characters' })
  lastName: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\d+$/, { message: 'Phone must contain only numbers' })
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  phone: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsEnum(UserRole, {
    message: 'Role must be STUDENT, TEACHER, or SUPER_ADMIN',
  })
  role: UserRole;
}
