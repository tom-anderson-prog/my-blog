import { NextResponse } from "next/server";
import OSS from "ali-oss";

export async function GET() {
  const accessKeyId = process.env.OSS_ACCESS_KEY_ID;
  const accessKeySecret = process.env.OSS_ACCESS_KEY_SECRET;
  const bucket = process.env.OSS_BUCKET;
  const region = process.env.OSS_REGION;

  if (!accessKeyId || !accessKeySecret || !bucket || !region) {
    return NextResponse.json(
      {
        error: "OSS storage not configured",
      },
      {
        status: 500,
      },
    );
  }

  const client = new OSS({
    accessKeyId,
    accessKeySecret,
    bucket,
    region,
  });

  const date = new Date();
  date.setHours(date.getHours() + 1);
  const expiration = date.toISOString();

  const policy = {
    expiration,
    conditions: [
      ["content-length-range", 0, 10485760],
      ["starts-with", "$key", "blog/"],
    ],
  };

  const formData = client.calculatePostSignature(policy);

  return NextResponse.json({
    host: `https://${bucket}.${region}.aliyuncs.com`,
    policy: formData.policy,
    signature: formData.Signature,
    OSSAccessKeyId: accessKeyId,
    key: `blog/${Date.now()}-\${filename}`,
  });
}
