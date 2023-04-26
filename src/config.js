import * as dotenv from 'dotenv'; dotenv.config()

export class GetInput {
    constructor(){
        this.recordId = 'rec71XE8i6Sac7Y8N'
    }

    config() {
        return {
            recordID: this.recordId,
            BQ_API_KEY: process.env.BQ_API_KEY,
        }
    }
}