import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional } from "class-validator";

@InputType()
export class UpdateUserInputType {
    @Field()
    @IsNotEmpty()
    userId: string;

    @Field({ nullable: true})
    @IsOptional()
    @IsNotEmpty()
    age?: number;

    @Field({ nullable: true})
    @IsOptional()
    isSubscribed?: boolean
}