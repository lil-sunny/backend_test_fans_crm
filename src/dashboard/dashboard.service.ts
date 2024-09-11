import { Injectable } from "@nestjs/common";
import { UserRepository } from "../user/user.repository";

@Injectable()
export class DashboardService {
    constructor(private readonly userRepository: UserRepository) {

    }
    getDashbordInfo(): Promise<any> {
        return this.userRepository.findAll();
    }
}