export default class GlobalConfig {
    private static backendURL: string = 'http://localhost:8080';

    public static getBackendURL = () => {
        return this.backendURL;
    }

    private static frontendURL: string|null = null;

    private static authorizationURL: string = 'http://39.98.47.69:8000';

    public static access_token:string|null=null;

    public static getFrontendURL=()=>{
        return this.frontendURL;
    }

    public static getAuthorizationURL=()=>{
        return this.authorizationURL;
    }
    public static getAccessToken=()=>{
        return this.access_token;
    }

    public static setFrontendURL=(url:string)=>{
        this.frontendURL="http://"+url;
    }

    public static setAccessToken=(token:string)=>{
        this.access_token=token;
    }
}