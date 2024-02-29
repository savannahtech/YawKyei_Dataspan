import { NextResponse } from "next/server";
import AWS from 'aws-sdk';

// s3://dataspan.frontend-home-assignment/bone-fracture-detection/ 

AWS.config.update({
    region: 'eu-central-1',
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9',
    }),
});

const s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: { Bucket: 'dataspan.frontend-home-assignment' },
}) as any;


export async function GET() {
    try {
        const data = await s3.listObjects({ Delimiter: '/' }).promise();
        const albums = data.CommonPrefixes.map((commonPrefix: { Prefix: string; }) => decodeURIComponent(commonPrefix.Prefix.replace('/', '')));

        return NextResponse.json({ albums });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}


