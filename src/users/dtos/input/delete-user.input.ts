import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class DeleteUserInputType {
    @Field()
    @IsNotEmpty()
    userId: string

}