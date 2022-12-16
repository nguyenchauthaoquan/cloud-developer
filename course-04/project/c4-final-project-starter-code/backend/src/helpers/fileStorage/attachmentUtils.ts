import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import {Types} from "aws-sdk/clients/s3"

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
export class AttachmentUtils {
    s3: Types
    bucketName?: any;
    urlExpiration?: number;

    constructor() {
        this.s3 = new XAWS.S3({signatureVersion: "v4"})
        this.bucketName = process.env.ATTACHMENT_S3_BUCKET
        this.urlExpiration = parseInt(process.env.SIGNED_URL_EXPIRATION)
    }

    public getAttachmentUrl (attachmentId: string) {
        return `https://${this.bucketName}.s3.amazonaws.com/${attachmentId}`
    }

    public generateUploadUrl(attachmentId: string): string {
        return this.s3.getSignedUrl("putObject", {
            Bucket: this.bucketName,
            Key: attachmentId,
            Expires: this.urlExpiration
        })
    }
}