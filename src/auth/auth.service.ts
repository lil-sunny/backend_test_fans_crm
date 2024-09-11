import {Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "../user/user.repository";
import { LoginUserDto } from "../user/dto/login-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly loginUserDto: LoginUserDto
    ) {}

    async validate(loginUserDto: LoginUserDto): Promise<any> {
        const user = await this.userRepository.findByEmail(loginUserDto.email);


    }
}