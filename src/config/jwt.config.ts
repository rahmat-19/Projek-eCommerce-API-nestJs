import { JwtModuleOptions } from "@nestjs/jwt";

export const jwtConfig : JwtModuleOptions = {
    secret : 'kontol',
    signOptions : {
        expiresIn : '60s'
    }
}