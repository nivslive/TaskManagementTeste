import Fetch from "./Fetch";

class Auth extends Fetch {
    path: string;
    constructor(path: string) {
        super(path);
        this.path = path;
    }

    async login(data: Object) {
        return await this.post(undefined, data);
    }
}

const authData = new Auth('/login');
export default authData;