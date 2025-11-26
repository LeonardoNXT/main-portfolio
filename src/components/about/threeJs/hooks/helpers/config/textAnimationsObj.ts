export function ConfigTextObj(heightScreen : number) {
    return {
        FIRSH_TEXT: {
            INITIAL: {
                START: heightScreen * 3,
                END: heightScreen * 4.5,
            },
            FINAL : {
                START: heightScreen * 5.0,
                END: heightScreen * 5.5,
            }
        }    
    }
}