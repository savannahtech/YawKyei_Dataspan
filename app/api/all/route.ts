import fs from "fs";
import path from "path";
import AWS from "aws-sdk";
import { NextResponse } from "next/server";

AWS.config.update({
    region: "eu-central-1",
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "eu-central-1:31ebe2ab-fc9d-4a2c-96a9-9dee9a9db8b9",
    }),
});

const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: "dataspan.frontend-home-assignment" },
}) as any;

async function fetchS3Objects(prefix: string) {
    const params = {
        Prefix: prefix,
    };

    try {
        const response = await s3.listObjectsV2(params).promise();
        return response.Contents.map((obj: any) => obj.Key);
    } catch (error) {
        console.error("Error fetching objects from S3:", error);
        throw error;
    }
}

async function downloadS3Object(
    key: string,
    destinationPath: string
) {
    const params = {
        Key: key,
    };

    try {
        const response = await s3.getObject(params).promise();
        fs.writeFileSync(destinationPath, response.Body);
        console.log(`Downloaded ${key} to ${destinationPath}`);
    } catch (error) {
        console.error(`Error downloading ${key} from s3:`, error);
        throw error;
    }
}

async function fetchTextContentFromS3(key: any) {
    const params = {
        Key: key
    };

    try {
        const response = await s3.getObject(params).promise();
        return response.Body.toString('utf-8');
    } catch (error) {
        console.error(`Error fetching ${key} from S3:`, error);
        throw error;
    }
}

async function downloadIntoFiles() {
    try {
        const res = await fetchS3Objects("bone-fracture-detection")

        if (res) {
            for (const key of res) {
                // Extract directory and filename
                const dirName = path.dirname(key);
                const fileName = path.basename(key);

                // Create local directory if it doesn't exist
                if (!fs.existsSync(dirName)) {
                    fs.mkdirSync(dirName, { recursive: true });
                }

                // Download the file
                await downloadS3Object(key, key);
            }

            return NextResponse.json({ msg: "All files downloaded successfully." });
        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}

export async function GET() {
    const res = await fetchS3Objects("bone-fracture-detection")

    try {
        if (res) {
            const txtFiles = res.filter((key: any) => key.endsWith('.txt'));

            const data = await Promise.all(txtFiles.map(async (key: any) => {
                const content = await fetchTextContentFromS3(key);
                return {
                    fileName: key,
                    content: content.split('\n')
                };
            }));

            return NextResponse.json({ total: data.length, data });

        }
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
