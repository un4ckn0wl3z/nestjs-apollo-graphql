import { Module } from "@nestjs/common";
import { PhotosApiService } from "./photo-api.service";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";

@Module({
    imports: [
    ],
    providers: [UsersResolver, UsersService, PhotosApiService]
})
export class UsersModule {}