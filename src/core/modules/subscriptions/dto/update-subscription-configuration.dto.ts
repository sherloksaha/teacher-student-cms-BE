import { IsBoolean, IsInt, IsOptional, Min } from 'class-validator';

export class UpdateSubscriptionConfigurationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  maxTeachers?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  maxSubjects?: number;

  @IsOptional()
  @IsBoolean()
  freeConsultation?: boolean;
}
