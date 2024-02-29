import AWS from "aws-sdk";
import { NextResponse } from "next/server";

import { Record } from "@/lib/types";
import { getImageNameFromKey } from "@/lib/utils";

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

export async function GET() {
    const albumName = "bone-fracture-detection";
    let testData: Record[] = [];
    let trainData: Record[] = [];
    let validData: Record[] = [];

    try {
        const albumBucketName = "dataspan.frontend-home-assignment";
        const albumPhotosKey = encodeURIComponent(albumName as string) + "/";
        const data = await s3.listObjects({ Prefix: albumPhotosKey }).promise();

        //images
        const testImages = await s3
            .listObjects({ Prefix: albumPhotosKey + "test/images" })
            .promise();
        const trainImages = await s3
            .listObjects({ Prefix: albumPhotosKey + "train/images" })
            .promise();
        const validImages = await s3
            .listObjects({ Prefix: albumPhotosKey + "valid/images" })
            .promise();


        //labels
        let testLabels = await s3
            .listObjects({ Prefix: albumPhotosKey + "test/labels" })
            .promise();
        let trainLabels = await s3
            .listObjects({ Prefix: albumPhotosKey + "train/labels" })
            .promise();
        let validLabels = await s3
            .listObjects({ Prefix: albumPhotosKey + "valid/labels" })
            .promise();

        const bucketUrl = s3.getSignedUrl("getObject", {
            Bucket: albumBucketName,
            Key: data.Contents.length > 0 ? data.Contents[0].Key : "",
        });

        const href = new URL(bucketUrl);
        const hostName = href.hostname;
        const baseUrl = `https://${hostName}/${albumBucketName}/`;

        testData = await generateData(
            testLabels.Contents.slice(0, 200),
            testImages.Contents.slice(0, 200),
            baseUrl
        );

        trainData = await generateData(
            trainLabels.Contents.slice(0, 200),
            trainImages.Contents.slice(0, 200),
            baseUrl
        );

        validData = await generateData(
            validLabels.Contents.slice(0, 200),
            validImages.Contents.slice(0, 200),
            baseUrl
        );

        return NextResponse.json({
            "All groups": [...testData, ...trainData, ...validData],
            Test: testData,
            Train: trainData,
            Valid: validData,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}

async function fetchTextContentFromS3(key: any) {
    try {
        const response = await s3.getObject({ Key: key }).promise();
        return response.Body.toString("utf-8");
    } catch (error) {
        throw error;
    }
}

async function generateData(
    labelData: any[],
    imageData: any[],
    baseUrl: string
) {
    const finalData: Record[] = [];

    const fetchLabelContentsPromises = labelData.map(async (item: any) => {
        const label = await fetchTextContentFromS3(item.Key);
        return label;
    });

    await Promise.all(fetchLabelContentsPromises).then((labelContents) => {
        for (let i = 0; i < imageData.slice(0, 200).length; i++) {
            finalData[i] = {
                key: imageData[i].Key,
                image: `${baseUrl}${encodeURIComponent(imageData[i].Key)}`,
                name: getImageNameFromKey(imageData[i].Key),
                label: labelContents[i],
                numberOfPolygons: labelContents[i] !== "" ? labelContents[i].trim().split('\n').length : 0,
            };
        }
    });

    return finalData;
}
