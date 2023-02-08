import { Injectable } from "@nestjs/common";
import { CreateUserInputType } from "./dtos/input/create-user.input";
import { User } from "./models/user";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserInputType } from "./dtos/input/update-user.input";
import { GetUserArgs } from "./dtos/args/get-user.args";
import { GetUsersArgs } from "./dtos/args/get-users.args";
import { DeleteUserInputType } from "./dtos/input/delete-user.input";

@Injectable()
export class UsersService {
    private users: User[] = [];
    
    public createUser(createUserData: CreateUserInputType): User {
        const user : User = {
            userId: uuidv4(),
            ...createUserData
        }
        this.users.push(user);
        return user;
    }

    public updateUser(updateUserData: UpdateUserInputType): User {
        const user = this.users.find(user => user.userId == updateUserData.userId)
        Object.assign(user,updateUserData)
        return user;
    }

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(user => user.userId == getUserArgs.userId)
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.userIds.map(userId => this.getUser({userId}))
    }

    public deleteUser(deleteUserData: DeleteUserInputType): User {
        const userIndex = this.users.findIndex(userId => deleteUserData.userId)
        const user = this.users[userIndex]
        this.users.splice(userIndex, 1)
        return user
    }
}