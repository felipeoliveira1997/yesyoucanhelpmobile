import { AvatarUser } from './AvatarUser'
export interface User {
    idDocument?: string,
    firstname?: string,
    lastname?: string,
    datebirth?: string,
    RG?: string,
    cpf_cnpj?: string,
    gender?: string,
    password?: string,
    email?: string,
    cellphone?: string,
    typeuser?: string,
    token?: string,
    newpassword?: string,
    address?: {
        CEP?: string,
        city?: string,
        number?: string,
        neighbourhood?: string,
        street?: string,
        state?: string,
        country?: string,
    },
    avatarsource?: AvatarUser
}