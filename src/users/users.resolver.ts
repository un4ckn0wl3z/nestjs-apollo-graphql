import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GetUserArgs } from "./dtos/args/get-user.args";
import { GetUsersArgs } from "./dtos/args/get-users.args";
import { CreateUserInputType } from "./dtos/input/create-user.input";
import { DeleteUserInputType } from "./dtos/input/delete-user.input";
import { UpdateUserInputType } from "./dtos/input/update-user.input";
import { User } from "./models/user";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {

    constructor(private readonly usersService: UsersService){

    }

    @Query(() => User, {name: 'user', nullable: true})
     getUser(@Args() getUserArgs: GetUserArgs): User {
        return this.usersService.getUser(getUserArgs);
    }

    @Query(() => [User], {name: 'users', nullable: 'items'})
    getUsers(@Args() getUsersArgs: GetUsersArgs): User[] {
        return this.usersService.getUsers(getUsersArgs)
    }

    @Mutation(() => User)
    createUser(@Args('createUserData') createUserData: CreateUserInputType): User {
        return this.usersService.createUser(createUserData)
    }

    @Mutation(() => User)
    updateUser(@Args('updateUserData') updateUserData: UpdateUserInputType): User {
        return this.usersService.updateUser(updateUserData);
    }


    @Mutation(() => User)
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInputType): User {
        return this.usersService.deleteUser(deleteUserData)
    }

}