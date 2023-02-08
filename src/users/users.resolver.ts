import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { LoggerHookGuard } from "src/framework/guard/enable-log.hook.guard";
import { CustomLoggerService } from "src/framework/logger/logger.service";
import { GetUserArgs } from "./dtos/args/get-user.args";
import { GetUsersArgs } from "./dtos/args/get-users.args";
import { CreateUserInputType } from "./dtos/input/create-user.input";
import { DeleteUserInputType } from "./dtos/input/delete-user.input";
import { UpdateUserInputType } from "./dtos/input/update-user.input";
import { User } from "./models/user";
import { PhotosApiService } from "./photo-api.service";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {

    constructor(
        private readonly usersService: UsersService,
        private readonly logger: CustomLoggerService,
        private readonly photoService: PhotosApiService
        ){}

    @Query(() => User, {name: 'user', nullable: true})
    @UseGuards(LoggerHookGuard('getUser'))
     getUser(@Args() getUserArgs: GetUserArgs): User {
        return this.usersService.getUser(getUserArgs);
    }

    @Query(() => [User], {name: 'users', nullable: 'items'})
    @UseGuards(LoggerHookGuard('getUsers'))
    getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
        return this.usersService.getUsers(getUsersArgs)
    }

    @Mutation(() => User)
    @UseGuards(LoggerHookGuard('createUserData'))
    async createUser(@Args('createUserData') createUserData: CreateUserInputType): Promise<User> {
        this.logger.info('createUser entered', {data: createUserData})
        const res = await this.photoService.listPhoto()
        this.logger.debug('[+] test axios', res)
        return  this.usersService.createUser(createUserData)
    }

    @Mutation(() => User)
    @UseGuards(LoggerHookGuard('updateUserData'))
    updateUser(@Args('updateUserData') updateUserData: UpdateUserInputType): User {
        return this.usersService.updateUser(updateUserData);
    }


    @Mutation(() => User)
    @UseGuards(LoggerHookGuard('deleteUserData'))
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInputType): User {
        return this.usersService.deleteUser(deleteUserData)
    }

}