import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateSubscriptionConfigurationDto {
  @IsNotEmpty()
  @IsInt()
  subscriptionId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  maxTeachers: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  maxSubjects: number;

  @IsOptional()
  @IsBoolean()
  freeConsultation?: boolean;
}
